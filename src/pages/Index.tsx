import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import StudentFocusedHomePage from "@/components/home/StudentFocusedHomePage";
import LanguageSwitcher from "@/components/language/LanguageSwitcher";
import DemoController from "@/components/demo/DemoController";
import PitchMetrics from "@/components/demo/PitchMetrics";
import DashboardRouter from "@/components/dashboard/DashboardRouter";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isPitchMode, setIsPitchMode] = useState(false);

  // Check for pitch mode in URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('pitch') === 'true') {
      setIsPitchMode(true);
    }
  }, []);

  // Redirect authenticated users to dashboard if they're on /dashboard route
  useEffect(() => {
    if (user && location.pathname.startsWith('/dashboard')) {
      // User is authenticated and on dashboard route - let DashboardRouter handle it
      return;
    }
  }, [user, location]);

  const handleShowAuth = (userType?: 'student' | 'teacher' | 'parent' | 'admin') => {
    if (userType) {
      navigate('/auth', { state: { userType } });
    } else {
      navigate('/select-role');
    }
  };

  const handleDemoUserSwitch = (userType: 'student' | 'teacher' | 'admin' | 'parent', name: string, metadata?: any) => {
    // Demo functionality - not used in real auth mode
    console.log('Demo user switch:', userType, name, metadata);
  };

  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated and on dashboard route, show dashboard
  if (user && location.pathname.startsWith('/dashboard')) {
    return <DashboardRouter />;
  }

  return (
    <div className="min-h-screen">
      {/* Pitch Mode Components */}
      {isPitchMode && (
        <>
          <PitchMetrics />
          <DemoController onUserSwitch={handleDemoUserSwitch} />
        </>
      )}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            {/* Logo Section */}
            <div className="flex items-center flex-shrink-0">
              <img
                src="/lovable-uploads/cd2e80a3-ae02-4d77-b4b6-84f985045e4e.png"
                alt="A1Score Logo"
                className="h-12 sm:h-14 md:h-16 w-auto object-contain flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => navigate('/')}
              />
            </div>

            {/* Language Switcher and Login Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>

              {isPitchMode && (
                <Button
                  variant="outline"
                  onClick={() => setIsPitchMode(false)}
                  className="text-xs sm:text-sm px-2 py-1.5 sm:px-3 sm:py-2 min-h-11 touch-manipulation"
                  size="sm"
                >
                  Exit Pitch
                </Button>
              )}

              {user ? (
                <Button
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="text-xs sm:text-sm px-2 py-1.5 sm:px-3 sm:py-2 min-h-11 hover:scale-105 transition-transform duration-200 touch-manipulation"
                  size="sm"
                >
                  <span className="truncate">Dashboard</span>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => handleShowAuth()}
                  className="text-xs sm:text-sm px-2 py-1.5 sm:px-3 sm:py-2 min-h-11 hover:scale-105 transition-transform duration-200 touch-manipulation"
                  size="sm"
                >
                  <span className="truncate">Get Started</span>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Language Switcher */}
          <div className="md:hidden mt-3 flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <StudentFocusedHomePage onLogin={handleShowAuth} onShowAuth={handleShowAuth} />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="/lovable-uploads/cd2e80a3-ae02-4d77-b4b6-84f985045e4e.png" 
                  alt="A1Score Logo" 
                  className="h-8 w-auto object-contain brightness-0 invert"
                />
                <span className="text-lg sm:text-xl font-bold">A1Score</span>
              </div>
              <p className="text-gray-400 text-sm sm:text-base">
                AI-powered education platform designed specifically for Nigerian students and teachers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm sm:text-base">For Students</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>AI Tutoring</li>
                <li>JAMB Practice</li>
                <li>WAEC Prep</li>
                <li>Progress Tracking</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm sm:text-base">For Teachers</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Class Analytics</li>
                <li>Content Creation</li>
                <li>Student Management</li>
                <li>Earn with Validation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm sm:text-base">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Community</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 A1Score. All rights reserved. Built for Nigerian Education.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
