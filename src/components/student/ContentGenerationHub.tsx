import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useContentGeneration } from '@/hooks/useContentGeneration';
import { ContentLibrary } from './ContentLibrary';
import { BatchGenerationMonitor } from './BatchGenerationMonitor';
import { 
  BookOpen, 
  Brain, 
  Network, 
  FileText, 
  Loader2,
  Sparkles,
  Layers
} from 'lucide-react';
import type { ExamType, QuizDifficulty } from '@/types/ai';

export function ContentGenerationHub() {
  const [activeTab, setActiveTab] = useState('library');
  const [batchJobId, setBatchJobId] = useState<string | null>(null);
  
  const {
    loading,
    generateStudyGuide,
    generateMnemonics,
    generateConceptMap,
    generatePracticeTest,
    startBatchGeneration
  } = useContentGeneration();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Content Generation Hub
          </CardTitle>
          <CardDescription>
            Generate comprehensive study materials powered by AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="library">Library</TabsTrigger>
              <TabsTrigger value="study-guide">Study Guide</TabsTrigger>
              <TabsTrigger value="mnemonics">Mnemonics</TabsTrigger>
              <TabsTrigger value="concept-map">Concept Map</TabsTrigger>
              <TabsTrigger value="practice-test">Practice Test</TabsTrigger>
              <TabsTrigger value="batch">Batch</TabsTrigger>
            </TabsList>

            <TabsContent value="library" className="space-y-4">
              <ContentLibrary />
            </TabsContent>

            <TabsContent value="study-guide" className="space-y-4">
              <StudyGuideForm 
                onGenerate={generateStudyGuide} 
                loading={loading} 
              />
            </TabsContent>

            <TabsContent value="mnemonics" className="space-y-4">
              <MnemonicsForm 
                onGenerate={generateMnemonics} 
                loading={loading} 
              />
            </TabsContent>

            <TabsContent value="concept-map" className="space-y-4">
              <ConceptMapForm 
                onGenerate={generateConceptMap} 
                loading={loading} 
              />
            </TabsContent>

            <TabsContent value="practice-test" className="space-y-4">
              <PracticeTestForm 
                onGenerate={generatePracticeTest} 
                loading={loading} 
              />
            </TabsContent>

            <TabsContent value="batch" className="space-y-4">
              <BatchGenerationForm 
                onStart={startBatchGeneration}
                onJobCreated={setBatchJobId}
                loading={loading} 
              />
              {batchJobId && (
                <BatchGenerationMonitor 
                  jobId={batchJobId}
                  onComplete={() => setActiveTab('library')}
                />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function StudyGuideForm({ onGenerate, loading }: any) {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [depth, setDepth] = useState<'overview' | 'detailed' | 'comprehensive'>('detailed');

  const handleGenerate = async () => {
    await onGenerate(subject, topic, depth);
    setSubject('');
    setTopic('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Generate Study Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Subject</Label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g., Biology" />
          </div>
          <div className="space-y-2">
            <Label>Topic</Label>
            <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g., Cell Structure" />
          </div>
          <div className="space-y-2">
            <Label>Depth</Label>
            <Select value={depth} onValueChange={(v: any) => setDepth(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Overview (2-3 sections)</SelectItem>
                <SelectItem value="detailed">Detailed (4-6 sections)</SelectItem>
                <SelectItem value="comprehensive">Comprehensive (6-10 sections)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleGenerate} disabled={loading || !subject || !topic} className="w-full">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Generate Study Guide
        </Button>
      </CardContent>
    </Card>
  );
}

function MnemonicsForm({ onGenerate, loading }: any) {
  const [subject, setSubject] = useState('');
  const [concepts, setConcepts] = useState('');

  const handleGenerate = async () => {
    const conceptArray = concepts.split(',').map(c => c.trim()).filter(Boolean);
    await onGenerate(conceptArray, subject);
    setConcepts('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Generate Mnemonics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Subject</Label>
          <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g., Chemistry" />
        </div>
        <div className="space-y-2">
          <Label>Concepts (comma-separated)</Label>
          <Textarea 
            value={concepts} 
            onChange={(e) => setConcepts(e.target.value)} 
            placeholder="e.g., Oxidation, Reduction, Catalyst"
            rows={3}
          />
        </div>
        <Button onClick={handleGenerate} disabled={loading || !subject || !concepts} className="w-full">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Generate Mnemonics
        </Button>
      </CardContent>
    </Card>
  );
}

function ConceptMapForm({ onGenerate, loading }: any) {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');

  const handleGenerate = async () => {
    await onGenerate(subject, topic);
    setSubject('');
    setTopic('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="h-5 w-5" />
          Generate Concept Map
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Subject</Label>
          <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g., Physics" />
        </div>
        <div className="space-y-2">
          <Label>Topic</Label>
          <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g., Newton's Laws" />
        </div>
        <Button onClick={handleGenerate} disabled={loading || !subject || !topic} className="w-full">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Generate Concept Map
        </Button>
      </CardContent>
    </Card>
  );
}

function PracticeTestForm({ onGenerate, loading }: any) {
  const [subject, setSubject] = useState('');
  const [examType, setExamType] = useState<ExamType>('general');
  const [difficulty, setDifficulty] = useState<QuizDifficulty>('medium');
  const [count, setCount] = useState(20);

  const handleGenerate = async () => {
    await onGenerate(subject, examType, undefined, difficulty, count);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Generate Practice Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Subject</Label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g., Mathematics" />
          </div>
          <div className="space-y-2">
            <Label>Exam Format</Label>
            <Select value={examType} onValueChange={(v: ExamType) => setExamType(v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
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
            <Label>Difficulty</Label>
            <Select value={difficulty} onValueChange={(v: QuizDifficulty) => setDifficulty(v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Questions</Label>
            <Input type="number" value={count} onChange={(e) => setCount(parseInt(e.target.value) || 20)} min={5} max={50} />
          </div>
        </div>
        <Button onClick={handleGenerate} disabled={loading || !subject} className="w-full">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Generate Practice Test
        </Button>
      </CardContent>
    </Card>
  );
}

function BatchGenerationForm({ onStart, onJobCreated, loading }: any) {
  const [subject, setSubject] = useState('');
  const [batches, setBatches] = useState(5);
  const [perBatch, setPerBatch] = useState(10);

  const handleStart = async () => {
    const jobId = await onStart('quiz', subject, batches, undefined, 'general', 'medium', perBatch);
    if (jobId) onJobCreated(jobId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-5 w-5" />
          Batch Generation
        </CardTitle>
        <CardDescription>Generate large quantities of content in the background</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Subject</Label>
          <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g., Calculus" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Number of Batches</Label>
            <Input type="number" value={batches} onChange={(e) => setBatches(parseInt(e.target.value) || 5)} min={1} max={20} />
          </div>
          <div className="space-y-2">
            <Label>Questions per Batch</Label>
            <Input type="number" value={perBatch} onChange={(e) => setPerBatch(parseInt(e.target.value) || 10)} min={5} max={20} />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Total: {batches * perBatch} questions will be generated
        </p>
        <Button onClick={handleStart} disabled={loading || !subject} className="w-full">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Start Batch Generation
        </Button>
      </CardContent>
    </Card>
  );
}
