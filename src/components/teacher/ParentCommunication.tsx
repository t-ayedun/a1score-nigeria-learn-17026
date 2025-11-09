import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Send, 
  Search,
  Filter,
  Phone,
  Video,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  User,
  Mail,
  Bell
} from "lucide-react";

interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  children: string[];
  lastContact: string;
  responseRate: number;
  preferredContact: 'email' | 'phone' | 'app';
}

interface Message {
  id: string;
  parentId: string;
  subject: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read' | 'replied';
  priority: 'low' | 'medium' | 'high';
  type: 'general' | 'behavioral' | 'academic' | 'attendance';
}

interface Meeting {
  id: string;
  parentId: string;
  title: string;
  date: string;
  time: string;
  type: 'in-person' | 'video' | 'phone';
  status: 'scheduled' | 'completed' | 'cancelled';
  agenda: string[];
}

const ParentCommunication = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  const [messageContent, setMessageContent] = useState("");
  const [messageSubject, setMessageSubject] = useState("");
  const [messageType, setMessageType] = useState("general");
  const [messagePriority, setMessagePriority] = useState("medium");

  const mockParents: Parent[] = [
    {
      id: "p1",
      name: "Mrs. Adebayo Funmi",
      email: "funmi.adebayo@email.com",
      phone: "+234 803 123 4567",
      children: ["Adebayo Kemi", "Adebayo Tunde"],
      lastContact: "2024-01-15",
      responseRate: 95,
      preferredContact: "email"
    },
    {
      id: "p2",
      name: "Mr. Okafor Chidi",
      email: "chidi.okafor@email.com",
      phone: "+234 807 987 6543",
      children: ["Okafor Chioma"],
      lastContact: "2024-01-12",
      responseRate: 88,
      preferredContact: "phone"
    },
    {
      id: "p3",
      name: "Mrs. Hassan Aisha",
      email: "aisha.hassan@email.com",
      phone: "+234 805 555 0123",
      children: ["Hassan Fatima", "Hassan Ibrahim"],
      lastContact: "2024-01-18",
      responseRate: 92,
      preferredContact: "app"
    }
  ];

  const mockMessages: Message[] = [
    {
      id: "m1",
      parentId: "p1",
      subject: "Kemi's Academic Progress",
      content: "I wanted to update you on Kemi's excellent performance in Mathematics this term...",
      timestamp: "2024-01-15 10:30",
      status: "replied",
      priority: "medium",
      type: "academic"
    },
    {
      id: "m2",
      parentId: "p2",
      subject: "Parent-Teacher Conference Request",
      content: "I would like to schedule a meeting to discuss Chioma's recent behavior in class...",
      timestamp: "2024-01-12 14:15",
      status: "read",
      priority: "high",
      type: "behavioral"
    }
  ];

  const mockMeetings: Meeting[] = [
    {
      id: "meet1",
      parentId: "p1",
      title: "Academic Progress Discussion",
      date: "2024-01-25",
      time: "14:00",
      type: "video",
      status: "scheduled",
      agenda: ["Review term grades", "Discuss improvement areas", "Set goals for next term"]
    },
    {
      id: "meet2",
      parentId: "p3",
      title: "Behavioral Concerns",
      date: "2024-01-22",
      time: "15:30",
      type: "in-person",
      status: "scheduled",
      agenda: ["Discuss classroom behavior", "Create action plan", "Follow-up schedule"]
    }
  ];

  const filteredParents = mockParents.filter(parent =>
    parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.children.some(child => child.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getParentMessages = (parentId: string) => {
    return mockMessages.filter(msg => msg.parentId === parentId);
  };

  const getParentMeetings = (parentId: string) => {
    return mockMeetings.filter(meeting => meeting.parentId === parentId);
  };

  const handleSendMessage = () => {
    if (!selectedParent || !messageSubject || !messageContent) return;
    
    // Here you would send the message via your backend
    console.log("Sending message:", {
      parentId: selectedParent.id,
      subject: messageSubject,
      content: messageContent,
      type: messageType,
      priority: messagePriority
    });
    
    // Reset form
    setMessageSubject("");
    setMessageContent("");
    setMessageType("general");
    setMessagePriority("medium");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-gray-100 text-gray-800';
      case 'delivered': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-green-100 text-green-800';
      case 'replied': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-blue-600" />
            Parent Communication Center
          </CardTitle>
          <p className="text-gray-600">Manage communications with parents efficiently and build stronger relationships.</p>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Parent List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Parents & Guardians</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search parents or students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {filteredParents.map((parent) => (
              <div
                key={parent.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedParent?.id === parent.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedParent(parent)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-sm">{parent.name}</h4>
                    <p className="text-xs text-gray-600">{parent.children.join(", ")}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {parent.preferredContact === 'email' && <Mail className="h-3 w-3 text-blue-600" />}
                    {parent.preferredContact === 'phone' && <Phone className="h-3 w-3 text-green-600" />}
                    {parent.preferredContact === 'app' && <Bell className="h-3 w-3 text-purple-600" />}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Response: {parent.responseRate}%</span>
                  <span className="text-gray-500">Last: {parent.lastContact}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Communication Panel */}
        <Card className="lg:col-span-2">
          {selectedParent ? (
            <Tabs defaultValue="compose" className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback>{selectedParent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedParent.name}</h3>
                      <p className="text-sm text-gray-600">{selectedParent.children.join(", ")}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4 mr-2" />
                      Video
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                  </div>
                </div>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="compose">Compose</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="meetings">Meetings</TabsTrigger>
                </TabsList>
              </CardHeader>

              <TabsContent value="compose" className="space-y-4 px-6 pb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message Type</label>
                    <Select value={messageType} onValueChange={setMessageType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Update</SelectItem>
                        <SelectItem value="academic">Academic Progress</SelectItem>
                        <SelectItem value="behavioral">Behavioral Concern</SelectItem>
                        <SelectItem value="attendance">Attendance Issue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Priority</label>
                    <Select value={messagePriority} onValueChange={setMessagePriority}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Input
                    placeholder="Message subject..."
                    value={messageSubject}
                    onChange={(e) => setMessageSubject(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea
                    placeholder="Type your message here..."
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    rows={6}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Preferred contact: {selectedParent.preferredContact}
                  </div>
                  <Button onClick={handleSendMessage} disabled={!messageSubject || !messageContent}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="history" className="px-6 pb-6">
                <div className="space-y-4">
                  {getParentMessages(selectedParent.id).map((message) => (
                    <Card key={message.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{message.subject}</h4>
                          <div className="flex gap-2">
                            <Badge className={getPriorityColor(message.priority)}>
                              {message.priority}
                            </Badge>
                            <Badge className={getStatusColor(message.status)}>
                              {message.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{message.content}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{message.type}</span>
                          <span>{message.timestamp}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {getParentMessages(selectedParent.id).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No message history with this parent</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="meetings" className="px-6 pb-6">
                <div className="space-y-4">
                  {getParentMeetings(selectedParent.id).map((meeting) => (
                    <Card key={meeting.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{meeting.title}</h4>
                          <Badge variant={meeting.status === 'scheduled' ? 'default' : 'secondary'}>
                            {meeting.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {meeting.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {meeting.time}
                          </div>
                          <div className="flex items-center gap-1">
                            {meeting.type === 'video' && <Video className="h-4 w-4" />}
                            {meeting.type === 'phone' && <Phone className="h-4 w-4" />}
                            {meeting.type === 'in-person' && <User className="h-4 w-4" />}
                            {meeting.type}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-1">Agenda:</p>
                          <ul className="text-sm text-gray-600 list-disc list-inside">
                            {meeting.agenda.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {getParentMeetings(selectedParent.id).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No scheduled meetings with this parent</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Parent</h3>
              <p className="text-gray-600 text-center">Choose a parent from the list to start communicating</p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ParentCommunication;