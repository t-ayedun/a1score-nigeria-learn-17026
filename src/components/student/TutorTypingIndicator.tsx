
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

interface TutorTypingIndicatorProps {
  selectedTutor?: TutorPersonalityData | null;
}

const TutorTypingIndicator = ({ selectedTutor }: TutorTypingIndicatorProps) => {
  return (
    <div className="flex gap-3">
      <Avatar className={selectedTutor?.color}>
        <AvatarFallback>
          {selectedTutor && <selectedTutor.icon className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      <div className="p-4 rounded-lg bg-gray-100">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TutorTypingIndicator;
