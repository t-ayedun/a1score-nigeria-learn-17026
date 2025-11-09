import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Shield, BookOpen, Users } from 'lucide-react';

interface AcademicIntegrityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  activityType: 'homework' | 'quiz' | 'tutor' | 'general';
}

const AcademicIntegrityModal: React.FC<AcademicIntegrityModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  activityType
}) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const getPledgeText = (type: string) => {
    switch (type) {
      case 'homework':
        return "I will use AI assistance to understand concepts and learn, not to copy answers directly.";
      case 'quiz':
        return "I understand this is an assessment and will demonstrate my own knowledge without AI assistance.";
      case 'tutor':
        return "I will engage honestly with the AI tutor to build my understanding step by step.";
      default:
        return "I commit to using this platform ethically and responsibly for learning purposes.";
    }
  };

  const principles = [
    {
      icon: <GraduationCap className="h-5 w-5 text-blue-600" />,
      title: "Learn, Don't Copy",
      description: "Use AI to understand concepts, not to complete work for you"
    },
    {
      icon: <Shield className="h-5 w-5 text-green-600" />,
      title: "Academic Honesty",
      description: "Follow your school's academic integrity policies"
    },
    {
      icon: <BookOpen className="h-5 w-5 text-purple-600" />,
      title: "Build Real Knowledge",
      description: "Focus on understanding concepts that will help you succeed"
    },
    {
      icon: <Users className="h-5 w-5 text-orange-600" />,
      title: "Respect Others",
      description: "Don't share answers or help others cheat"
    }
  ];

  const handleAccept = () => {
    if (acceptedTerms) {
      onAccept();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Academic Integrity Commitment
          </DialogTitle>
          <DialogDescription>
            Before proceeding, please review and commit to our learning principles.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {principles.map((principle, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {principle.icon}
                    <div>
                      <h4 className="font-medium text-sm">{principle.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-blue-900 mb-2">My Commitment:</h4>
              <p className="text-sm text-blue-800 italic">
                "{getPledgeText(activityType)}"
              </p>
            </CardContent>
          </Card>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="accept-terms" 
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
            />
            <label 
              htmlFor="accept-terms" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I understand and commit to these principles of academic integrity
            </label>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleAccept} 
              disabled={!acceptedTerms}
              className="bg-green-600 hover:bg-green-700"
            >
              I Commit to Learning Ethically
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AcademicIntegrityModal;