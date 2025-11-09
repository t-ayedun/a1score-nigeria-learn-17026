import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BatchGenerateRequest {
  contentType: 'quiz' | 'practice_test';
  subject: string;
  topics?: string[];
  examType?: string;
  difficulty?: string;
  questionsPerBatch?: number;
  totalBatches: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    const request: BatchGenerateRequest = await req.json();
    const { contentType, totalBatches, questionsPerBatch = 10, ...params } = request;

    // Create batch job
    const { data: job, error: jobError } = await supabase
      .from('batch_generation_jobs')
      .insert({
        user_id: user.id,
        content_type: contentType,
        params,
        total_items: totalBatches,
        status: 'pending'
      })
      .select()
      .single();

    if (jobError) throw jobError;

    console.log(`Created batch job ${job.id} for user ${user.id}`);

    // Start background processing (fire and forget)
    processBatchJob(job.id, contentType, params, totalBatches, questionsPerBatch, user.id, supabase);

    return new Response(
      JSON.stringify({ 
        success: true,
        jobId: job.id,
        message: 'Batch generation started. You can monitor progress.',
        totalBatches
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error starting batch generation:', error);
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

async function processBatchJob(
  jobId: string,
  contentType: string,
  params: any,
  totalBatches: number,
  questionsPerBatch: number,
  userId: string,
  supabase: any
) {
  try {
    // Update status to processing
    await supabase
      .from('batch_generation_jobs')
      .update({ status: 'processing' })
      .eq('id', jobId);

    const resultIds: string[] = [];

    for (let i = 0; i < totalBatches; i++) {
      try {
        let functionName = '';
        let body: any = { ...params, saveToLibrary: true };

        if (contentType === 'quiz') {
          functionName = 'quiz-generator';
          body.count = questionsPerBatch;
        } else if (contentType === 'practice_test') {
          functionName = 'generate-practice-test';
          body.questionCount = questionsPerBatch;
        }

        // Call the appropriate generation function
        const { data, error } = await supabase.functions.invoke(functionName, { body });

        if (error) throw error;

        if (data.savedId) {
          resultIds.push(data.savedId);
        }

        // Update progress
        await supabase
          .from('batch_generation_jobs')
          .update({ 
            completed_items: i + 1,
            result_ids: resultIds 
          })
          .eq('id', jobId);

        // Small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (batchError) {
        console.error(`Error in batch ${i + 1}:`, batchError);
        // Continue with next batch
      }
    }

    // Mark as completed
    await supabase
      .from('batch_generation_jobs')
      .update({ 
        status: 'completed',
        completed_items: totalBatches,
        result_ids: resultIds
      })
      .eq('id', jobId);

    console.log(`Batch job ${jobId} completed. Generated ${resultIds.length} items.`);

  } catch (error) {
    console.error('Batch processing error:', error);
    await supabase
      .from('batch_generation_jobs')
      .update({ 
        status: 'failed',
        error_message: error instanceof Error ? error.message : 'Unknown error'
      })
      .eq('id', jobId);
  }
}
