import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, User, AlertTriangle, CheckCircle } from 'lucide-react';

interface AITransparencyBadgeProps {
  isAIResponse: boolean;
  confidence?: number;
  requiresHumanReview?: boolean;
  className?: string;
}

const AITransparencyBadge: React.FC<AITransparencyBadgeProps> = ({
  isAIResponse,
  confidence = 100,
  requiresHumanReview = false,
  className = ""
}) => {
  const getConfidenceColor = (conf: number) => {
    if (conf >= 80) return "text-green-600 bg-green-50";
    if (conf >= 60) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <Card className={`border-l-4 ${isAIResponse ? 'border-l-blue-500' : 'border-l-green-500'} ${className}`}>
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isAIResponse ? (
              <Bot className="h-4 w-4 text-blue-600" />
            ) : (
              <User className="h-4 w-4 text-green-600" />
            )}
            <Badge variant={isAIResponse ? "secondary" : "default"}>
              {isAIResponse ? "AI Assistant" : "Human Teacher"}
            </Badge>
          </div>
          
          {isAIResponse && (
            <div className="flex items-center gap-2">
              {requiresHumanReview && (
                <Badge variant="outline" className="text-orange-600">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Review Needed
                </Badge>
              )}
              <Badge className={getConfidenceColor(confidence)}>
                <CheckCircle className="h-3 w-3 mr-1" />
                {confidence}% Confident
              </Badge>
            </div>
          )}
        </div>
        
        {isAIResponse && confidence < 80 && (
          <p className="text-xs text-gray-600 mt-2">
            This response has lower confidence. Consider asking a human teacher for verification.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default AITransparencyBadge;