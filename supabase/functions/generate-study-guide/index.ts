import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface StudyGuideRequest {
  subject: string;
  topic: string;
  depth?: 'overview' | 'detailed' | 'comprehensive';
  saveToLibrary?: boolean;
}

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

    const { subject, topic, depth = 'detailed', saveToLibrary = false }: StudyGuideRequest = await req.json();

    const depthInstructions = {
      overview: 'Create a brief overview (2-3 sections) covering the main concepts.',
      detailed: 'Create a comprehensive guide (4-6 sections) with key points and examples.',
      comprehensive: 'Create an in-depth guide (6-10 sections) with detailed explanations, examples, and practice questions.'
    };

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
            content: `You are an expert educator creating study guides. ${depthInstructions[depth]} Format your response as JSON with this structure:
{
  "title": "Clear, descriptive title",
  "introduction": "Brief overview paragraph",
  "sections": [
    {
      "heading": "Section title",
      "content": "Detailed explanation",
      "keyPoints": ["point 1", "point 2"],
      "examples": ["example 1"]
    }
  ],
  "summary": "Concise summary paragraph",
  "practiceQuestions": ["question 1", "question 2"]
}`
          },
          {
            role: 'user',
            content: `Create a study guide for ${subject}, topic: ${topic}`
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate study guide');
    }

    const aiResult = await response.json();
    const studyGuide = JSON.parse(aiResult.choices[0].message.content);

    let savedId = null;
    if (saveToLibrary) {
      const { data: saved, error: saveError } = await supabase
        .from('content_library')
        .insert({
          user_id: user.id,
          content_type: 'study_guide',
          title: studyGuide.title,
          subject,
          topic,
          content: studyGuide,
          tags: [subject, topic, depth]
        })
        .select('id')
        .single();

      if (saveError) {
        console.error('Error saving to library:', saveError);
      } else {
        savedId = saved.id;
      }
    }

    console.log(`Generated study guide for user ${user.id}: ${topic}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        studyGuide,
        savedId,
        tokensUsed: aiResult.usage?.total_tokens || 0
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error generating study guide:', error);
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
