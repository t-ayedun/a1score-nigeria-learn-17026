import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ConceptMapRequest {
  subject: string;
  topic: string;
  concepts?: string[];
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

    const { subject, topic, concepts = [], saveToLibrary = false }: ConceptMapRequest = await req.json();

    const conceptsHint = concepts.length > 0 
      ? `Focus on these concepts: ${concepts.join(', ')}`
      : 'Identify the key concepts and their relationships.';

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
            content: `You are an expert at creating concept maps. ${conceptsHint} Create a hierarchical concept map. Format as JSON:
{
  "title": "map title",
  "description": "brief description",
  "nodes": [
    {"id": "node1", "label": "Concept Name", "description": "brief desc", "level": 0}
  ],
  "edges": [
    {"from": "node1", "to": "node2", "relationship": "leads to"}
  ],
  "mermaidDiagram": "graph TD\\n  A[Main] --> B[Sub]\\n  A --> C[Sub2]"
}

Generate valid Mermaid syntax for a flowchart (graph TD). Use clear, short labels.`
          },
          {
            role: 'user',
            content: `Create a concept map for ${subject}, topic: ${topic}. ${conceptsHint}`
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate concept map');
    }

    const aiResult = await response.json();
    const conceptMap = JSON.parse(aiResult.choices[0].message.content);

    let savedId = null;
    if (saveToLibrary) {
      const { data: saved, error: saveError } = await supabase
        .from('content_library')
        .insert({
          user_id: user.id,
          content_type: 'concept_map',
          title: conceptMap.title,
          subject,
          topic,
          content: conceptMap,
          tags: [subject, topic, 'concept_map']
        })
        .select('id')
        .single();

      if (saveError) {
        console.error('Error saving to library:', saveError);
      } else {
        savedId = saved.id;
      }
    }

    console.log(`Generated concept map for user ${user.id}: ${topic}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        conceptMap,
        savedId,
        tokensUsed: aiResult.usage?.total_tokens || 0
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error generating concept map:', error);
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
