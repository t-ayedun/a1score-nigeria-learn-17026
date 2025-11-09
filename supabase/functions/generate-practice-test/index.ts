import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PracticeTestRequest {
  subject: string;
  topic?: string;
  examType: 'jamb' | 'waec' | 'neco' | 'sat' | 'gre' | 'general';
  difficulty?: 'easy' | 'medium' | 'hard';
  questionCount?: number;
  duration?: number;
  saveToLibrary?: boolean;
}

const EXAM_CONTEXTS = {
  jamb: 'JAMB (Joint Admissions and Matriculation Board) - Nigerian university entrance exam with multiple-choice questions',
  waec: 'WAEC (West African Examinations Council) - West African senior secondary certification exam',
  neco: 'NECO (National Examinations Council) - Nigerian senior secondary certificate exam',
  sat: 'SAT - U.S. college admission test with evidence-based reading, writing, and math sections',
  gre: 'GRE (Graduate Record Examination) - U.S. graduate school admission test with verbal, quantitative, and analytical writing',
  general: 'General standardized test format'
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openaiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openaiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    const { 
      subject, 
      topic, 
      examType, 
      difficulty = 'medium', 
      questionCount = 20,
      duration = 45,
      saveToLibrary = false 
    }: PracticeTestRequest = await req.json();

    const examContext = EXAM_CONTEXTS[examType];
    const topicText = topic ? ` focusing on ${topic}` : '';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert test creator for ${examContext}. Create a ${difficulty} difficulty practice test with ${questionCount} questions. Format as JSON:
{
  "title": "Practice Test Title",
  "totalPoints": ${questionCount * 5},
  "passingScore": ${Math.round(questionCount * 5 * 0.6)},
  "questions": [
    {
      "question_text": "question",
      "question_type": "multiple_choice",
      "options": ["A", "B", "C", "D"],
      "correct_answer": 0,
      "explanation": "detailed explanation",
      "difficulty": "${difficulty}",
      "topic": "specific topic"
    }
  ]
}

Make questions realistic for ${examType.toUpperCase()} format. Include clear explanations.`
          },
          {
            role: 'user',
            content: `Create a ${examType.toUpperCase()} practice test for ${subject}${topicText} with ${questionCount} ${difficulty} questions.`
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate practice test');
    }

    const aiResult = await response.json();
    const testData = JSON.parse(aiResult.choices[0].message.content);

    const practiceTest = {
      id: crypto.randomUUID(),
      title: testData.title,
      examType,
      subject,
      topic: topic || subject,
      duration,
      totalPoints: testData.totalPoints,
      questions: testData.questions,
      passingScore: testData.passingScore
    };

    let savedId = null;
    if (saveToLibrary) {
      const { data: saved, error: saveError } = await supabase
        .from('content_library')
        .insert({
          user_id: user.id,
          content_type: 'practice_test',
          title: practiceTest.title,
          subject,
          topic: topic || subject,
          content: practiceTest,
          exam_format: examType,
          difficulty,
          tags: [subject, examType, difficulty, 'practice_test']
        })
        .select('id')
        .single();

      if (saveError) {
        console.error('Error saving to library:', saveError);
      } else {
        savedId = saved.id;
      }
    }

    console.log(`Generated practice test for user ${user.id}: ${examType} - ${subject}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        practiceTest,
        savedId,
        tokensUsed: aiResult.usage?.total_tokens || 0
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error generating practice test:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
