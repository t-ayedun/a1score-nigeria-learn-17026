import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Loader2, ClipboardList, Plus } from 'lucide-react';
import { generateQuiz } from '@/lib/ai-client';
import type { QuizQuestion, ExamType, QuizDifficulty } from '@/types/ai';
import { toast } from 'sonner';

interface EnhancedQuizGeneratorProps {
  onQuizGenerated?: (questions: QuizQuestion[]) => void;
}

export function EnhancedQuizGenerator({ onQuizGenerated }: EnhancedQuizGeneratorProps) {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [examType, setExamType] = useState<ExamType>('general');
  const [difficulty, setDifficulty] = useState<QuizDifficulty>('medium');
  const [count, setCount] = useState(10);
  const [mixedMode, setMixedMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!subject || (!topic && !mixedMode)) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await generateQuiz({
        subject,
        topic: mixedMode ? 'mixed' : topic,
        examType: examType as any,
        difficulty,
        count
      });

      if (response.data) {
        toast.success(`Generated ${response.data.questions.length} questions!`);
        onQuizGenerated?.(response.data.questions);
      } else if (response.error) {
        toast.error(response.error.message || 'Failed to generate quiz');
      }
    } catch (error) {
      console.error('Quiz generation error:', error);
      toast.error('An error occurred while generating the quiz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          Enhanced Quiz Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              placeholder="e.g., Mathematics, Biology"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">Topic {!mixedMode && '*'}</Label>
            <Input
              id="topic"
              placeholder="e.g., Quadratic Equations"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={mixedMode}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="mixed-mode"
            checked={mixedMode}
            onCheckedChange={setMixedMode}
          />
          <Label htmlFor="mixed-mode">Mixed topics mode</Label>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="exam-type">Exam Format</Label>
            <Select value={examType} onValueChange={(value) => setExamType(value as ExamType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="jamb">JAMB</SelectItem>
                <SelectItem value="waec">WAEC</SelectItem>
                <SelectItem value="neco">NECO</SelectItem>
                <SelectItem value="sat">SAT</SelectItem>
                <SelectItem value="gre">GRE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select value={difficulty} onValueChange={(value) => setDifficulty(value as QuizDifficulty)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="count">Questions</Label>
            <Input
              id="count"
              type="number"
              min={5}
              max={50}
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 10)}
            />
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={loading || !subject || (!topic && !mixedMode)}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Generate Quiz
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
