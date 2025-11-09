import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Star, 
  MessageCircle, 
  FileText,
  Settings,
  Smartphone,
  Mail,
  Clock,
  Filter,
  Archive,
  Trash2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  parent_id: string;
  student_id: string;
  notification_type: 'achievement' | 'progress' | 'alert' | 'report' | 'message';
  title: string;
  content: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  is_read: boolean;
  channels_sent: string[];
  scheduled_for: string;
  sent_at: string;
  created_at: string;
}

interface NotificationSettings {
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
  push: boolean;
  achievement_notifications: boolean;
  progress_reports: boolean;
  teacher_messages: boolean;
  system_alerts: boolean;
  daily_summary: boolean;
  weekly_summary: boolean;
  urgent_only: boolean;
  quiet_hours_start: string;
  quiet_hours_end: string;
}

const ParentNotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>({
    email: true,
    sms: false,
    whatsapp: true,
    push: true,
    achievement_notifications: true,
    progress_reports: true,
    teacher_messages: true,
    system_alerts: true,
    daily_summary: false,
    weekly_summary: true,
    urgent_only: false,
    quiet_hours_start: '22:00',
    quiet_hours_end: '07:00'
  });
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchNotifications();
    fetchSettings();
  }, []);

  useEffect(() => {
    filterNotifications();
  }, [notifications, filter]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      
      // Fetch from database
      const { data: dbNotifications } = await supabase
        .from('parent_notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      // Add mock notifications for demonstration
      const mockNotifications: Notification[] = [
        {
          id: 'notif1',
          parent_id: 'parent1',
          student_id: 'student1',
          notification_type: 'achievement',
          title: '🎉 Amina achieved 95% in Mathematics Quiz!',
          content: 'Your daughter Amina scored an excellent 95% on her algebra quiz today. She demonstrated strong understanding of quadratic equations and problem-solving techniques.',
          priority: 'normal',
          is_read: false,
          channels_sent: ['push', 'email'],
          scheduled_for: new Date().toISOString(),
          sent_at: new Date().toISOString(),
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
        },
        {
          id: 'notif2',
          parent_id: 'parent1',
          student_id: 'student1',
          notification_type: 'message',
          title: 'New message from Mrs. Johnson (Math Teacher)',
          content: 'I wanted to let you know that Amina has been showing excellent progress in mathematics. She is consistently participating in class and her homework quality has improved significantly.',
          priority: 'normal',
          is_read: false,
          channels_sent: ['push', 'whatsapp'],
          scheduled_for: new Date().toISOString(),
          sent_at: new Date().toISOString(),
          created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() // 4 hours ago
        },
        {
          id: 'notif3',
          parent_id: 'parent1',
          student_id: 'student1',
          notification_type: 'alert',
          title: '⚠️ High AI Usage Detected',
          content: 'Amina has used AI tutoring for 4.5 hours today, which exceeds the recommended daily limit. Consider encouraging breaks and offline study time.',
          priority: 'high',
          is_read: true,
          channels_sent: ['push', 'sms'],
          scheduled_for: new Date().toISOString(),
          sent_at: new Date().toISOString(),
          created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() // 6 hours ago
        },
        {
          id: 'notif4',
          parent_id: 'parent1',
          student_id: 'student1',
          notification_type: 'report',
          title: '📊 Weekly Progress Report Available',
          content: 'Your child\'s weekly progress report is now ready. Overall performance: 87%. Strong areas: Mathematics, English. Areas for improvement: Biology.',
          priority: 'normal',
          is_read: true,
          channels_sent: ['email', 'push'],
          scheduled_for: new Date().toISOString(),
          sent_at: new Date().toISOString(),
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
        },
        {
          id: 'notif5',
          parent_id: 'parent1',
          student_id: 'student1',
          notification_type: 'progress',
          title: '📈 Learning Milestone Reached',
          content: 'Amina has completed 75% of her JSS 2 Mathematics curriculum. She\'s on track to finish ahead of schedule with current progress rate.',
          priority: 'normal',
          is_read: true,
          channels_sent: ['push'],
          scheduled_for: new Date().toISOString(),
          sent_at: new Date().toISOString(),
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
        },
        {
          id: 'notif6',
          parent_id: 'parent1',
          student_id: 'student1',
          notification_type: 'achievement',
          title: '🏆 Student of the Week!',
          content: 'Congratulations! Amina has been selected as Student of the Week for her outstanding participation in class discussions and helping fellow students.',
          priority: 'high',
          is_read: true,
          channels_sent: ['email', 'whatsapp', 'push'],
          scheduled_for: new Date().toISOString(),
          sent_at: new Date().toISOString(),
          created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
        }
      ];

      const allNotifications = [...(dbNotifications || []), ...mockNotifications] as Notification[];
      setNotifications(allNotifications);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load notifications",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      // In real app, fetch from database
      // For now, use default settings
    } catch (error) {
      console.error('Failed to fetch notification settings:', error);
    }
  };

  const filterNotifications = () => {
    let filtered = notifications;

    switch (filter) {
      case 'unread':
        filtered = notifications.filter(n => !n.is_read);
        break;
      case 'achievements':
        filtered = notifications.filter(n => n.notification_type === 'achievement');
        break;
      case 'messages':
        filtered = notifications.filter(n => n.notification_type === 'message');
        break;
      case 'alerts':
        filtered = notifications.filter(n => n.notification_type === 'alert');
        break;
      case 'reports':
        filtered = notifications.filter(n => n.notification_type === 'report');
        break;
      case 'urgent':
        filtered = notifications.filter(n => n.priority === 'urgent' || n.priority === 'high');
        break;
      default:
        filtered = notifications;
    }

    setFilteredNotifications(filtered);
  };

  const markAsRead = async (notificationId: string) => {
    try {
      // Update in database
      await supabase
        .from('parent_notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      // Update local state
      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
      );

      toast({
        title: "Notification marked as read",
        description: "Notification has been marked as read"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark notification as read",
        variant: "destructive"
      });
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadIds = notifications.filter(n => !n.is_read).map(n => n.id);
      
      if (unreadIds.length > 0) {
        await supabase
          .from('parent_notifications')
          .update({ is_read: true })
          .in('id', unreadIds);

        setNotifications(prev =>
          prev.map(n => ({ ...n, is_read: true }))
        );

        toast({
          title: "All notifications marked as read",
          description: `${unreadIds.length} notifications marked as read`
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark all notifications as read",
        variant: "destructive"
      });
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      await supabase
        .from('parent_notifications')
        .delete()
        .eq('id', notificationId);

      setNotifications(prev => prev.filter(n => n.id !== notificationId));

      toast({
        title: "Notification deleted",
        description: "Notification has been deleted"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete notification",
        variant: "destructive"
      });
    }
  };

  const updateSettings = async (newSettings: Partial<NotificationSettings>) => {
    try {
      setSettings(prev => ({ ...prev, ...newSettings }));
      
      // In real app, save to database
      toast({
        title: "Settings updated",
        description: "Your notification preferences have been saved"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive"
      });
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement': return <Star className="h-5 w-5 text-yellow-600" />;
      case 'message': return <MessageCircle className="h-5 w-5 text-blue-600" />;
      case 'alert': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'report': return <FileText className="h-5 w-5 text-green-600" />;
      case 'progress': return <CheckCircle className="h-5 w-5 text-purple-600" />;
      default: return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'default';
      case 'normal': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  if (loading) {
    return <div className="p-6">Loading notifications...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated on your child's progress and important school communications
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Badge variant="destructive" className="mr-2">
              {unreadCount} unread
            </Badge>
          )}
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Mark All Read
          </Button>
        </div>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList>
          <TabsTrigger value="notifications">All Notifications</TabsTrigger>
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          {/* Filter Tabs */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  All ({notifications.length})
                </Button>
                <Button
                  variant={filter === 'unread' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('unread')}
                >
                  Unread ({unreadCount})
                </Button>
                <Button
                  variant={filter === 'achievements' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('achievements')}
                >
                  <Star className="h-4 w-4 mr-1" />
                  Achievements
                </Button>
                <Button
                  variant={filter === 'messages' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('messages')}
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Messages
                </Button>
                <Button
                  variant={filter === 'alerts' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('alerts')}
                >
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Alerts
                </Button>
                <Button
                  variant={filter === 'reports' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('reports')}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Reports
                </Button>
                <Button
                  variant={filter === 'urgent' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('urgent')}
                >
                  Urgent
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`cursor-pointer transition-all duration-200 ${
                    !notification.is_read 
                      ? 'border-primary bg-primary/5 hover:bg-primary/10' 
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex-shrink-0">
                          {getNotificationIcon(notification.notification_type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className={`font-medium ${!notification.is_read ? 'font-semibold' : ''}`}>
                              {notification.title}
                            </h3>
                            {!notification.is_read && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">
                            {notification.content}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {getTimeAgo(notification.created_at)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Badge variant={getPriorityColor(notification.priority) as any} className="text-xs">
                                {notification.priority}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              {notification.channels_sent.includes('email') && <Mail className="h-3 w-3" />}
                              {notification.channels_sent.includes('sms') && <Smartphone className="h-3 w-3" />}
                              {notification.channels_sent.includes('whatsapp') && <MessageCircle className="h-3 w-3" />}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        {!notification.is_read && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No notifications found</h3>
                  <p className="text-muted-foreground">
                    {filter === 'all' 
                      ? "You're all caught up! No notifications to show."
                      : `No ${filter} notifications found.`
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Delivery Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Delivery Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="email"
                    checked={settings.email}
                    onCheckedChange={(checked) => updateSettings({ email: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive urgent notifications via SMS</p>
                  </div>
                  <Switch
                    id="sms"
                    checked={settings.sms}
                    onCheckedChange={(checked) => updateSettings({ sms: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via WhatsApp</p>
                  </div>
                  <Switch
                    id="whatsapp"
                    checked={settings.whatsapp}
                    onCheckedChange={(checked) => updateSettings({ whatsapp: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive instant push notifications</p>
                  </div>
                  <Switch
                    id="push"
                    checked={settings.push}
                    onCheckedChange={(checked) => updateSettings({ push: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Content Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Content Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="achievements">Achievement Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified of your child's achievements</p>
                  </div>
                  <Switch
                    id="achievements"
                    checked={settings.achievement_notifications}
                    onCheckedChange={(checked) => updateSettings({ achievement_notifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="progress">Progress Reports</Label>
                    <p className="text-sm text-muted-foreground">Weekly and monthly progress updates</p>
                  </div>
                  <Switch
                    id="progress"
                    checked={settings.progress_reports}
                    onCheckedChange={(checked) => updateSettings({ progress_reports: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="messages">Teacher Messages</Label>
                    <p className="text-sm text-muted-foreground">Direct messages from teachers</p>
                  </div>
                  <Switch
                    id="messages"
                    checked={settings.teacher_messages}
                    onCheckedChange={(checked) => updateSettings({ teacher_messages: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="alerts">System Alerts</Label>
                    <p className="text-sm text-muted-foreground">Important system and safety alerts</p>
                  </div>
                  <Switch
                    id="alerts"
                    checked={settings.system_alerts}
                    onCheckedChange={(checked) => updateSettings({ system_alerts: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Summary Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Summary Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="daily">Daily Summary</Label>
                    <p className="text-sm text-muted-foreground">Daily overview of your child's activities</p>
                  </div>
                  <Switch
                    id="daily"
                    checked={settings.daily_summary}
                    onCheckedChange={(checked) => updateSettings({ daily_summary: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly">Weekly Summary</Label>
                    <p className="text-sm text-muted-foreground">Comprehensive weekly progress report</p>
                  </div>
                  <Switch
                    id="weekly"
                    checked={settings.weekly_summary}
                    onCheckedChange={(checked) => updateSettings({ weekly_summary: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="urgent">Urgent Only Mode</Label>
                    <p className="text-sm text-muted-foreground">Only receive urgent notifications</p>
                  </div>
                  <Switch
                    id="urgent"
                    checked={settings.urgent_only}
                    onCheckedChange={(checked) => updateSettings({ urgent_only: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quiet Hours */}
            <Card>
              <CardHeader>
                <CardTitle>Quiet Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Set times when you don't want to receive non-urgent notifications
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quiet-start">Start Time</Label>
                    <input
                      id="quiet-start"
                      type="time"
                      value={settings.quiet_hours_start}
                      onChange={(e) => updateSettings({ quiet_hours_start: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quiet-end">End Time</Label>
                    <input
                      id="quiet-end"
                      type="time"
                      value={settings.quiet_hours_end}
                      onChange={(e) => updateSettings({ quiet_hours_end: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentNotificationCenter;