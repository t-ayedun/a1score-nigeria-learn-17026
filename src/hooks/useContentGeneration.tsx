import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { 
  StudyGuide, 
  Mnemonic, 
  ConceptMap, 
  PracticeTest,
  ContentLibraryItem,
  BatchGenerationJob 
} from '@/types/ai';

export function useContentGeneration() {
  const [loading, setLoading] = useState(false);

  const generateStudyGuide = async (
    subject: string,
    topic: string,
    depth: 'overview' | 'detailed' | 'comprehensive' = 'detailed',
    saveToLibrary = true
  ): Promise<StudyGuide | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-study-guide', {
        body: { subject, topic, depth, saveToLibrary }
      });

      if (error) throw error;

      toast.success('Study guide generated!');
      return data.studyGuide;
    } catch (error) {
      console.error('Error generating study guide:', error);
      toast.error('Failed to generate study guide');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const generateMnemonics = async (
    concepts: string[],
    subject: string,
    topic?: string,
    preferredType?: 'acronym' | 'rhyme' | 'story' | 'method_of_loci' | 'chunking' | 'any',
    saveToLibrary = true
  ): Promise<Mnemonic[] | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-mnemonics', {
        body: { concepts, subject, topic, preferredType, saveToLibrary }
      });

      if (error) throw error;

      toast.success(`Generated ${data.mnemonics.length} mnemonics!`);
      return data.mnemonics;
    } catch (error) {
      console.error('Error generating mnemonics:', error);
      toast.error('Failed to generate mnemonics');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const generateConceptMap = async (
    subject: string,
    topic: string,
    concepts?: string[],
    saveToLibrary = true
  ): Promise<ConceptMap | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-concept-map', {
        body: { subject, topic, concepts, saveToLibrary }
      });

      if (error) throw error;

      toast.success('Concept map generated!');
      return data.conceptMap;
    } catch (error) {
      console.error('Error generating concept map:', error);
      toast.error('Failed to generate concept map');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const generatePracticeTest = async (
    subject: string,
    examType: 'jamb' | 'waec' | 'neco' | 'sat' | 'gre' | 'general',
    topic?: string,
    difficulty: 'easy' | 'medium' | 'hard' = 'medium',
    questionCount = 20,
    duration = 45,
    saveToLibrary = true
  ): Promise<PracticeTest | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-practice-test', {
        body: { subject, topic, examType, difficulty, questionCount, duration, saveToLibrary }
      });

      if (error) throw error;

      toast.success('Practice test generated!');
      return data.practiceTest;
    } catch (error) {
      console.error('Error generating practice test:', error);
      toast.error('Failed to generate practice test');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const startBatchGeneration = async (
    contentType: 'quiz' | 'practice_test',
    subject: string,
    totalBatches: number,
    topics?: string[],
    examType?: string,
    difficulty?: string,
    questionsPerBatch = 10
  ): Promise<string | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('batch-generate-content', {
        body: { 
          contentType, 
          subject, 
          topics, 
          examType, 
          difficulty, 
          questionsPerBatch, 
          totalBatches 
        }
      });

      if (error) throw error;

      toast.success(`Batch generation started! Generating ${totalBatches} batches.`);
      return data.jobId;
    } catch (error) {
      console.error('Error starting batch generation:', error);
      toast.error('Failed to start batch generation');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getBatchJobStatus = async (jobId: string): Promise<BatchGenerationJob | null> => {
    try {
      const { data, error } = await supabase
        .from('batch_generation_jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (error) throw error;
      return data as BatchGenerationJob;
    } catch (error) {
      console.error('Error fetching batch job:', error);
      return null;
    }
  };

  const getContentLibrary = async (
    contentType?: string,
    subject?: string
  ): Promise<ContentLibraryItem[]> => {
    try {
      let query = supabase
        .from('content_library')
        .select('*')
        .order('created_at', { ascending: false });

      if (contentType) {
        query = query.eq('content_type', contentType);
      }

      if (subject) {
        query = query.eq('subject', subject);
      }

      const { data, error } = await query;

      if (error) throw error;
      return (data || []) as unknown as ContentLibraryItem[];
    } catch (error) {
      console.error('Error fetching content library:', error);
      return [];
    }
  };

  const deleteFromLibrary = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('content_library')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Deleted from library');
      return true;
    } catch (error) {
      console.error('Error deleting from library:', error);
      toast.error('Failed to delete');
      return false;
    }
  };

  const toggleFavorite = async (id: string, isFavorite: boolean): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('content_library')
        .update({ is_favorite: !isFavorite })
        .eq('id', id);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }
  };

  const updateTags = async (id: string, tags: string[]): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('content_library')
        .update({ tags })
        .eq('id', id);

      if (error) throw error;

      toast.success('Tags updated');
      return true;
    } catch (error) {
      console.error('Error updating tags:', error);
      toast.error('Failed to update tags');
      return false;
    }
  };

  return {
    loading,
    generateStudyGuide,
    generateMnemonics,
    generateConceptMap,
    generatePracticeTest,
    startBatchGeneration,
    getBatchJobStatus,
    getContentLibrary,
    deleteFromLibrary,
    toggleFavorite,
    updateTags
  };
}
