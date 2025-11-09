
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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

interface TutorPersonalityProps {
  tutor: TutorPersonalityData;
  onSelect: (tutor: TutorPersonalityData) => void;
}

const TutorPersonality = ({ tutor, onSelect }: TutorPersonalityProps) => {
  const Icon = tutor.icon;
  
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onSelect(tutor)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className={tutor.color}>
            <AvatarFallback>
              <Icon className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">{tutor.name}</h3>
            <p className="text-sm text-gray-600">{tutor.subject}</p>
            <p className="text-xs text-gray-500 mt-1">{tutor.personality}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {tutor.expertise.slice(0, 2).map((skill, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorPersonality;
