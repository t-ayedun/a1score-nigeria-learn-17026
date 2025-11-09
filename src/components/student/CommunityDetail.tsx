
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Users, 
  MessageCircle, 
  ArrowLeft, 
  Send, 
  ThumbsUp, 
  Flag,
  Shield,
  Pin,
  Calendar,
  BookOpen,
  Star,
  UserPlus,
  UserCheck,
  Clock
} from "lucide-react";

interface CommunityDetailProps {
  community: {
    id: string;
    name: string;
    type: 'school' | 'zone' | 'subject';
    member_count: number;
    post_count: number;
    description: string;
    location?: string;
    school?: string;
    subject?: string;
    isJoined: boolean;
  };
  onBack: () => void;
  onJoin: (communityId: string) => void;
}

const CommunityDetail = ({ community, onBack, onJoin }: CommunityDetailProps) => {
  const [newPost, setNewPost] = useState("");
  const [activeTab, setActiveTab] = useState("posts");
  const [messageRequests, setMessageRequests] = useState<{[key: string]: 'none' | 'pending' | 'sent' | 'connected'}>({});
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    checkCurrentUser();
    if (community.isJoined) {
      loadMessageRequests();
    }
  }, [community.isJoined]);

  const checkCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUser(user);
  };

  const loadMessageRequests = async () => {
    if (!currentUser) return;

    try {
      // Check for existing requests and connections
      const { data: requests } = await supabase
        .from('message_requests')
        .select('receiver_id, sender_id, status')
        .or(`sender_id.eq.${currentUser.id},receiver_id.eq.${currentUser.id}`);

      const { data: connections } = await supabase
        .from('user_connections')
        .select('user1_id, user2_id')
        .or(`user1_id.eq.${currentUser.id},user2_id.eq.${currentUser.id}`);

      const requestStatus: {[key: string]: 'none' | 'pending' | 'sent' | 'connected'} = {};

      // Check connections first
      connections?.forEach(conn => {
        const otherUserId = conn.user1_id === currentUser.id ? conn.user2_id : conn.user1_id;
        requestStatus[otherUserId] = 'connected';
      });

      // Check requests
      requests?.forEach(req => {
        if (req.sender_id === currentUser.id) {
          requestStatus[req.receiver_id] = req.status === 'pending' ? 'sent' : 'connected';
        } else if (req.receiver_id === currentUser.id) {
          requestStatus[req.sender_id] = req.status === 'pending' ? 'pending' : 'connected';
        }
      });

      setMessageRequests(requestStatus);
    } catch (error) {
      console.error('Error loading message requests:', error);
    }
  };

  const sendMessageRequest = async (receiverId: string) => {
    if (!currentUser) return;

    try {
      const { error } = await supabase
        .from('message_requests')
        .insert({
          sender_id: currentUser.id,
          receiver_id: receiverId,
          message: 'Would like to connect and message you'
        });

      if (error) throw error;

      setMessageRequests(prev => ({
        ...prev,
        [receiverId]: 'sent'
      }));

      toast.success('Message request sent!');
    } catch (error) {
      console.error('Error sending request:', error);
      toast.error('Failed to send request');
    }
  };

  const mockPosts = [
    {
      id: 1,
      author: "Adebayo Olamide",
      avatar: "/placeholder.svg",
      content: "Can anyone help me with this calculus problem? I'm struggling with derivatives.",
      timestamp: "2 hours ago",
      likes: 12,
      replies: 5,
      isPinned: true,
      isModerated: true
    },
    {
      id: 2,
      author: "Fatima Hassan",
      avatar: "/placeholder.svg",
      content: "Just finished my physics assignment! The concepts are finally clicking. Thanks to everyone who helped in the study group.",
      timestamp: "4 hours ago",
      likes: 8,
      replies: 3,
      isPinned: false,
      isModerated: true
    },
    {
      id: 3,
      author: "Chinedu Okoro",
      avatar: "/placeholder.svg",
      content: "Does anyone have notes from yesterday's lecture on organic chemistry? I missed class due to illness.",
      timestamp: "6 hours ago",
      likes: 15,
      replies: 7,
      isPinned: false,
      isModerated: true
    }
  ];

  const mockMembers = [
    { id: "user1", name: "Adebayo Olamide", role: "Moderator", joined: "2 months ago", avatar: "/placeholder.svg" },
    { id: "user2", name: "Fatima Hassan", role: "Member", joined: "1 month ago", avatar: "/placeholder.svg" },
    { id: "user3", name: "Chinedu Okoro", role: "Member", joined: "3 weeks ago", avatar: "/placeholder.svg" },
    { id: "user4", name: "Aisha Musa", role: "Member", joined: "2 weeks ago", avatar: "/placeholder.svg" },
    { id: "user5", name: "Kemi Adebayo", role: "Member", joined: "1 week ago", avatar: "/placeholder.svg" }
  ];

  const getMessageButtonContent = (userId: string) => {
    const status = messageRequests[userId] || 'none';
    
    switch (status) {
      case 'connected':
        return { text: 'Message', icon: MessageCircle, variant: 'default' as const, disabled: false };
      case 'sent':
        return { text: 'Request Sent', icon: Clock, variant: 'outline' as const, disabled: true };
      case 'pending':
        return { text: 'Accept Request', icon: UserCheck, variant: 'default' as const, disabled: false };
      default:
        return { text: 'Send Request', icon: UserPlus, variant: 'outline' as const, disabled: false };
    }
  };

  const mockEvents = [
    { name: "Study Group - Mathematics", date: "Tomorrow, 3:00 PM", participants: 12 },
    { name: "Physics Lab Discussion", date: "Friday, 2:00 PM", participants: 8 },
    { name: "Exam Preparation Session", date: "Next Monday, 10:00 AM", participants: 25 }
  ];

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      // In a real app, this would send to backend
      console.log("Posting:", newPost);
      setNewPost("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Communities
        </Button>
        {!community.isJoined && (
          <Button onClick={() => onJoin(community.id)}>
            Join Community
          </Button>
        )}
      </div>

      {/* Community Info */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{community.name}</CardTitle>
              <p className="text-muted-foreground mt-2">{community.description}</p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{community.member_count.toLocaleString()} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm">{community.post_count} posts</span>
                </div>
                <Badge variant="outline">{community.type}</Badge>
                <Badge className="bg-green-100 text-green-800">
                  <Shield className="h-3 w-3 mr-1" />
                  Moderated
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          {/* Create Post */}
          {community.isJoined && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Textarea
                    placeholder="Share something with the community..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      <Shield className="h-3 w-3 inline mr-1" />
                      Posts are reviewed by moderators before appearing
                    </p>
                    <Button onClick={handlePostSubmit} disabled={!newPost.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      Post
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Posts */}
          <div className="space-y-4">
            {mockPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.avatar} />
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{post.author}</span>
                        <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                        {post.isPinned && <Pin className="h-3 w-3 text-blue-600" />}
                        {post.isModerated && (
                          <Badge variant="secondary" className="text-xs">
                            <Shield className="h-2 w-2 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm mb-3">{post.content}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <button className="flex items-center gap-1 hover:text-blue-600">
                          <ThumbsUp className="h-3 w-3" />
                          {post.likes}
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-600">
                          <MessageCircle className="h-3 w-3" />
                          {post.replies} replies
                        </button>
                        <button className="flex items-center gap-1 hover:text-red-600">
                          <Flag className="h-3 w-3" />
                          Report
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          {!community.isJoined && (
            <Card className="p-6 text-center bg-muted/30">
              <Shield className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Join the community to see members and connect with them</p>
            </Card>
          )}
          
          {community.isJoined && (
            <div className="grid gap-4">
              {mockMembers.map((member) => {
                const buttonContent = getMessageButtonContent(member.id);
                const ButtonIcon = buttonContent.icon;
                
                return (
                  <Card key={member.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{member.name}</span>
                              {member.role === "Moderator" && (
                                <Badge className="bg-blue-100 text-blue-800">
                                  <Shield className="h-3 w-3 mr-1" />
                                  Moderator
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">Joined {member.joined}</p>
                          </div>
                        </div>
                        <Button 
                          variant={buttonContent.variant} 
                          size="sm"
                          disabled={buttonContent.disabled}
                          onClick={() => {
                            if (buttonContent.text === 'Send Request') {
                              sendMessageRequest(member.id);
                            } else if (buttonContent.text === 'Message') {
                              toast.info('Direct messaging feature coming soon!');
                            } else if (buttonContent.text === 'Accept Request') {
                              // Handle accept request
                              toast.info('Request acceptance feature coming soon!');
                            }
                          }}
                          className="min-w-[120px]"
                        >
                          <ButtonIcon className="h-4 w-4 mr-2" />
                          {buttonContent.text}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="grid gap-4">
            {mockEvents.map((event, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{event.name}</h4>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                        <p className="text-sm text-muted-foreground">
                          {event.participants} participants
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Join Event
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityDetail;
