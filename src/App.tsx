import { lazy, Suspense, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { EthicsProvider } from '@/contexts/EthicsContext';
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { BackToTop } from "@/components/layout/BackToTop";
import { useAuth } from "./hooks/useAuth";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

// Lazy load page components for better code splitting
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AuthPage = lazy(() => import("./components/auth/AuthPage"));
const UserTypeSelector = lazy(() => import("./components/auth/UserTypeSelector"));
const ForTeachers = lazy(() => import("./pages/ForTeachers"));
const ForParents = lazy(() => import("./pages/ForParents"));
const ForInstitutions = lazy(() => import("./pages/ForInstitutions"));
const JoinWaitlist = lazy(() => import("./pages/JoinWaitlist"));
const StayUpdated = lazy(() => import("./pages/StayUpdated"));

// Loading component for lazy-loaded routes
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
      <p>Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (user && !showDialog) {
    // Show confirmation dialog instead of immediate redirect
    setShowDialog(true);
  }

  if (user && showDialog) {
    return (
      <>
        {children}
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Already Signed In</AlertDialogTitle>
              <AlertDialogDescription>
                You're already signed in to A1Score. Would you like to go to your dashboard or stay on this page?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowDialog(false)}>
                Stay Here
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <EthicsProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <BackToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/select-role" element={<UserTypeSelector />} />
              <Route path="/auth" element={
                <PublicRoute>
                  <AuthPage />
                </PublicRoute>
              } />
              <Route path="/" element={<Index />} />
              <Route path="/for-teachers" element={<ForTeachers />} />
              <Route path="/for-parents" element={<ForParents />} />
              <Route path="/for-institutions" element={<ForInstitutions />} />
              <Route path="/join-waitlist" element={<JoinWaitlist />} />
              <Route path="/stay-updated" element={<StayUpdated />} />
              <Route path="/dashboard/*" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/student/formula-reference" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/student/progress-tracker" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/student/study-goals" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/student/study-timer" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </EthicsProvider>
  </QueryClientProvider>
);

export default App;
