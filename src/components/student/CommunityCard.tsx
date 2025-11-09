
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, MapPin, School, BookOpen, Shield } from "lucide-react";

interface Community {
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
}

interface CommunityCardProps {
  community: Community;
  onViewCommunity: (community: Community) => void;
  onJoinCommunity: (communityId: string) => void;
}

const CommunityCard = ({ community, onViewCommunity, onJoinCommunity }: CommunityCardProps) => {
  const getCommunityIcon = (type: string) => {
    switch (type) {
      case 'school': return School;
      case 'zone': return MapPin;
      case 'subject': return BookOpen;
      default: return Users;
    }
  };

  const Icon = getCommunityIcon(community.type);

  return (
    <Card className="hover:shadow-lg transition-shadow h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Icon className={`h-5 w-5 ${community.isJoined ? 'text-green-600' : 'text-blue-600'}`} />
            <Badge variant="outline" className="text-xs">
              {community.type}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Badge className="bg-green-100 text-green-800">
              <Shield className="h-3 w-3 mr-1" />
              Moderated
            </Badge>
            {community.isJoined && (
              <Badge className="bg-green-100 text-green-800">Joined</Badge>
            )}
          </div>
        </div>
        <CardTitle className="text-lg">{community.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col pt-0">
        <div className="flex-grow">
          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{community.description}</p>
          {community.location && (
            <p className="text-xs text-muted-foreground mb-2 flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {community.location}
            </p>
          )}
          <div className="flex justify-between text-sm text-muted-foreground mb-4">
            <span className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {community.member_count.toLocaleString()}
            </span>
            <span className="flex items-center">
              <MessageCircle className="h-4 w-4 mr-1" />
              {community.post_count} posts
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewCommunity(community)}
          >
            View
          </Button>
          {!community.isJoined && (
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => onJoinCommunity(community.id)}
            >
              Join
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityCard;
