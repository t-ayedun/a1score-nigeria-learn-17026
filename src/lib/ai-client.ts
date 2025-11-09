import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * AI API error types
 */
export type AIErrorType = 'rate_limit' | 'payment_required' | 'auth_error' | 'network_error' | 'unknown';

/**
 * AI API error with type classification
 */
export interface AIError {
  type: AIErrorType;
  message: string;
  statusCode?: number;
  originalError?: any;
}

/**
 * AI API response wrapper
 */
export interface AIResponse<T = any> {
  data?: T;
  error?: AIError;
}

/**
 * Classify error type from response
 */
function classifyError(statusCode: number, message: string): AIErrorType {
  if (statusCode === 429) return 'rate_limit';
  if (statusCode === 402) return 'payment_required';
  if (statusCode === 401 || statusCode === 403) return 'auth_error';
  if (statusCode >= 500) return 'network_error';
  return 'unknown';
}

/**
 * Handle AI API errors with user-friendly messages
 */
export function handleAIError(error: AIError): void {
  switch (error.type) {
    case 'rate_limit':
      toast.error('Too many requests', {
        description: 'Please wait a moment before trying again. Our AI is getting lots of love right now! 💙',
      });
      break;
    
    case 'payment_required':
      toast.error('Service temporarily unavailable', {
        description: 'AI credits are being replenished. Please try again shortly or contact support.',
      });
      break;
    
    case 'auth_error':
      toast.error('Authentication required', {
        description: 'Please sign in to use AI features.',
      });
      break;
    
    case 'network_error':
      toast.error('Connection error', {
        description: 'Unable to reach AI service. Please check your connection and try again.',
      });
      break;
    
    default:
      toast.error('Something went wrong', {
        description: error.message || 'An unexpected error occurred. Please try again.',
      });
  }
}

/**
 * Call AI Tutor Chat edge function
 */
export async function callAITutor(params: {
  message: string;
  tutorId: string;
  subject: string;
  conversationContext?: any;
}): Promise<AIResponse<{ response: string; conversationId: string; tokensUsed: number }>> {
  try {
    const { data, error } = await supabase.functions.invoke('ai-tutor-chat', {
      body: params
    });

    if (error) {
      const statusCode = error.context?.status || 500;
      const aiError: AIError = {
        type: classifyError(statusCode, error.message),
        message: error.message,
        statusCode,
        originalError: error,
      };
      return { error: aiError };
    }

    return { data };
  } catch (error) {
    const aiError: AIError = {
      type: 'network_error',
      message: error instanceof Error ? error.message : 'Network error',
      originalError: error,
    };
    return { error: aiError };
  }
}

/**
 * Call Quiz Generator edge function
 */
export async function generateQuiz(params: {
  subject: string;
  topic: string;
  examType?: 'jamb' | 'waec' | 'neco' | 'general';
  difficulty?: 'easy' | 'medium' | 'hard';
  count?: number;
}): Promise<AIResponse<{ questions: any[]; source: string; tokensUsed?: number }>> {
  try {
    const { data, error } = await supabase.functions.invoke('quiz-generator', {
      body: params
    });

    if (error) {
      const statusCode = error.context?.status || 500;
      const aiError: AIError = {
        type: classifyError(statusCode, error.message),
        message: error.message,
        statusCode,
        originalError: error,
      };
      return { error: aiError };
    }

    return { data };
  } catch (error) {
    const aiError: AIError = {
      type: 'network_error',
      message: error instanceof Error ? error.message : 'Network error',
      originalError: error,
    };
    return { error: aiError };
  }
}

/**
 * Call PDF Analysis edge function
 */
export async function analyzePDF(params: {
  fileName: string;
  filePath: string;
}): Promise<AIResponse<{
  id: string;
  fileName: string;
  breakdown: {
    summary: string;
    keyPoints: string[];
    concepts: string[];
    studyGuide: string[];
    questions: string[];
  };
  createdAt: string;
}>> {
  try {
    const { data, error } = await supabase.functions.invoke('analyze-pdf', {
      body: params
    });

    if (error) {
      const statusCode = error.context?.status || 500;
      const aiError: AIError = {
        type: classifyError(statusCode, error.message),
        message: error.message,
        statusCode,
        originalError: error,
      };
      return { error: aiError };
    }

    return { data };
  } catch (error) {
    const aiError: AIError = {
      type: 'network_error',
      message: error instanceof Error ? error.message : 'Network error',
      originalError: error,
    };
    return { error: aiError };
  }
}

/**
 * Retry wrapper with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<AIResponse<T>>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<AIResponse<T>> {
  let lastError: AIError | undefined;

  for (let i = 0; i < maxRetries; i++) {
    const result = await fn();
    
    if (!result.error) {
      return result;
    }

    lastError = result.error;

    // Don't retry on auth errors or payment required
    if (result.error.type === 'auth_error' || result.error.type === 'payment_required') {
      return result;
    }

    // Don't retry on last attempt
    if (i === maxRetries - 1) {
      break;
    }

    // Exponential backoff
    const delay = initialDelay * Math.pow(2, i);
    console.log(`Retrying in ${delay}ms (attempt ${i + 1}/${maxRetries})`);
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  return { error: lastError };
}
