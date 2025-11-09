
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface TutorPersonalityData {
  id: string;
  name: string;
  subject: string;
  personality: string;
  greeting: string;
  icon: any;
  color: string;
  expertise: string[];
}

interface TutorHeaderProps {
  selectedTutor: TutorPersonalityData;
  conversationMemory: {[key: string]: any};
  onSwitchTutor: () => void;
}

const TutorHeader = ({ selectedTutor, conversationMemory, onSwitchTutor }: TutorHeaderProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className={selectedTutor.color}>
              <AvatarFallback>
                <selectedTutor.icon className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{selectedTutor.name}</h3>
              <p className="text-sm text-gray-600">{selectedTutor.subject} Specialist</p>
            </div>
          </div>
          <div className="text-right text-sm text-gray-500">
            <p>Sessions: {conversationMemory.learningProgress?.[selectedTutor.subject] || 0}</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onSwitchTutor}
            >
              Switch Tutor
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorHeader;
