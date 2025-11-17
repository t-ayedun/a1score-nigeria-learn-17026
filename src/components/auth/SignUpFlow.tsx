import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

// Flow steps
type FlowStep =
  | 'landing'           // Home page
  | 'select-role'       // Choose user type
  | 'auth'              // Sign in/sign up
  | 'onboarding'        // Tutorial (after successful auth)
  | 'profile-setup'     // Profile completion
  | 'dashboard';        // Final destination

// Flow state
interface FlowState {
  currentStep: FlowStep;
  userType?: 'student' | 'teacher' | 'parent' | 'admin';
  origin?: string;      // Where the user came from
  history: FlowStep[];  // Navigation history
}

interface SignUpFlowContextValue {
  state: FlowState;
  goToStep: (step: FlowStep) => void;
  goBack: () => void;
  setUserType: (type: 'student' | 'teacher' | 'parent' | 'admin') => void;
  setOrigin: (origin: string) => void;
  reset: () => void;
}

// Flow manager hook
export const useSignUpFlow = (): SignUpFlowContextValue => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  // Initialize state from URL or localStorage
  const getInitialState = (): FlowState => {
    const savedState = localStorage.getItem('signup-flow-state');
    if (savedState) {
      try {
        return JSON.parse(savedState);
      } catch {
        // If parsing fails, return default
      }
    }

    // Determine current step from URL
    const path = window.location.pathname;
    let currentStep: FlowStep = 'landing';

    if (path === '/select-role') currentStep = 'select-role';
    else if (path === '/auth') currentStep = 'auth';
    else if (path.startsWith('/dashboard')) currentStep = 'dashboard';
    else currentStep = 'landing';

    // Get user type from URL params
    const userType = searchParams.get('type') as FlowState['userType'];

    return {
      currentStep,
      userType,
      history: [currentStep],
      origin: document.referrer || '/'
    };
  };

  const [state, setState] = useState<FlowState>(getInitialState);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('signup-flow-state', JSON.stringify(state));
  }, [state]);

  // Navigate to a specific step
  const goToStep = (step: FlowStep) => {
    setState(prev => ({
      ...prev,
      currentStep: step,
      history: [...prev.history, step]
    }));

    // Update URL
    switch (step) {
      case 'landing':
        navigate('/');
        break;
      case 'select-role':
        navigate('/select-role');
        break;
      case 'auth':
        const params = state.userType ? `?type=${state.userType}` : '';
        navigate(`/auth${params}`);
        break;
      case 'dashboard':
        navigate('/dashboard');
        break;
    }
  };

  // Go back to previous step
  const goBack = () => {
    if (state.history.length > 1) {
      const newHistory = [...state.history];
      newHistory.pop(); // Remove current
      const previousStep = newHistory[newHistory.length - 1];

      setState(prev => ({
        ...prev,
        currentStep: previousStep,
        history: newHistory
      }));

      goToStep(previousStep);
    } else {
      // Default back to landing
      goToStep('landing');
    }
  };

  // Set user type
  const setUserType = (type: FlowState['userType']) => {
    setState(prev => ({ ...prev, userType: type }));
  };

  // Set origin
  const setOrigin = (origin: string) => {
    setState(prev => ({ ...prev, origin }));
  };

  // Reset flow
  const reset = () => {
    localStorage.removeItem('signup-flow-state');
    setState({
      currentStep: 'landing',
      history: ['landing'],
      origin: '/'
    });
  };

  // Auto-redirect authenticated users
  useEffect(() => {
    if (user && state.currentStep !== 'dashboard') {
      // User is authenticated but not on dashboard
      // Check if they should see onboarding or profile setup
      const hasCompletedOnboarding = localStorage.getItem(`onboarding-${user.id}`);

      if (!hasCompletedOnboarding) {
        setState(prev => ({ ...prev, currentStep: 'onboarding' }));
      } else {
        goToStep('dashboard');
      }
    }
  }, [user, state.currentStep]);

  return {
    state,
    goToStep,
    goBack,
    setUserType,
    setOrigin,
    reset
  };
};

// Flow visualization helper (for debugging)
export const FlowDebugger = ({ state }: { state: FlowState }) => {
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs font-mono z-[9999]">
      <div className="font-bold mb-2">Sign-Up Flow Debugger</div>
      <div>Current: {state.currentStep}</div>
      <div>User Type: {state.userType || 'none'}</div>
      <div>Origin: {state.origin}</div>
      <div>History: {state.history.join(' → ')}</div>
    </div>
  );
};

// Flow progress indicator
export const FlowProgress = ({ state }: { state: FlowState }) => {
  const steps: FlowStep[] = ['select-role', 'auth', 'onboarding', 'profile-setup', 'dashboard'];
  const currentIndex = steps.indexOf(state.currentStep);

  if (currentIndex === -1) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-full px-6 py-2 z-30">
      <div className="flex items-center gap-2">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
              ${index <= currentIndex ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}
            `}>
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className={`
                w-12 h-1 mx-1
                ${index < currentIndex ? 'bg-green-600' : 'bg-gray-200'}
              `} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Create context
const SignUpFlowContext = createContext<SignUpFlowContextValue | null>(null);

// Provider component
export const SignUpFlowProvider = ({ children }: { children: ReactNode }) => {
  const flowValue = useSignUpFlow();

  return (
    <SignUpFlowContext.Provider value={flowValue}>
      {children}
      {/* Show flow debugger in development */}
      {process.env.NODE_ENV === 'development' && (
        <FlowDebugger state={flowValue.state} />
      )}
    </SignUpFlowContext.Provider>
  );
};

// Hook to use flow context
export const useFlowContext = () => {
  const context = useContext(SignUpFlowContext);
  if (!context) {
    throw new Error('useFlowContext must be used within SignUpFlowProvider');
  }
  return context;
};

export default useSignUpFlow;
