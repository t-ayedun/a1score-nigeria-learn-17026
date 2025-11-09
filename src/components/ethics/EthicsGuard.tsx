
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle, Clock, BookOpen } from "lucide-react";

interface EthicsGuardProps {
  query: string;
  isExamMode?: boolean;
  onApprove: () => void;
  onReject: (reason: string) => void;
}

const EthicsGuard = ({ query, isExamMode = false, onApprove, onReject }: EthicsGuardProps) => {
  const [analysisResult, setAnalysisResult] = useState<{
    riskLevel: 'low' | 'medium' | 'high';
    concerns: string[];
    recommendation: string;
    ethicalResponse: string;
  } | null>(null);

  const analyzeQuery = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    
    // Check for academic dishonesty patterns
    const cheatingIndicators = [
      'write my essay', 'do my homework', 'complete my assignment',
      'give me the answer', 'solve this for me', 'write this for me'
    ];
    
    const examModeViolations = [
      'help me cheat', 'exam answers', 'test solutions'
    ];

    const hasCheatingIndicators = cheatingIndicators.some(indicator => 
      lowercaseQuery.includes(indicator)
    );

    const hasExamViolations = examModeViolations.some(violation => 
      lowercaseQuery.includes(violation)
    );

    if (isExamMode && (hasCheatingIndicators || hasExamViolations)) {
      return {
        riskLevel: 'high' as const,
        concerns: ['Exam mode violation detected', 'Potential academic dishonesty'],
        recommendation: 'Block request and notify instructor',
        ethicalResponse: "I notice you're in exam mode. I can't provide direct answers during exams, but I'm here to help you learn afterward!"
      };
    }

    if (hasCheatingIndicators) {
      return {
        riskLevel: 'medium' as const,
        concerns: ['Potential homework completion request'],
        recommendation: 'Redirect to collaborative learning',
        ethicalResponse: "I'd love to help you learn! Instead of writing this for you, let's work through it step by step. What's your understanding of the topic so far?"
      };
    }

    return {
      riskLevel: 'low' as const,
      concerns: [],
      recommendation: 'Proceed with educational assistance',
      ethicalResponse: ''
    };
  };

  useEffect(() => {
    if (query) {
      const result = analyzeQuery(query);
      setAnalysisResult(result);
    }
  }, [query, isExamMode]);

  if (!analysisResult) return null;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'medium': return <Clock className="h-5 w-5 text-orange-600" />;
      default: return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
  };

  return (
    <Card className={`border-2 ${getRiskColor(analysisResult.riskLevel)}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          AI Ethics & Academic Integrity Check
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          {getRiskIcon(analysisResult.riskLevel)}
          <span className="font-medium">Risk Level: </span>
          <Badge variant={analysisResult.riskLevel === 'high' ? 'destructive' : 
                         analysisResult.riskLevel === 'medium' ? 'default' : 'secondary'}>
            {analysisResult.riskLevel.toUpperCase()}
          </Badge>
          {isExamMode && <Badge variant="outline" className="bg-blue-50">EXAM MODE</Badge>}
        </div>

        {analysisResult.concerns.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Concerns Detected:</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {analysisResult.concerns.map((concern, index) => (
                <li key={index} className="text-gray-700">{concern}</li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h4 className="font-medium mb-2">Recommendation:</h4>
          <p className="text-sm text-gray-700">{analysisResult.recommendation}</p>
        </div>

        {analysisResult.ethicalResponse && (
          <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Ethical AI Response:
            </h4>
            <p className="text-sm italic">"{analysisResult.ethicalResponse}"</p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          {analysisResult.riskLevel === 'low' ? (
            <Button onClick={onApprove} className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Proceed with Query
            </Button>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={() => onReject(analysisResult.recommendation)}
              >
                Block Query
              </Button>
              <Button 
                onClick={onApprove}
                variant="secondary"
              >
                Override (Educational Purpose)
              </Button>
            </>
          )}
        </div>

        <div className="text-xs text-gray-500 border-t pt-2">
          <p><strong>Academic Integrity Reminder:</strong> A1Score is designed to enhance learning, not replace it. Always use AI assistance ethically and in accordance with your institution's policies.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EthicsGuard;
