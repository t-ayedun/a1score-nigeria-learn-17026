import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper logging function for debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[AI-TUTOR-CHAT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Create Supabase client with service role key for database operations
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY is not set');
    }
    logStep("Lovable AI key verified");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");
    logStep("User authenticated", { userId: user.id });

    const { message, tutorId, subject, conversationContext } = await req.json();
    logStep("Request data parsed", { tutorId, subject, messageLength: message?.length });

    // Get conversation history for context
    const { data: conversationHistory } = await supabaseClient
      .from('conversation_history')
      .select('*')
      .eq('user_id', user.id)
      .eq('tutor_id', tutorId)
      .eq('subject', subject)
      .order('created_at', { ascending: true })
      .limit(10);

    logStep("Retrieved conversation history", { historyCount: conversationHistory?.length });

    // Build context for AI
    const contextMessages = [];
    
    // System prompt based on tutor personality and subject
    const systemPrompt = `You are ${tutorId}, an AI tutor specializing in ${subject} for Nigerian students. 
You help with WAEC, JAMB, and NECO exam preparation. 
${conversationContext?.personality || 'You are helpful, encouraging, and culturally aware.'}

Focus on:
- Nigerian curriculum and exam standards
- Step-by-step explanations
- Encouraging learning mindset
- Cultural context when relevant
- Practical examples from Nigerian context

Keep responses concise but thorough. Always encourage the student and relate to their academic goals.`;

    contextMessages.push({ role: 'system', content: systemPrompt });

    // Add conversation history
    if (conversationHistory) {
      conversationHistory.forEach(msg => {
        contextMessages.push({
          role: msg.message_type === 'user' ? 'user' : 'assistant',
          content: msg.content
        });
      });
    }

    // Add current user message
    contextMessages.push({ role: 'user', content: message });

    logStep("Built context for Lovable AI", { messageCount: contextMessages.length });

    // Call Lovable AI Gateway (Google Gemini 2.5 Flash)
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: contextMessages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    // Handle rate limiting and payment errors
    if (response.status === 429) {
      logStep("Rate limit exceeded");
      return new Response(JSON.stringify({ 
        error: 'Rate limit exceeded. Please try again in a moment.' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 429,
      });
    }

    if (response.status === 402) {
      logStep("Payment required - out of credits");
      return new Response(JSON.stringify({ 
        error: 'AI service credits exhausted. Please contact administrator.' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 402,
      });
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Lovable AI error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    logStep("Got AI response", { responseLength: aiResponse?.length });

    // Save conversation to database
    await supabaseClient.from('conversation_history').insert([
      {
        user_id: user.id,
        tutor_id: tutorId,
        subject: subject,
        message_type: 'user',
        content: message,
        metadata: { timestamp: new Date().toISOString() }
      },
      {
        user_id: user.id,
        tutor_id: tutorId,
        subject: subject,
        message_type: 'ai',
        content: aiResponse,
        metadata: { 
          timestamp: new Date().toISOString(),
          model: 'google/gemini-2.5-flash',
          tokens_used: data.usage?.total_tokens || 0
        }
      }
    ]);

    logStep("Saved conversation to database");

    return new Response(JSON.stringify({
      response: aiResponse,
      conversationId: `${user.id}-${tutorId}-${subject}`,
      tokensUsed: data.usage?.total_tokens || 0,
      model: 'google/gemini-2.5-flash'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in ai-tutor-chat", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
