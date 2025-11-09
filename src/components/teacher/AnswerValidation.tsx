
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, DollarSign, Clock, AlertTriangle } from "lucide-react";

const AnswerValidation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [earnings, setEarnings] = useState(1250);

  const flaggedAnswers = [
    {
      id: 1,
      question: "Solve for x: 2x + 5 = 15",
      studentAnswer: "x = 5",
      aiResponse: "To solve 2x + 5 = 15:\nStep 1: Subtract 5 from both sides\n2x = 10\nStep 2: Divide by 2\nx = 5",
      subject: "Mathematics",
      student: "Adebayo Olamide",
      flagReason: "Student disputed AI explanation",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      question: "What is photosynthesis?",
      studentAnswer: "Process where plants make food using sunlight",
      aiResponse: "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll pigments.",
      subject: "Biology",
      student: "Fatima Hassan",
      flagReason: "AI response too complex for grade level",
      timestamp: "4 hours ago"
    },
    {
      id: 3,
      question: "Calculate the momentum of a 5kg object moving at 10m/s",
      studentAnswer: "momentum = 50 kg⋅m/s",
      aiResponse: "Using the formula p = mv:\np = 5kg × 10m/s = 50 kg⋅m/s",
      subject: "Physics",
      student: "Chinedu Okoro",
      flagReason: "Student wants more detailed explanation",
      timestamp: "6 hours ago"
    }
  ];

  const currentAnswer = flaggedAnswers[currentIndex];

  const handleValidation = (isCorrect: boolean) => {
    const earningsIncrease = isCorrect ? 50 : 25; // Naira earnings per validation
    setEarnings(prev => prev + earningsIncrease);
    
    if (currentIndex < flaggedAnswers.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // Loop back to first for demo
    }
  };

  const validationStats = [
    { label: 'Total Earnings', value: `₦${earnings.toLocaleString()}`, icon: DollarSign, color: 'text-green-600' },
    { label: 'Pending Reviews', value: '18', icon: Clock, color: 'text-orange-600' },
    { label: 'Completed Today', value: '12', icon: CheckCircle, color: 'text-blue-600' },
    { label: 'Accuracy Rate', value: '94%', icon: AlertTriangle, color: 'text-purple-600' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            Answer Validation Center
          </CardTitle>
          <p className="text-gray-600">Review and validate AI responses to earn ₦25-50 per validation. Help improve answer quality for students.</p>
        </CardHeader>
      </Card>

      {/* Validation Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {validationStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Current Validation Task */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Review #{currentAnswer.id}</CardTitle>
            <Badge variant="outline">{currentAnswer.subject}</Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Student: {currentAnswer.student}</span>
            <span>•</span>
            <span>{currentAnswer.timestamp}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Question */}
          <div>
            <h3 className="font-semibold mb-2">Question:</h3>
            <p className="bg-gray-50 p-3 rounded-lg">{currentAnswer.question}</p>
          </div>

          {/* Student Answer */}
          <div>
            <h3 className="font-semibold mb-2">Student's Answer:</h3>
            <p className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">{currentAnswer.studentAnswer}</p>
          </div>

          {/* AI Response */}
          <div>
            <h3 className="font-semibold mb-2">AI Response to Validate:</h3>
            <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
              <pre className="whitespace-pre-wrap text-sm">{currentAnswer.aiResponse}</pre>
            </div>
          </div>

          {/* Flag Reason */}
          <div>
            <h3 className="font-semibold mb-2">Why was this flagged?</h3>
            <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-500 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-600 flex-shrink-0" />
              <span>{currentAnswer.flagReason}</span>
            </div>
          </div>

          {/* Validation Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              onClick={() => handleValidation(true)}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve (+₦50)
            </Button>
            <Button
              onClick={() => handleValidation(false)}
              variant="destructive"
              className="flex-1"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject (+₦25)
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-sm text-gray-600">
              {currentIndex + 1} of {flaggedAnswers.length} reviews
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentIndex(Math.min(flaggedAnswers.length - 1, currentIndex + 1))}
                disabled={currentIndex === flaggedAnswers.length - 1}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Validation Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Approve</span> when the AI response is accurate, helpful, and appropriate for the student's level
              </div>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Reject</span> when the response contains errors, is too complex, or doesn't address the question properly
              </div>
            </div>
            <div className="flex items-start gap-2">
              <DollarSign className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Earnings:</span> ₦50 for approved answers, ₦25 for rejected answers. Higher accuracy = bonus payments!
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnswerValidation;
