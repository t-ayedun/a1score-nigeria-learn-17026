import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.51.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileName, filePath } = await req.json();
    
    if (!fileName || !filePath) {
      throw new Error('Missing fileName or filePath');
    }

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    // Get user from auth header
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    console.log('Processing PDF for user:', user.id);
    console.log('File path:', filePath);

    // Download PDF from storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('pdfs')
      .download(filePath);

    if (downloadError) {
      console.error('Download error:', downloadError);
      throw new Error('Failed to download PDF');
    }

    // Convert blob to base64 using a more efficient method for large files
    const arrayBuffer = await fileData.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    let binaryString = '';
    const chunkSize = 1024;
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.slice(i, i + chunkSize);
      binaryString += String.fromCharCode.apply(null, Array.from(chunk));
    }
    const base64 = btoa(binaryString);

    console.log('PDF converted to base64, size:', base64.length);

    // Call OpenAI to analyze the PDF
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          {
            role: 'system',
            content: `You are an expert study assistant. Analyze the provided PDF and break down its content for effective studying. 

            Return your analysis in the following JSON format:
            {
              "summary": "A comprehensive summary of the document content",
              "keyPoints": ["Key point 1", "Key point 2", ...],
              "concepts": ["Concept 1", "Concept 2", ...],
              "studyGuide": ["Step 1: Focus on...", "Step 2: Review...", ...],
              "questions": ["Question 1", "Question 2", ...]
            }

            Make sure to:
            - Identify the main themes and concepts
            - Create actionable study steps
            - Generate meaningful questions for self-assessment
            - Keep everything concise but comprehensive
            - Focus on educational value`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Please analyze this PDF document and provide a study breakdown. The file name is: ${fileName}`
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:application/pdf;base64,${base64}`
                }
              }
            ]
          }
        ],
        max_tokens: 2000,
        temperature: 0.3,
      }),
    });

    if (!openAIResponse.ok) {
      const errorText = await openAIResponse.text();
      console.error('OpenAI API error:', errorText);
      throw new Error('Failed to analyze PDF content');
    }

    const openAIData = await openAIResponse.json();
    const analysisContent = openAIData.choices[0].message.content;

    console.log('OpenAI analysis received:', analysisContent.length, 'characters');

    // Parse the JSON response from OpenAI
    let breakdown;
    try {
      breakdown = JSON.parse(analysisContent);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      // Fallback breakdown if JSON parsing fails
      breakdown = {
        summary: analysisContent,
        keyPoints: ['Content analysis completed'],
        concepts: ['Document concepts'],
        studyGuide: ['Review the document content', 'Take notes on key points'],
        questions: ['What are the main ideas?', 'How can this be applied?']
      };
    }

    // Save analysis to database
    const { data: savedAnalysis, error: saveError } = await supabase
      .from('pdf_analyses')
      .insert({
        user_id: user.id,
        file_name: fileName,
        file_path: filePath,
        breakdown_content: JSON.stringify(breakdown),
        analysis_type: 'study_guide'
      })
      .select()
      .single();

    if (saveError) {
      console.error('Save error:', saveError);
      throw new Error('Failed to save analysis');
    }

    console.log('Analysis saved successfully:', savedAnalysis.id);

    return new Response(JSON.stringify({
      id: savedAnalysis.id,
      fileName: fileName,
      breakdown: breakdown,
      createdAt: savedAnalysis.created_at
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-pdf function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});