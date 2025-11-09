
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Lightbulb } from "lucide-react";

const sampleQuestions = [
  {
    id: 1,
    subject: 'Mathematics',
    topic: 'Logarithms',
    question: 'If log₂ 8 = x, find the value of x',
    options: ['2', '3', '4', '8'],
    correct: 1,
    explanation: 'Since 2³ = 8, therefore log₂ 8 = 3. The logarithm asks: "To what power must we raise 2 to get 8?" The answer is 3.',
    difficulty: 'Medium',
    examType: 'JAMB'
  },
  {
    id: 2,
    subject: 'Physics',
    topic: 'Electricity',
    question: 'The unit of electric field intensity is',
    options: ['NC⁻¹', 'Nm⁻¹', 'Vm⁻¹', 'Both A and C'],
    correct: 3,
    explanation: 'Electric field intensity can be measured in Newtons per Coulomb (NC⁻¹) or Volts per meter (Vm⁻¹). Both are equivalent units.',
    difficulty: 'Easy',
    examType: 'WAEC'
  },
  {
    id: 3,
    subject: 'Chemistry',
    topic: 'Organic Chemistry',
    question: 'The general formula for alkanes is',
    options: ['CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙHₙ'],
    correct: 1,
    explanation: 'Alkanes are saturated hydrocarbons with the general formula CₙH₂ₙ₊₂, where n is the number of carbon atoms.',
    difficulty: 'Easy',
    examType: 'JAMB'
  },
  {
    id: 4,
    subject: 'English',
    topic: 'Comprehension',
    question: 'In the sentence "The boy who came yesterday is my brother", the clause "who came yesterday" is a',
    options: ['Noun clause', 'Adverbial clause', 'Relative clause', 'Independent clause'],
    correct: 2,
    explanation: 'A relative clause modifies a noun and is introduced by relative pronouns like "who", "which", "that". It provides additional information about "the boy".',
    difficulty: 'Medium',
    examType: 'WAEC'
  }
];

const SampleQuestions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const question = sampleQuestions[currentQuestion];

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === question.correct) {
      setScore(prev => prev + 1);
    }
    
    setAnsweredQuestions(prev => [...prev, currentQuestion]);
  };

  const nextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const isQuizComplete = answeredQuestions.length === sampleQuestions.length;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">
            {question.subject} Practice Question
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="secondary">{question.examType}</Badge>
            <Badge variant="outline">{question.difficulty}</Badge>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Topic: {question.topic}</span>
          <span>Question {currentQuestion + 1} of {sampleQuestions.length}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {!isQuizComplete ? (
          <>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-lg font-medium">{question.question}</p>
            </div>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    selectedAnswer === null 
                      ? "outline" 
                      : selectedAnswer === index
                        ? index === question.correct ? "default" : "destructive"
                        : index === question.correct ? "default" : "ghost"
                  }
                  className={`w-full justify-start text-left h-auto p-4 ${
                    selectedAnswer === null ? "hover:bg-blue-50" : ""
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                >
                  <span className="mr-3 font-semibold">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span>{option}</span>
                  {selectedAnswer !== null && (
                    <span className="ml-auto">
                      {index === question.correct ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : selectedAnswer === index ? (
                        <XCircle className="h-5 w-5 text-red-600" />
                      ) : null}
                    </span>
                  )}
                </Button>
              ))}
            </div>

            {showExplanation && (
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Explanation</h4>
                    <p className="text-blue-800">{question.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Score: {score}/{answeredQuestions.length}
              </div>
              {showExplanation && (
                <Button onClick={nextQuestion}>
                  {currentQuestion < sampleQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                </Button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="p-6 bg-green-50 rounded-lg">
              <h3 className="text-2xl font-bold text-green-800 mb-2">Quiz Complete!</h3>
              <p className="text-lg text-green-700">
                Your Score: {score}/{sampleQuestions.length} ({Math.round((score/sampleQuestions.length) * 100)}%)
              </p>
              <p className="text-sm text-green-600 mt-2">
                {score >= sampleQuestions.length * 0.8 
                  ? "Excellent work! You're well prepared for your exams!" 
                  : score >= sampleQuestions.length * 0.6
                    ? "Good job! Keep practicing to improve your score."
                    : "Don't worry! More practice will help you improve."
                }
              </p>
            </div>
            <Button onClick={resetQuiz} className="w-full">
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SampleQuestions;
