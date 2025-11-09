import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useEthics } from '@/contexts/EthicsContext';
import { Shield, TrendingUp, BookOpen, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const EthicsDashboard: React.FC = () => {
  const { ethicsState, getAITransparencyLevel } = useEthics();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  const transparencyLevel = getAITransparencyLevel();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ethics Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              <span className={getScoreColor(ethicsState.ethicsScore)}>
                {ethicsState.ethicsScore}/100
              </span>
            </div>
            <Progress value={ethicsState.ethicsScore} className="mb-2" />
            <Badge variant={getScoreBadgeVariant(ethicsState.ethicsScore)}>
              {ethicsState.ethicsScore >= 80 ? 'Excellent' : 
               ethicsState.ethicsScore >= 60 ? 'Good' : 'Needs Improvement'}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Usage</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{ethicsState.aiUsageCount}</div>
            <p className="text-xs text-muted-foreground">
              Total AI interactions
            </p>
            <Badge variant="outline" className="mt-2">
              {transparencyLevel.toUpperCase()} Transparency
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Mode</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium mb-2 capitalize">
              {ethicsState.learningMode}
            </div>
            <p className="text-xs text-muted-foreground">
              Current learning approach
            </p>
            {ethicsState.isExamMode && (
              <Badge variant="destructive" className="mt-2">
                EXAM MODE
              </Badge>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Learning Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Ethical AI Usage</span>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Academic Integrity</span>
                <Badge variant={ethicsState.violations.length === 0 ? "default" : "secondary"}>
                  {ethicsState.violations.length === 0 ? "Maintained" : "Improving"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Responsible Learning</span>
                <Badge variant="default">Committed</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ethicsState.lastAIInteraction ? (
                <div className="text-sm">
                  <p className="text-muted-foreground">Last AI interaction:</p>
                  <p className="font-medium">
                    {ethicsState.lastAIInteraction.toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No recent AI interactions</p>
              )}
              
              {ethicsState.violations.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-orange-600">
                    Recent Reminders:
                  </p>
                  {ethicsState.violations.slice(-3).map((violation, index) => (
                    <p key={index} className="text-xs text-muted-foreground">
                      • {violation}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-blue-600" />
            Ethics Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-green-600 mb-2">✓ Encouraged Practices</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Ask for explanations and step-by-step guidance</li>
                <li>• Use AI to understand difficult concepts</li>
                <li>• Verify AI answers with human teachers</li>
                <li>• Practice problems independently after AI help</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-600 mb-2">✗ Discouraged Practices</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Copying AI answers without understanding</li>
                <li>• Using AI during exams or assessments</li>
                <li>• Submitting AI work as your own</li>
                <li>• Sharing AI answers with classmates</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EthicsDashboard;