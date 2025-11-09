import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SAVE-QUIZ-ATTEMPT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");

    const { 
      subject, 
      topic, 
      examType = 'general',
      questions,
      userAnswers,
      timeToTakeMinutes,
      correctAnswers,
      totalQuestions 
    } = await req.json();

    logStep("Request data parsed", { 
      subject, 
      topic, 
      examType, 
      totalQuestions, 
      correctAnswers,
      timeToTakeMinutes 
    });

    const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

    // Save quiz attempt
    const { data: quizAttempt, error: attemptError } = await supabaseClient
      .from('quiz_attempts')
      .insert({
        user_id: user.id,
        subject,
        topic,
        exam_type: examType,
        total_questions: totalQuestions,
        correct_answers: correctAnswers,
        score_percentage: scorePercentage,
        time_taken_minutes: timeToTakeMinutes,
        questions_data: questions,
        user_answers: userAnswers
      })
      .select()
      .single();

    if (attemptError) {
      throw new Error(`Failed to save quiz attempt: ${attemptError.message}`);
    }

    logStep("Saved quiz attempt", { attemptId: quizAttempt.id });

    // Update user progress
    const { data: existingProgress } = await supabaseClient
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('subject', subject)
      .eq('topic', topic)
      .maybeSingle();

    if (existingProgress) {
      // Update existing progress
      const newTotalQuizzes = existingProgress.total_quizzes + 1;
      const newTotalQuestions = existingProgress.total_questions + totalQuestions;
      const newCorrectAnswers = existingProgress.correct_answers + correctAnswers;
      const newAverageScore = Math.round((newCorrectAnswers / newTotalQuestions) * 100);

      // Calculate streak
      const today = new Date().toISOString().split('T')[0];
      const lastActivity = existingProgress.last_activity_date;
      const isConsecutiveDay = lastActivity && 
        new Date(lastActivity).getTime() === new Date(today).getTime() - 24 * 60 * 60 * 1000;
      
      const newStreak = lastActivity === today ? existingProgress.streak_days :
                       isConsecutiveDay ? existingProgress.streak_days + 1 : 1;

      const { error: updateError } = await supabaseClient
        .from('user_progress')
        .update({
          total_quizzes: newTotalQuizzes,
          total_questions: newTotalQuestions,
          correct_answers: newCorrectAnswers,
          average_score: newAverageScore,
          streak_days: newStreak,
          last_activity_date: today,
          study_hours: existingProgress.study_hours + (timeToTakeMinutes / 60)
        })
        .eq('user_id', user.id)
        .eq('subject', subject)
        .eq('topic', topic);

      if (updateError) {
        logStep("Failed to update progress", { error: updateError.message });
      } else {
        logStep("Updated existing progress", { newAverageScore, newStreak });
      }
    } else {
      // Create new progress record
      const { error: createError } = await supabaseClient
        .from('user_progress')
        .insert({
          user_id: user.id,
          subject,
          topic,
          total_quizzes: 1,
          total_questions: totalQuestions,
          correct_answers: correctAnswers,
          average_score: scorePercentage,
          streak_days: 1,
          last_activity_date: new Date().toISOString().split('T')[0],
          study_hours: timeToTakeMinutes / 60
        });

      if (createError) {
        logStep("Failed to create progress", { error: createError.message });
      } else {
        logStep("Created new progress record");
      }
    }

    // Get updated progress for response
    const { data: updatedProgress } = await supabaseClient
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('subject', subject)
      .eq('topic', topic)
      .single();

    return new Response(JSON.stringify({
      success: true,
      attemptId: quizAttempt.id,
      scorePercentage,
      progress: updatedProgress,
      achievement: scorePercentage >= 80 ? 'excellent' : 
                  scorePercentage >= 60 ? 'good' : 'needs_improvement'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in save-quiz-attempt", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});