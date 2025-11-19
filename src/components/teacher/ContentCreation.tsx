import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BookOpen, Plus, FileText, CheckCircle, RefreshCw } from "lucide-react";
import BackToDashboard from "@/components/shared/BackToDashboard";
import PageHeader from "@/components/shared/PageHeader";

interface ContentCreationProps {
  onBackToDashboard?: () => void;
}

const ContentCreation = ({ onBackToDashboard }: ContentCreationProps = {}) => {
  const [lessonTitle, setLessonTitle] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showRegenerateWarning, setShowRegenerateWarning] = useState(false);

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'English', 'Biology'];

  const recentLessons = [
    { title: 'Quadratic Equations', subject: 'Mathematics', status: 'Published', students: 45 },
    { title: 'Photosynthesis', subject: 'Biology', status: 'Draft', students: 0 },
    { title: 'Newton\'s Laws', subject: 'Physics', status: 'Published', students: 32 },
    { title: 'Essay Writing Techniques', subject: 'English', status: 'Published', students: 28 },
  ];

  const generateContent = async () => {
    if (!lessonTitle || !selectedSubject) return;

    setIsGenerating(true);

    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    const sampleContent = `# ${lessonTitle}

## Learning Objectives
By the end of this lesson, students will be able to:
- Understand the core concepts of ${lessonTitle.toLowerCase()}
- Apply knowledge through practical examples
- Solve related problems independently

## Introduction
${lessonDescription || `This lesson covers the fundamental principles of ${lessonTitle.toLowerCase()}.`}

## Key Concepts
1. **Definition**: Clear explanation of what ${lessonTitle.toLowerCase()} means
2. **Properties**: Important characteristics and features
3. **Applications**: Real-world examples and uses
4. **Problem-solving**: Step-by-step approach to solving problems

## Practice Questions
1. Multiple choice questions for basic understanding
2. Short answer questions for concept application
3. Problem-solving exercises for advanced practice

## Summary
Key takeaways from this lesson...

## Additional Resources
- Recommended textbook chapters
- Online videos and tutorials
- Practice worksheets`;

    setGeneratedContent(sampleContent);
    setIsGenerating(false);
  };

  const handleGenerateClick = () => {
    if (generatedContent) {
      setShowRegenerateWarning(true);
    } else {
      generateContent();
    }
  };

  const handleConfirmRegenerate = () => {
    setShowRegenerateWarning(false);
    generateContent();
  };

  return (
    <div className="space-y-6">
      {onBackToDashboard && (
        <BackToDashboard onClick={onBackToDashboard} />
      )}

      <PageHeader
        title="Content Studio"
        description="Create and manage teaching content"
        breadcrumbs={[
          { label: "Dashboard", onClick: onBackToDashboard },
          { label: "Content Studio" }
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            Content Creation Studio
          </CardTitle>
          <p className="text-gray-600">Create engaging lesson plans and educational content with AI assistance.</p>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Lesson Creation Form */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Lesson</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Lesson Title</label>
              <Input
                placeholder="e.g., Quadratic Equations"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Subject</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description (Optional)</label>
              <Textarea
                placeholder="Brief description of what this lesson covers..."
                value={lessonDescription}
                onChange={(e) => setLessonDescription(e.target.value)}
                rows={3}
              />
            </div>

            <Button
              onClick={handleGenerateClick}
              disabled={!lessonTitle || !selectedSubject || isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating Lesson...
                </>
              ) : generatedContent ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate Lesson Plan
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Generate Lesson Plan
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Content Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Generated Content</CardTitle>
          </CardHeader>
          <CardContent>
            {generatedContent ? (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm">{generatedContent}</pre>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Save as Draft
                  </Button>
                  <Button size="sm" variant="outline">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Publish
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Generated lesson content will appear here</p>
                <p className="text-sm">Fill out the form and click "Generate Lesson Plan"</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Lessons */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Lessons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentLessons.map((lesson, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">{lesson.title}</div>
                    <div className="text-sm text-gray-600">{lesson.subject}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={lesson.status === 'Published' ? 'default' : 'secondary'}>
                    {lesson.status}
                  </Badge>
                  <span className="text-sm text-gray-600">{lesson.students} students</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Regenerate Confirmation Dialog */}
      <AlertDialog open={showRegenerateWarning} onOpenChange={setShowRegenerateWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Regenerate Lesson Content?</AlertDialogTitle>
            <AlertDialogDescription>
              This will replace your current lesson content with a new AI-generated version.
              Any unsaved changes will be lost. Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmRegenerate} className="bg-orange-600 hover:bg-orange-700">
              Regenerate Content
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ContentCreation;
