
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Users, Building2, Heart } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType: 'student' | 'teacher' | 'admin' | 'parent';
  onLogin: (userType: 'student' | 'teacher' | 'admin' | 'parent', name: string, metadata?: any) => void;
}

const AuthModal = ({ isOpen, onClose, userType, onLogin }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    class: '',
    subject: '',
    school: '',
    institution: ''
  });

  const getUserTypeConfig = () => {
    switch (userType) {
      case 'student':
        return { 
          icon: BookOpen, 
          title: 'Student', 
          defaultName: 'Adebayo Olamide',
          placeholder: 'student@example.com'
        };
      case 'teacher':
        return { 
          icon: Users, 
          title: 'Teacher', 
          defaultName: 'Mrs. Fatima Ahmed',
          placeholder: 'teacher@school.edu.ng'
        };
      case 'admin':
        return { 
          icon: Building2, 
          title: 'Institution Admin', 
          defaultName: 'Dr. Adebayo Johnson',
          placeholder: 'admin@institution.edu.ng'
        };
      case 'parent':
        return { 
          icon: Heart, 
          title: 'Parent', 
          defaultName: 'Mrs. Kemi Adebayo',
          placeholder: 'parent@example.com'
        };
      default:
        return { 
          icon: BookOpen, 
          title: 'Student', 
          defaultName: 'Adebayo Olamide',
          placeholder: 'student@example.com'
        };
    }
  };

  const config = getUserTypeConfig();
  const Icon = config.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name || config.defaultName;
    const metadata = userType === 'student' ? { level: formData.class } : {};
    onLogin(userType, name, metadata);
    setFormData({
      name: '',
      email: '',
      password: '',
      class: '',
      subject: '',
      school: '',
      institution: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-2">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Icon className="h-5 w-5 flex-shrink-0" />
            <span className="truncate">{config.title} Access</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login" className="text-sm">Login</TabsTrigger>
            <TabsTrigger value="register" className="text-sm">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={config.placeholder}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="text-sm"
                />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-sm py-2">
                Login as {config.title}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="space-y-4 mt-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm">Full Name</Label>
                <Input
                  id="name"
                  placeholder={config.defaultName}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email" className="text-sm">Email</Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="text-sm"
                />
              </div>
              
              {/* User-specific fields */}
              {userType === 'student' && (
                <div className="space-y-2">
                  <Label htmlFor="class" className="text-sm">Academic Level</Label>
                  <Select value={formData.class} onValueChange={(value) => handleInputChange('class', value)}>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Select your academic level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jss1">JSS1</SelectItem>
                      <SelectItem value="jss2">JSS2</SelectItem>
                      <SelectItem value="jss3">JSS3</SelectItem>
                      <SelectItem value="ss1">SS1</SelectItem>
                      <SelectItem value="ss2">SS2</SelectItem>
                      <SelectItem value="ss3">SS3</SelectItem>
                      <SelectItem value="undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="postgraduate-taught">Postgraduate (Taught)</SelectItem>
                      <SelectItem value="postgraduate-research">Postgraduate (Research)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {userType === 'teacher' && (
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm">Teaching Subject</Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Select your subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="english">English Language</SelectItem>
                      <SelectItem value="economics">Economics</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {userType === 'admin' && (
                <div className="space-y-2">
                  <Label htmlFor="institution" className="text-sm">Institution Name</Label>
                  <Input
                    id="institution"
                    placeholder="Lagos State University"
                    value={formData.institution}
                    onChange={(e) => handleInputChange('institution', e.target.value)}
                    className="text-sm"
                  />
                </div>
              )}
              
              {userType === 'parent' && (
                <div className="space-y-2">
                  <Label htmlFor="school" className="text-sm">Child's School</Label>
                  <Input
                    id="school"
                    placeholder="Child's current school"
                    value={formData.school}
                    onChange={(e) => handleInputChange('school', e.target.value)}
                    className="text-sm"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="text-sm"
                />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-sm py-2">
                Register as {config.title}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-center text-xs text-gray-500 mt-4 px-2">
          Demo Mode: Click any button to explore the platform
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
