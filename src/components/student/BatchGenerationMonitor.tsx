import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useContentGeneration } from '@/hooks/useContentGeneration';
import type { BatchGenerationJob } from '@/types/ai';

interface BatchGenerationMonitorProps {
  jobId: string;
  onComplete?: () => void;
}

export function BatchGenerationMonitor({ jobId, onComplete }: BatchGenerationMonitorProps) {
  const [job, setJob] = useState<BatchGenerationJob | null>(null);
  const { getBatchJobStatus } = useContentGeneration();

  useEffect(() => {
    const pollStatus = async () => {
      const status = await getBatchJobStatus(jobId);
      if (status) {
        setJob(status);
        if (status.status === 'completed') {
          onComplete?.();
        }
      }
    };

    // Initial check
    pollStatus();

    // Poll every 3 seconds while processing
    const interval = setInterval(() => {
      if (job?.status === 'processing' || job?.status === 'pending') {
        pollStatus();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [jobId, job?.status]);

  if (!job) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Loading job status...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const progress = (job.completed_items / job.total_items) * 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Batch Generation Progress</CardTitle>
          <Badge
            variant={
              job.status === 'completed' ? 'default' :
              job.status === 'failed' ? 'destructive' :
              job.status === 'processing' ? 'secondary' : 'outline'
            }
          >
            {job.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
            {job.status === 'processing' && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
            {job.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
            {job.status === 'failed' && <XCircle className="h-3 w-3 mr-1" />}
            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
          </Badge>
        </div>
        <CardDescription>
          {job.completed_items} of {job.total_items} batches completed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} />

        {job.status === 'processing' && (
          <p className="text-sm text-muted-foreground">
            Generating content... This may take a few minutes.
          </p>
        )}

        {job.status === 'completed' && (
          <div className="space-y-2">
            <p className="text-sm text-green-600 dark:text-green-400 font-medium">
              ✓ All content generated successfully!
            </p>
            <p className="text-sm text-muted-foreground">
              Generated {job.result_ids.length} items. Check your content library.
            </p>
          </div>
        )}

        {job.status === 'failed' && (
          <div className="space-y-2">
            <p className="text-sm text-destructive font-medium">
              ✗ Generation failed
            </p>
            {job.error_message && (
              <p className="text-sm text-muted-foreground">{job.error_message}</p>
            )}
            <p className="text-sm text-muted-foreground">
              {job.result_ids.length} items were generated before the error.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
