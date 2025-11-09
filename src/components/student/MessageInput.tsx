
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

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

interface MessageInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onSendMessage: () => void;
  selectedTutor: TutorPersonalityData;
  isTyping: boolean;
}

const MessageInput = ({ 
  inputMessage, 
  setInputMessage, 
  onSendMessage, 
  selectedTutor, 
  isTyping 
}: MessageInputProps) => {
  return (
    <div className="border-t p-4">
      <div className="flex gap-2">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={`Ask ${selectedTutor.name} anything about ${selectedTutor.subject}...`}
          onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
          className="flex-1"
        />
        <Button onClick={onSendMessage} disabled={!inputMessage.trim() || isTyping}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
