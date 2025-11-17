
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, BookOpen, Trophy, ArrowRight, CheckCircle, X } from 'lucide-react';

interface OnboardingFlowProps {
  userType: 'student' | 'teacher' | 'admin' | 'parent';
  onComplete: () => void;
}

const OnboardingFlow = ({ userType, onComplete }: OnboardingFlowProps) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);

  const getSteps = () => {
    const baseSteps = [
      {
        icon: Brain,
        title: t('onboarding.step1Title'),
        description: t('onboarding.step1Desc'),
        features: ['AI-powered tutoring', 'Nigerian curriculum aligned', 'Available in multiple languages']
      },
      {
        icon: BookOpen,
        title: t('onboarding.step2Title'),
        description: t('onboarding.step2Desc'),
        features: ['Practice quizzes', 'Progress tracking', 'Personalized recommendations']
      },
      {
        icon: Trophy,
        title: t('onboarding.step3Title'),
        description: t('onboarding.step3Desc'),
        features: ['Earn badges', 'Compete with peers', 'Track achievements']
      }
    ];

    // Customize based on user type
    if (userType === 'teacher') {
      baseSteps[0].features = ['Create lesson plans', 'AI-assisted content', 'Grade assignments automatically'];
      baseSteps[1].features = ['Class analytics', 'Student progress tracking', 'Custom quizzes'];
      baseSteps[2].features = ['Earn from content', 'Teacher recognition', 'Professional growth'];
    }

    return baseSteps;
  };

  const steps = getSteps();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];
  const StepIcon = currentStepData.icon;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="max-w-lg mx-4 w-full relative">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onComplete}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          aria-label="Close onboarding"
        >
          <X className="h-4 w-4" />
        </Button>

        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <StepIcon className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-xl">{currentStepData.title}</CardTitle>
          <CardDescription className="text-base">
            {currentStepData.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            {currentStepData.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`
                  w-2 h-2 rounded-full
                  ${index <= currentStep ? 'bg-green-600' : 'bg-gray-300'}
                `}
              />
            ))}
          </div>

          {/* Step counter */}
          <div className="text-center text-sm text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </div>

          <div className="flex justify-between items-center gap-2">
            <Button
              variant="ghost"
              onClick={onComplete}
              className="text-gray-500"
            >
              Skip Tutorial
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                Back
              </Button>
              <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">
                {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
