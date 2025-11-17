
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calculator, FlaskConical, BookOpen,
  Brain, Zap
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import HomeworkScanner from "./HomeworkScanner";
import EnhancedLearningPaths from "./EnhancedLearningPaths";
import TutorSelection from "./TutorSelection";
import TutorHeader from "./TutorHeader";
import ChatMessage from "./ChatMessage";
import TutorTypingIndicator from "./TutorTypingIndicator";
import MessageInput from "./MessageInput";
import PDFUploader from "./PDFUploader";
import PDFAnalysisViewer from "./PDFAnalysisViewer";
import BackToDashboard from "@/components/shared/BackToDashboard";
import PageHeader from "@/components/shared/PageHeader";

interface Message {
  id: number;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
  subject?: string;
  tutorPersonality?: string;
}

interface TutorPersonality {
  id: string;
  name: string;
  subject: string;
  personality: string;
  greeting: string;
  icon: any;
  color: string;
  expertise: string[];
}

interface AITutorChatProps {
  onBackToDashboard?: () => void;
}

const AITutorChat = ({ onBackToDashboard }: AITutorChatProps = {}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<TutorPersonality | null>(null);
  const [conversationMemory, setConversationMemory] = useState<{[key: string]: any}>({});
  const [pdfAnalysis, setPdfAnalysis] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const tutorPersonalities: TutorPersonality[] = [
    {
      id: 'math-mentor',
      name: 'Professor Adeyemi',
      subject: 'Mathematics',
      personality: 'patient and methodical',
      greeting: 'Hello! I\'m Professor Adeyemi, your Mathematics tutor. I love breaking down complex problems into simple steps. What mathematical challenge can we solve together today?',
      icon: Calculator,
      color: 'bg-blue-100 text-blue-700',
      expertise: ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'JAMB Math']
    },
    {
      id: 'physics-guru',
      name: 'Dr. Kemi',
      subject: 'Physics',
      personality: 'enthusiastic and practical',
      greeting: 'Hey there! Dr. Kemi here, ready to make Physics exciting! I connect every concept to real-world applications. What aspect of our physical world shall we explore?',
      icon: Zap,
      color: 'bg-purple-100 text-purple-700',
      expertise: ['Mechanics', 'Electricity', 'Waves', 'Modern Physics', 'WAEC Physics']
    },
    {
      id: 'chemistry-expert',
      name: 'Mr. Emeka',
      subject: 'Chemistry',
      personality: 'detail-oriented and encouraging',
      greeting: 'Welcome! I\'m Mr. Emeka, your Chemistry guide. Chemistry is like cooking - it\'s all about the right ingredients and reactions! What reaction can we study today?',
      icon: FlaskConical,
      color: 'bg-green-100 text-green-700',
      expertise: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'JAMB Chemistry']
    },
    {
      id: 'english-coach',
      name: 'Mrs. Fatima',
      subject: 'English',
      personality: 'articulate and supportive',
      greeting: 'Good day! I\'m Mrs. Fatima, your English Language coach. I\'m here to help you master grammar, essays, and literature. How can I help you express yourself better today?',
      icon: BookOpen,
      color: 'bg-orange-100 text-orange-700',
      expertise: ['Grammar', 'Essay Writing', 'Literature', 'WAEC English', 'JAMB English']
    },
    {
      id: 'general-ai',
      name: 'AIDA',
      subject: 'General Studies',
      personality: 'adaptive and knowledgeable',
      greeting: 'Hi! I\'m AIDA, your AI learning assistant. I can help with any subject and adapt to your learning style. What would you like to learn today?',
      icon: Brain,
      color: 'bg-pink-100 text-pink-700',
      expertise: ['Cross-subject support', 'Study strategies', 'Exam preparation', 'Learning techniques']
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load conversation memory from localStorage
    const savedMemory = localStorage.getItem('aiTutorMemory');
    if (savedMemory) {
      setConversationMemory(JSON.parse(savedMemory));
    }
  }, []);

  const saveConversationMemory = (memory: any) => {
    setConversationMemory(memory);
    localStorage.setItem('aiTutorMemory', JSON.stringify(memory));
  };

  const selectTutor = (tutor: TutorPersonality) => {
    setSelectedTutor(tutor);
    const greeting: Message = {
      id: Date.now(),
      type: 'ai',
      content: tutor.greeting,
      timestamp: new Date(),
      subject: tutor.subject,
      tutorPersonality: tutor.name
    };
    setMessages([greeting]);
    
    // Update conversation memory
    const newMemory = {
      ...conversationMemory,
      selectedTutor: tutor.id,
      lastInteraction: new Date().toISOString(),
      preferences: {
        ...conversationMemory.preferences,
        preferredSubject: tutor.subject
      }
    };
    saveConversationMemory(newMemory);
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    const tutor = selectedTutor || tutorPersonalities[4]; // Default to AIDA
    
    try {
      setIsTyping(true);
      
      // Call the AI tutor chat function
      const { data, error } = await supabase.functions.invoke('ai-tutor-chat', {
        body: {
          message: userMessage,
          tutorId: tutor.id,
          subject: tutor.subject,
          conversationContext: {
            personality: tutor.personality,
            expertise: tutor.expertise,
            greeting: tutor.greeting
          }
        }
      });

      if (error) {
        console.error('AI tutor error:', error);
        return `I apologize, but I'm having trouble connecting right now. As ${tutor.name}, I want to help you with ${tutor.subject}. Could you try asking your question again in a moment?`;
      }

      return data.response || `Hi! I'm ${tutor.name}, your ${tutor.subject} tutor. I'm here to help you succeed! What would you like to learn about today?`;
    } catch (error) {
      console.error('Error generating AI response:', error);
      return `I'm ${tutor.name}, and I'm excited to help you with ${tutor.subject}! There seems to be a connection issue, but let's work through this together. What topic are you studying?`;
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const aiResponse = await generateAIResponse(text);
    const aiMessage: Message = {
      id: messages.length + 2,
      type: 'ai',
      content: aiResponse,
      timestamp: new Date(),
      subject: selectedTutor?.subject,
      tutorPersonality: selectedTutor?.name
    };

    setIsTyping(false);
    setMessages(prev => [...prev, aiMessage]);
  };

  const handleHomeworkSolved = (solution: string) => {
    const aiMessage: Message = {
      id: messages.length + 1,
      type: 'ai',
      content: `📸 **Homework Solution Detected!**\n\n${solution}\n\nWould you like me to explain any part of this solution in more detail? I can also create similar practice problems for you!`,
      timestamp: new Date(),
      subject: selectedTutor?.subject || 'General',
      tutorPersonality: selectedTutor?.name || 'AIDA'
    };
    setMessages(prev => [...prev, aiMessage]);
  };

  const handlePDFAnalysis = (analysis: any) => {
    setPdfAnalysis(analysis);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {onBackToDashboard && (
        <BackToDashboard onClick={onBackToDashboard} />
      )}

      <PageHeader
        title="AI Tutoring Center"
        description="Choose your personal tutor, scan homework, or explore adaptive learning paths"
        breadcrumbs={[
          { label: "Dashboard", onClick: onBackToDashboard },
          { label: "AI Tutor" }
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>🎓 A1Score AI Tutoring Center</CardTitle>
          <p className="text-gray-600">
            Choose your personal tutor, scan homework, or explore adaptive learning paths
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat">AI Chat Tutor</TabsTrigger>
          <TabsTrigger value="scanner">Homework Scanner</TabsTrigger>
          <TabsTrigger value="paths">Learning Paths</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          {/* Tutor Selection */}
          {!selectedTutor && (
            <TutorSelection 
              tutorPersonalities={tutorPersonalities}
              onSelectTutor={selectTutor}
            />
          )}

          {/* Active Chat */}
          {selectedTutor && (
            <>
              {/* Tutor Header */}
              <TutorHeader 
                selectedTutor={selectedTutor}
                conversationMemory={conversationMemory}
                onSwitchTutor={() => setSelectedTutor(null)}
              />

              {/* Chat Messages */}
              <Card>
                <CardContent className="p-0">
                  <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <ChatMessage 
                        key={message.id}
                        message={message}
                        selectedTutor={selectedTutor}
                      />
                    ))}
                    
                    {isTyping && (
                      <TutorTypingIndicator selectedTutor={selectedTutor} />
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  
                  {/* Message Input */}
                  <MessageInput 
                    inputMessage={inputMessage}
                    setInputMessage={setInputMessage}
                    onSendMessage={handleSendMessage}
                    selectedTutor={selectedTutor}
                    isTyping={isTyping}
                  />
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="scanner" className="space-y-6">
          <HomeworkScanner onSolutionGenerated={handleHomeworkSolved} />
          
          <div className="border-t pt-6">
            <PDFUploader onAnalysisComplete={handlePDFAnalysis} />
          </div>
          
          {pdfAnalysis && (
            <div className="border-t pt-6">
              <PDFAnalysisViewer analysis={pdfAnalysis} />
            </div>
          )}
        </TabsContent>

        <TabsContent value="paths">
          <EnhancedLearningPaths />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AITutorChat;
