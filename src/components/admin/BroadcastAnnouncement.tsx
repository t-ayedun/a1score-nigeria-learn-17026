import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MessageSquare, Users, Send, ArrowLeft, Bell, Mail, Smartphone, Eye, Calendar } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface BroadcastAnnouncementProps {
  onBack: () => void;
  institutionType: 'secondary' | 'university';
}

const BroadcastAnnouncement = ({ onBack, institutionType }: BroadcastAnnouncementProps) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("normal");
  const [targetAudience, setTargetAudience] = useState("all");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState<string[]>(["app"]);
  const [scheduleNow, setScheduleNow] = useState(true);
  const [scheduleDate, setScheduleDate] = useState("");
  const [requireAcknowledgment, setRequireAcknowledgment] = useState(false);

  const audienceGroups = institutionType === 'university' ? [
    'All Students', 'First Year', 'Second Year', 'Third Year', 'Final Year',
    'Computer Science', 'Engineering', 'Medicine', 'Business', 'Sciences',
    'All Faculty', 'Teaching Staff', 'Administrative Staff', 'Parents/Guardians'
  ] : [
    'All Students', 'JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3',
    'Science Students', 'Arts Students', 'Commercial Students',
    'All Teachers', 'Form Teachers', 'Subject Teachers', 'Administrative Staff', 'Parents/Guardians'
  ];

  const handleGroupToggle = (group: string) => {
    setSelectedGroups(prev => 
      prev.includes(group) 
        ? prev.filter(g => g !== group)
        : [...prev, group]
    );
  };

  const handleDeliveryMethodToggle = (method: string) => {
    setDeliveryMethod(prev => 
      prev.includes(method) 
        ? prev.filter(m => m !== method)
        : [...prev, method]
    );
  };

  const estimateReach = () => {
    if (targetAudience === 'all') return institutionType === 'university' ? '2,847' : '1,247';
    if (selectedGroups.length === 0) return '0';
    
    // Rough estimates based on group types
    let total = 0;
    selectedGroups.forEach(group => {
      if (group.includes('All Students')) total += institutionType === 'university' ? 2000 : 800;
      else if (group.includes('Year') || group.includes('SS') || group.includes('JSS')) total += institutionType === 'university' ? 400 : 120;
      else if (group.includes('Faculty') || group.includes('Teachers')) total += 45;
      else if (group.includes('Parents')) total += institutionType === 'university' ? 1800 : 600;
      else total += institutionType === 'university' ? 300 : 100;
    });
    
    return total.toString();
  };

  const handleSendAnnouncement = () => {
    console.log("Sending announcement:", {
      title,
      message,
      priority,
      targetAudience,
      selectedGroups,
      deliveryMethod,
      scheduleNow,
      scheduleDate,
      requireAcknowledgment
    });
    
    alert("Announcement sent successfully!");
    onBack();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold">Broadcast Announcement</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Message Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Message Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Announcement Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter announcement title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your announcement message here..."
                rows={6}
              />
              <div className="text-sm text-muted-foreground text-right">
                {message.length}/1000 characters
              </div>
            </div>

            <div className="space-y-2">
              <Label>Priority Level</Label>
              <RadioGroup value={priority} onValueChange={setPriority}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low" className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    Low Priority
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal" className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    Normal Priority
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high" className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    High Priority
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="urgent" id="urgent" />
                  <Label htmlFor="urgent" className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    Urgent
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="acknowledgment"
                checked={requireAcknowledgment}
                onCheckedChange={(checked) => setRequireAcknowledgment(checked as boolean)}
              />
              <Label htmlFor="acknowledgment">Require acknowledgment from recipients</Label>
            </div>
          </CardContent>
        </Card>

        {/* Targeting & Delivery */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Target Audience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Audience Selection</Label>
              <RadioGroup value={targetAudience} onValueChange={setTargetAudience}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all">Entire Institution</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="specific" id="specific" />
                  <Label htmlFor="specific">Specific Groups</Label>
                </div>
              </RadioGroup>
            </div>

            {targetAudience === 'specific' && (
              <div className="space-y-3">
                <Label>Select Groups</Label>
                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                  {audienceGroups.map(group => (
                    <div key={group} className="flex items-center space-x-2">
                      <Checkbox
                        id={group}
                        checked={selectedGroups.includes(group)}
                        onCheckedChange={() => handleGroupToggle(group)}
                      />
                      <Label htmlFor={group} className="text-sm">
                        {group}
                      </Label>
                    </div>
                  ))}
                </div>

                {selectedGroups.length > 0 && (
                  <div className="space-y-2">
                    <Label>Selected Groups ({selectedGroups.length})</Label>
                    <div className="flex flex-wrap gap-1">
                      {selectedGroups.map(group => (
                        <Badge key={group} variant="secondary">
                          {group}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label>Delivery Methods</Label>
              <div className="space-y-2">
                {[
                  { id: 'app', label: 'In-App Notification', icon: Bell },
                  { id: 'email', label: 'Email', icon: Mail },
                  { id: 'sms', label: 'SMS (Premium)', icon: Smartphone },
                ].map(({ id, label, icon: Icon }) => (
                  <div key={id} className="flex items-center space-x-2">
                    <Checkbox
                      id={id}
                      checked={deliveryMethod.includes(id)}
                      onCheckedChange={() => handleDeliveryMethodToggle(id)}
                    />
                    <Label htmlFor={id} className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scheduling & Preview */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Scheduling
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="schedule-now"
                checked={scheduleNow}
                onCheckedChange={setScheduleNow}
              />
              <Label htmlFor="schedule-now">Send immediately</Label>
            </div>

            {!scheduleNow && (
              <div className="space-y-2">
                <Label htmlFor="schedule-date">Schedule for later</Label>
                <Input
                  id="schedule-date"
                  type="datetime-local"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Preview & Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <p className="font-semibold text-lg">{estimateReach()}</p>
                  <p className="text-sm text-muted-foreground">Recipients</p>
                </div>
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <p className="font-semibold text-lg">{deliveryMethod.length}</p>
                  <p className="text-sm text-muted-foreground">Delivery Methods</p>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-muted/20">
                <h4 className="font-medium mb-2">{title || "Announcement Title"}</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {message || "Your announcement message will appear here..."}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant={priority === 'urgent' ? 'destructive' : priority === 'high' ? 'default' : 'secondary'}>
                    {priority}
                  </Badge>
                  {requireAcknowledgment && (
                    <Badge variant="outline">Requires Acknowledgment</Badge>
                  )}
                </div>
              </div>

              <Button 
                onClick={handleSendAnnouncement}
                disabled={!title || !message || deliveryMethod.length === 0}
                className="w-full"
              >
                <Send className="h-4 w-4 mr-2" />
                {scheduleNow ? 'Send Announcement' : 'Schedule Announcement'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BroadcastAnnouncement;