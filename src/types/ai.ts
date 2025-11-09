/**
 * Type definitions for AI features across the application
 */

/**
 * Available Lovable AI models
 */
export type LovableAIModel = 
  | 'google/gemini-2.5-pro'
  | 'google/gemini-2.5-flash' 
  | 'google/gemini-2.5-flash-lite'
  | 'google/gemini-2.5-flash-image'
  | 'openai/gpt-5'
  | 'openai/gpt-5-mini'
  | 'openai/gpt-5-nano';

/**
 * Chat message role
 */
export type MessageRole = 'user' | 'assistant' | 'system';

/**
 * Chat message structure
 */
export interface ChatMessage {
  role: MessageRole;
  content: string;
  timestamp?: string;
  tokensUsed?: number;
}

/**
 * Conversation context for AI tutor
 */
export interface ConversationContext {
  personality?: string;
  tutorStyle?: 'encouraging' | 'professional' | 'casual' | 'strict';
  learningGoals?: string[];
  previousTopics?: string[];
}

/**
 * AI Tutor request parameters
 */
export interface AITutorRequest {
  message: string;
  tutorId: string;
  subject: string;
  conversationContext?: ConversationContext;
}

/**
 * AI Tutor response
 */
export interface AITutorResponse {
  response: string;
  conversationId: string;
  tokensUsed: number;
  model: LovableAIModel;
}

/**
 * Quiz difficulty levels
 */
export type QuizDifficulty = 'easy' | 'medium' | 'hard';

/**
 * Exam types (Nigerian and International)
 */
export type ExamType = 'jamb' | 'waec' | 'neco' | 'sat' | 'gre' | 'general';

/**
 * Content generation types
 */
export type ContentType = 'quiz' | 'practice_test' | 'study_guide' | 'mnemonic' | 'concept_map';

/**
 * Study guide structure
 */
export interface StudyGuide {
  title: string;
  introduction: string;
  sections: Array<{
    heading: string;
    content: string;
    keyPoints: string[];
    examples?: string[];
  }>;
  summary: string;
  practiceQuestions?: string[];
}

/**
 * Mnemonic device
 */
export interface Mnemonic {
  concept: string;
  device: string;
  explanation: string;
  type: 'acronym' | 'rhyme' | 'story' | 'method_of_loci' | 'chunking';
  example?: string;
}

/**
 * Concept map node
 */
export interface ConceptMapNode {
  id: string;
  label: string;
  description?: string;
  level: number;
}

/**
 * Concept map connection
 */
export interface ConceptMapEdge {
  from: string;
  to: string;
  relationship: string;
}

/**
 * Concept map structure
 */
export interface ConceptMap {
  title: string;
  mermaidDiagram: string;
  nodes: ConceptMapNode[];
  edges: ConceptMapEdge[];
  description: string;
}

/**
 * Practice test structure
 */
export interface PracticeTest {
  id: string;
  title: string;
  examType: ExamType;
  subject: string;
  topic?: string;
  duration: number; // in minutes
  totalPoints: number;
  questions: QuizQuestion[];
  passingScore: number;
}

/**
 * Content library item
 */
export interface ContentLibraryItem {
  id: string;
  user_id: string;
  content_type: ContentType;
  title: string;
  subject: string;
  topic?: string;
  content: StudyGuide | Mnemonic[] | ConceptMap | PracticeTest | QuizQuestion[];
  tags: string[];
  exam_format?: ExamType;
  difficulty?: QuizDifficulty;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Batch generation job
 */
export interface BatchGenerationJob {
  id: string;
  user_id: string;
  content_type: ContentType;
  params: any;
  total_items: number;
  completed_items: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result_ids: string[];
  error_message?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Quiz question type
 */
export type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';

/**
 * Quiz question structure
 */
export interface QuizQuestion {
  id?: string;
  quiz_id?: string;
  question_text: string;
  question_type: QuestionType;
  options?: string[];
  correct_answer: number | string;
  explanation: string;
  difficulty?: QuizDifficulty;
  topic?: string;
}

/**
 * Quiz generation request
 */
export interface QuizGenerationRequest {
  subject: string;
  topic: string;
  examType?: ExamType;
  difficulty?: QuizDifficulty;
  count?: number;
}

/**
 * Quiz generation response
 */
export interface QuizGenerationResponse {
  questions: QuizQuestion[];
  source: 'database' | 'generated';
  tokensUsed?: number;
  model?: LovableAIModel;
}

/**
 * PDF analysis breakdown structure
 */
export interface PDFBreakdown {
  summary: string;
  keyPoints: string[];
  concepts: string[];
  studyGuide: string[];
  questions: string[];
}

/**
 * PDF analysis request
 */
export interface PDFAnalysisRequest {
  fileName: string;
  filePath: string;
}

/**
 * PDF analysis response
 */
export interface PDFAnalysisResponse {
  id: string;
  fileName: string;
  breakdown: PDFBreakdown;
  createdAt: string;
  model?: LovableAIModel;
}

/**
 * AI usage tracking
 */
export interface AIUsageStats {
  user_id: string;
  usage_date: string;
  requests_count: number;
  tokens_used: number;
  cost_usd: number;
}

/**
 * AI response cache entry
 */
export interface CachedAIResponse {
  id: string;
  query_hash: string;
  query_text: string;
  response_text: string;
  model: LovableAIModel;
  tokens_used: number;
  hit_count: number;
  created_at: string;
  last_accessed_at: string;
}

/**
 * Token usage information
 */
export interface TokenUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

/**
 * AI request options
 */
export interface AIRequestOptions {
  maxTokens?: number;
  temperature?: number;
  model?: LovableAIModel;
  retryOnError?: boolean;
  maxRetries?: number;
}

/**
 * Streaming message chunk
 */
export interface StreamingChunk {
  delta: string;
  isComplete: boolean;
  tokensUsed?: number;
}

/**
 * AI model capabilities
 */
export interface ModelCapabilities {
  model: LovableAIModel;
  supportsVision: boolean;
  supportsStreaming: boolean;
  maxTokens: number;
  costPer1kTokens: number;
  bestFor: string[];
}

/**
 * Model capability map
 */
export const MODEL_CAPABILITIES: Record<string, ModelCapabilities> = {
  'google/gemini-2.5-pro': {
    model: 'google/gemini-2.5-pro',
    supportsVision: true,
    supportsStreaming: true,
    maxTokens: 8192,
    costPer1kTokens: 0.003,
    bestFor: ['multimodal', 'complex reasoning', 'large context']
  },
  'google/gemini-2.5-flash': {
    model: 'google/gemini-2.5-flash',
    supportsVision: true,
    supportsStreaming: true,
    maxTokens: 8192,
    costPer1kTokens: 0.001,
    bestFor: ['chat', 'general tasks', 'cost-efficient']
  },
  'google/gemini-2.5-flash-lite': {
    model: 'google/gemini-2.5-flash-lite',
    supportsVision: false,
    supportsStreaming: true,
    maxTokens: 8192,
    costPer1kTokens: 0.0005,
    bestFor: ['classification', 'summarization', 'simple tasks']
  }
};
