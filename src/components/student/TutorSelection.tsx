
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TutorPersonality from "./TutorPersonality";

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

interface TutorSelectionProps {
  tutorPersonalities: TutorPersonalityData[];
  onSelectTutor: (tutor: TutorPersonalityData) => void;
}

const TutorSelection = ({ tutorPersonalities, onSelectTutor }: TutorSelectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Your Personal Tutor</CardTitle>
        <p className="text-gray-600">Each tutor has their own teaching style and personality</p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tutorPersonalities.map((tutor) => (
            <TutorPersonality 
              key={tutor.id} 
              tutor={tutor} 
              onSelect={onSelectTutor} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorSelection;
