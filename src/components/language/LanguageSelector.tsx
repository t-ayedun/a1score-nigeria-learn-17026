
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Globe, Volume2, VolumeX, Wifi, WifiOff } from "lucide-react";

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  offlineMode?: boolean;
}

const LanguageSelector = ({ currentLanguage, onLanguageChange, offlineMode = false }: LanguageSelectorProps) => {
  const [speechEnabled, setSpeechEnabled] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧', available: true },
    { code: 'yo', name: 'Yoruba', flag: '🇳🇬', available: true },
    { code: 'ha', name: 'Hausa', flag: '🇳🇬', available: true },
    { code: 'ig', name: 'Igbo', flag: '🇳🇬', available: true },
    { code: 'pid', name: 'Nigerian Pidgin', flag: '🇳🇬', available: true }
  ];

  const sampleTranslations = {
    en: {
      greeting: "Welcome to A1Score! Ready to learn?",
      mathProblem: "Solve: 2x + 5 = 15",
      solution: "Step 1: Subtract 5 from both sides\n2x = 10\nStep 2: Divide by 2\nx = 5"
    },
    yo: {
      greeting: "Eku abo si A1Score! Se o ti setan lati ko?",
      mathProblem: "Yanju: 2x + 5 = 15",
      solution: "Igbesẹ 1: Yo 5 kuro ni apa mejeji\n2x = 10\nIgbesẹ 2: Pin pẹlu 2\nx = 5"
    },
    ha: {
      greeting: "Maraba da zuwa A1Score! Kun shirya don koyo?",
      mathProblem: "Warware: 2x + 5 = 15",
      solution: "Mataki 1: Cire 5 daga bangarorin biyu\n2x = 10\nMataki 2: Raba da 2\nx = 5"
    },
    ig: {
      greeting: "Nnọọ na A1Score! Ị dị njikere ịmụ?",
      mathProblem: "Dozie: 2x + 5 = 15",
      solution: "Nzọụkwụ 1: Wepụ 5 n'akụkụ abụọ\n2x = 10\nNzọụkwụ 2: Kee ụzọ abụọ\nx = 5"
    },
    pid: {
      greeting: "Welcome to A1Score! You don ready to learn?",
      mathProblem: "Solve dis one: 2x + 5 = 15",
      solution: "Step 1: Remove 5 from both side\n2x = 10\nStep 2: Divide am by 2\nx = 5"
    }
  };

  const currentTranslations = sampleTranslations[currentLanguage] || sampleTranslations.en;

  const handleSpeech = (text: string) => {
    if ('speechSynthesis' in window && speechEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage === 'pid' ? 'en-NG' : currentLanguage;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      {/* Language Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            Language & Accessibility
          </CardTitle>
          <div className="flex items-center gap-2">
            {offlineMode ? (
              <Badge variant="secondary" className="flex items-center gap-1">
                <WifiOff className="h-3 w-3" />
                Offline Mode
              </Badge>
            ) : (
              <Badge variant="default" className="flex items-center gap-1">
                <Wifi className="h-3 w-3" />
                Online
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Select value={currentLanguage} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code} disabled={!lang.available}>
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      {lang.name}
                      {!lang.available && <Badge variant="secondary">Coming Soon</Badge>}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSpeechEnabled(!speechEnabled)}
              className="flex items-center gap-2"
            >
              {speechEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              {speechEnabled ? 'Speech On' : 'Speech Off'}
            </Button>
          </div>

          <div className="text-sm text-gray-600">
            <p>Choose your preferred language for AI responses and interface text. Text-to-speech available for accessibility.</p>
          </div>
        </CardContent>
      </Card>

      {/* Sample Content in Selected Language */}
      <Card>
        <CardHeader>
          <CardTitle>Sample Content Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">AI Greeting:</h4>
              <Button size="sm" variant="outline" onClick={() => handleSpeech(currentTranslations.greeting)}>
                <Volume2 className="h-3 w-3 mr-1" />
                Play
              </Button>
            </div>
            <p className="bg-blue-50 p-3 rounded-lg italic">"{currentTranslations.greeting}"</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Math Problem:</h4>
              <Button size="sm" variant="outline" onClick={() => handleSpeech(currentTranslations.mathProblem)}>
                <Volume2 className="h-3 w-3 mr-1" />
                Play
              </Button>
            </div>
            <p className="bg-green-50 p-3 rounded-lg">{currentTranslations.mathProblem}</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">AI Solution:</h4>
              <Button size="sm" variant="outline" onClick={() => handleSpeech(currentTranslations.solution)}>
                <Volume2 className="h-3 w-3 mr-1" />
                Play
              </Button>
            </div>
            <pre className="bg-gray-50 p-3 rounded-lg whitespace-pre-wrap text-sm">{currentTranslations.solution}</pre>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility Features */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Available Features:</h4>
              <ul className="text-sm space-y-1">
                <li>• Text-to-speech for all content</li>
                <li>• Speech-to-text for questions</li>
                <li>• High contrast mode</li>
                <li>• Large text options</li>
                <li>• Keyboard navigation</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Offline Features:</h4>
              <ul className="text-sm space-y-1">
                <li>• Previously viewed lessons</li>
                <li>• Downloaded practice quizzes</li>
                <li>• Saved progress sync</li>
                <li>• Basic calculator functions</li>
                <li>• Formula references</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language Support Info */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Globe className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-800 mb-1">Nigerian Language Support</h4>
              <p className="text-sm text-green-700">
                A1Score is proud to support Nigeria's major languages, making quality education accessible to students 
                regardless of their preferred language. Our AI tutors are trained to provide culturally relevant examples 
                and explanations in your chosen language.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageSelector;
