
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { UserProfile } from '@/types/user';
import { Upload, User, Bell, Shield } from 'lucide-react';

interface ProfileSetupProps {
  user: Partial<UserProfile>;
  onComplete: (profile: Partial<UserProfile>) => void;
  step?: number;
}

const ProfileSetup = ({ user, onComplete, step = 1 }: ProfileSetupProps) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(step);
  const [profileData, setProfileData] = useState<Partial<UserProfile>>({
    ...user,
    preferences: {
      language: 'en',
      theme: 'light',
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      privacy: {
        showProfile: true,
        showProgress: true
      },
      ...user.preferences
    }
  });

  const updateProfile = (field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updatePreferences = (field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(profileData);
    }
  };

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Basic Information
        </CardTitle>
        <CardDescription>
          Set up your basic profile information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profileData.profilePicture} />
            <AvatarFallback>
              {profileData.fullName?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Photo
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={profileData.fullName || ''}
            onChange={(e) => updateProfile('fullName', e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={profileData.email || ''}
            onChange={(e) => updateProfile('email', e.target.value)}
            placeholder="your.email@example.com"
          />
        </div>

        {profileData.userType === 'student' && (
          <div className="space-y-2">
            <Label htmlFor="academicLevel">Academic Level</Label>
            <Select
              value={profileData.academicLevel}
              onValueChange={(value) => updateProfile('academicLevel', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your level" />
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
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Preferences
        </CardTitle>
        <CardDescription>
          Choose how you'd like to receive updates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label>Email Notifications</Label>
            <p className="text-sm text-gray-500">Get updates via email</p>
          </div>
          <Switch
            checked={profileData.preferences?.notifications?.email}
            onCheckedChange={(checked) => 
              updatePreferences('notifications', {
                ...profileData.preferences?.notifications,
                email: checked
              })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Push Notifications</Label>
            <p className="text-sm text-gray-500">Get browser notifications</p>
          </div>
          <Switch
            checked={profileData.preferences?.notifications?.push}
            onCheckedChange={(checked) => 
              updatePreferences('notifications', {
                ...profileData.preferences?.notifications,
                push: checked
              })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>SMS Notifications</Label>
            <p className="text-sm text-gray-500">Get text message updates</p>
          </div>
          <Switch
            checked={profileData.preferences?.notifications?.sms}
            onCheckedChange={(checked) => 
              updatePreferences('notifications', {
                ...profileData.preferences?.notifications,
                sms: checked
              })
            }
          />
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Privacy Settings
        </CardTitle>
        <CardDescription>
          Control your privacy and visibility
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label>Show Profile to Others</Label>
            <p className="text-sm text-gray-500">Allow others to see your profile</p>
          </div>
          <Switch
            checked={profileData.preferences?.privacy?.showProfile}
            onCheckedChange={(checked) => 
              updatePreferences('privacy', {
                ...profileData.preferences?.privacy,
                showProfile: checked
              })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Show Progress to Others</Label>
            <p className="text-sm text-gray-500">Share your learning progress</p>
          </div>
          <Switch
            checked={profileData.preferences?.privacy?.showProgress}
            onCheckedChange={(checked) => 
              updatePreferences('privacy', {
                ...profileData.preferences?.privacy,
                showProgress: checked
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Preferred Language</Label>
          <Select
            value={profileData.preferences?.language}
            onValueChange={(value) => updatePreferences('language', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">🇬🇧 English</SelectItem>
              <SelectItem value="pidgin">🇳🇬 Pidgin</SelectItem>
              <SelectItem value="yoruba">🇳🇬 Yorùbá</SelectItem>
              <SelectItem value="hausa">🇳🇬 Hausa</SelectItem>
              <SelectItem value="igbo">🇳🇬 Igbo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-center space-x-2 mb-6">
        {[1, 2, 3].map((stepNum) => (
          <div key={stepNum} className="flex items-center">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
              ${stepNum <= currentStep ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}
            `}>
              {stepNum}
            </div>
            {stepNum < 3 && (
              <div className={`
                w-12 h-1 mx-2
                ${stepNum < currentStep ? 'bg-green-600' : 'bg-gray-200'}
              `} />
            )}
          </div>
        ))}
      </div>

      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          {t('common.back')}
        </Button>
        <Button onClick={handleNext}>
          {currentStep === 3 ? t('common.finish') : t('common.next')}
        </Button>
      </div>
    </div>
  );
};

export default ProfileSetup;
