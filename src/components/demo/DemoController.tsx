
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, ArrowRight, ArrowLeft, Play, Pause } from "lucide-react";
import { useDemoMode } from "@/hooks/useDemoMode";

interface DemoControllerProps {
  onUserSwitch: (userType: 'student' | 'teacher' | 'parent' | 'admin', name: string, metadata?: any) => void;
}

const DemoController = ({ onUserSwitch }: DemoControllerProps) => {
  const { 
    isDemoMode, 
    currentDemoUser, 
    switchDemoUser, 
    demoStep, 
    nextDemoStep, 
    prevDemoStep,
    demoData 
  } = useDemoMode();

  if (!isDemoMode) return null;

  const handleUserSwitch = (userId: string) => {
    const user = demoData.users.find(u => u.id === userId);
    if (user) {
      switchDemoUser(userId);
      onUserSwitch(user.type, user.name, { level: user.level, ...user.progress });
    }
  };

  const demoSteps = [
    "Welcome to A1Score Demo",
    "Student Dashboard Experience", 
    "AI Tutor Interaction",
    "Teacher Analytics View",
    "Parent Monitoring Dashboard"
  ];

  return (
    <div className="fixed bottom-2 sm:bottom-4 right-2 sm:right-4 z-50 w-[calc(100vw-1rem)] sm:w-80 max-w-sm">
      <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0">
        <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Play className="h-4 w-4 sm:h-5 sm:w-5" />
              Demo Mode
            </CardTitle>
            <Badge className="bg-white/20 text-white text-xs">
              Step {demoStep + 1}/{demoSteps.length}
            </Badge>
          </div>
          <p className="text-xs sm:text-sm opacity-90 leading-tight">{demoSteps[demoStep]}</p>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6 pb-3 sm:pb-6">
          <div className="grid grid-cols-2 gap-1 sm:gap-2">
            {demoData.users.map((user) => (
              <Button
                key={user.id}
                size="sm"
                variant={currentDemoUser.id === user.id ? "secondary" : "outline"}
                className="text-xs h-7 sm:h-8 px-2 sm:px-3 truncate"
                onClick={() => handleUserSwitch(user.id)}
              >
                <span className="hidden sm:inline">{user.avatar}</span>
                <span className="capitalize truncate">{user.type}</span>
              </Button>
            ))}
          </div>
          
          <div className="flex justify-between gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={prevDemoStep}
              disabled={demoStep === 0}
              className="text-white border-white/30 hover:bg-white/10 text-xs h-7 sm:h-8 px-2 sm:px-3 flex-1"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              Back
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={nextDemoStep}
              disabled={demoStep === demoSteps.length - 1}
              className="text-white border-white/30 hover:bg-white/10 text-xs h-7 sm:h-8 px-2 sm:px-3 flex-1"
            >
              Next
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DemoController;
