import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MnemonicRequest {
  concepts: string[];
  subject: string;
  topic?: string;
  preferredType?: 'acronym' | 'rhyme' | 'story' | 'method_of_loci' | 'chunking' | 'any';
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

    const { concepts, subject, topic, preferredType = 'any', saveToLibrary = false }: MnemonicRequest = await req.json();

    const typeInstruction = preferredType === 'any' 
      ? 'Choose the most appropriate mnemonic type for each concept.'
      : `Create ${preferredType} mnemonics for all concepts.`;

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
            content: `You are a creative educator specializing in memory techniques. ${typeInstruction} Format your response as JSON:
{
  "mnemonics": [
    {
      "concept": "concept name",
      "device": "the actual mnemonic device",
      "explanation": "how to use it",
      "type": "acronym|rhyme|story|method_of_loci|chunking",
      "example": "example usage (optional)"
    }
  ]
}`
          },
          {
            role: 'user',
            content: `Create memorable mnemonics for these ${subject} concepts: ${concepts.join(', ')}`
          }
        ],
        temperature: 0.8,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate mnemonics');
    }

    const aiResult = await response.json();
    const result = JSON.parse(aiResult.choices[0].message.content);
    const mnemonics = result.mnemonics || [];

    let savedId = null;
    if (saveToLibrary) {
      const title = `Mnemonics: ${concepts.slice(0, 3).join(', ')}${concepts.length > 3 ? '...' : ''}`;
      const { data: saved, error: saveError } = await supabase
        .from('content_library')
        .insert({
          user_id: user.id,
          content_type: 'mnemonic',
          title,
          subject,
          topic: topic || concepts[0],
          content: mnemonics,
          tags: [subject, 'mnemonic', ...concepts.slice(0, 5)]
        })
        .select('id')
        .single();

      if (saveError) {
        console.error('Error saving to library:', saveError);
      } else {
        savedId = saved.id;
      }
    }

    console.log(`Generated ${mnemonics.length} mnemonics for user ${user.id}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        mnemonics,
        savedId,
        tokensUsed: aiResult.usage?.total_tokens || 0
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error generating mnemonics:', error);
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
