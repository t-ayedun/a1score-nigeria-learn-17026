# Sign-Up Flow Architecture

## Overview

The A1Score application uses a **unified sign-up flow system** to manage user authentication and onboarding. This system provides:

- Consistent navigation behavior across all entry points
- State persistence across page refreshes
- Centralized flow logic
- Flow visualization for debugging
- Session recovery

## Flow Steps

The sign-up flow consists of 6 main steps:

```
1. landing         →  Home page
2. select-role     →  Choose user type (student, teacher, parent, admin)
3. auth            →  Sign in / Sign up
4. onboarding      →  Tutorial walkthrough (for new users)
5. profile-setup   →  Complete user profile
6. dashboard       →  User dashboard
```

## Architecture

### Core Components

**`SignUpFlow.tsx`** - Central flow management system
- State machine for flow steps
- Navigation logic
- State persistence (localStorage)
- Auto-redirect for authenticated users

**`useSignUpFlow()`** - Hook for flow state management
```typescript
const {
  state,          // Current flow state
  goToStep,       // Navigate to specific step
  goBack,         // Go to previous step
  setUserType,    // Set user type (student, teacher, etc.)
  setOrigin,      // Track where user came from
  reset           // Reset flow to initial state
} = useSignUpFlow();
```

**`SignUpFlowProvider`** - Context provider
- Wraps entire app in App.tsx
- Provides flow state to all components
- Shows flow debugger in development mode

### Flow State

```typescript
interface FlowState {
  currentStep: FlowStep;              // Current step in flow
  userType?: UserType;                 // Selected user type
  origin?: string;                     // Entry point URL
  history: FlowStep[];                // Navigation history
}
```

State is persisted to `localStorage` as `signup-flow-state` and restored on page load.

## Usage

### Accessing Flow Context

Any component can access the flow state:

```typescript
import { useFlowContext } from '@/components/auth/SignUpFlow';

const MyComponent = () => {
  const { state, goToStep, setUserType } = useFlowContext();

  const handleNext = () => {
    setUserType('student');
    goToStep('auth');
  };

  return <div>Current step: {state.currentStep}</div>;
};
```

### Navigation Patterns

**Forward Navigation:**
```typescript
// From landing to role selection
goToStep('select-role');

// From role selection to auth
setUserType('teacher');
goToStep('auth');
```

**Backward Navigation:**
```typescript
// Go back to previous step
goBack();

// Reset to beginning
reset();
```

## Integration Points

### Entry Points

Users can start the sign-up flow from multiple places:

1. **Home page** → Click "Get Started"
2. **For Teachers page** → Click "Sign Up"
3. **For Parents page** → Click "Sign Up"
4. **For Institutions page** → Click "Sign Up"
5. **Community Section CTA** → Click "Join Community"
6. **Pricing cards** → Click "Start Free Trial"

All entry points flow through the unified system for consistent behavior.

### Exit Points

- **Completion**: User reaches dashboard
- **Skip/Cancel**: User clicks skip or close buttons
- **Logout**: User logs out during onboarding

## State Management

### Persistence

Flow state is saved to `localStorage` whenever it changes:

```javascript
localStorage.setItem('signup-flow-state', JSON.stringify(state));
```

### Restoration

On app load, flow state is restored:

```javascript
const savedState = localStorage.getItem('signup-flow-state');
const state = savedState ? JSON.parse(savedState) : getInitialState();
```

### Cleanup

State is cleared when:
- User completes onboarding
- User calls `reset()`
- User successfully reaches dashboard

## Debugging

### Development Mode

In development, a flow debugger appears in the bottom-right corner showing:
- Current step
- User type
- Origin URL
- Navigation history

Example:
```
Sign-Up Flow Debugger
Current: auth
User Type: teacher
Origin: /for-teachers
History: landing → select-role → auth
```

### Flow Progress Indicator

The `FlowProgress` component shows visual progress:

```typescript
import { FlowProgress, useFlowContext } from '@/components/auth/SignUpFlow';

const MyLayout = () => {
  const { state } = useFlowContext();
  return (
    <>
      <FlowProgress state={state} />
      {/* rest of content */}
    </>
  );
};
```

## Benefits

### For Users
✅ No lost progress on page refresh
✅ Consistent experience across all entry points
✅ Clear indication of where they are in the flow
✅ Easy to go back and change choices

### For Developers
✅ Single source of truth for flow logic
✅ Easy to add new steps or modify flow
✅ Flow state visible in development
✅ Reduced navigation bugs
✅ Better testing capabilities

## Flow Diagram

```
┌─────────────┐
│   Landing   │  User visits home page
│    Page     │
└──────┬──────┘
       │ Click "Get Started"
       ▼
┌─────────────┐
│   Select    │  Choose role: Student, Teacher, Parent, Admin
│    Role     │
└──────┬──────┘
       │ Select role
       ▼
┌─────────────┐
│    Auth     │  Sign in or sign up
│    Page     │
└──────┬──────┘
       │ Successful auth
       ▼
┌─────────────┐
│ Onboarding  │  Tutorial (can skip)
│    Flow     │
└──────┬──────┘
       │ Complete or skip
       ▼
┌─────────────┐
│  Profile    │  Complete profile (can skip)
│   Setup     │
└──────┬──────┘
       │ Complete or skip
       ▼
┌─────────────┐
│  Dashboard  │  Final destination
│             │
└─────────────┘
```

## Future Enhancements

Potential improvements:
- Analytics tracking for flow abandonment
- A/B testing different flow variations
- Personalized flows based on user type
- Flow metrics dashboard
- Automatic retry on errors
- Multi-language flow descriptions

## Related Files

- `/src/components/auth/SignUpFlow.tsx` - Core flow logic
- `/src/App.tsx` - Flow provider integration
- `/src/components/auth/AuthPage.tsx` - Authentication step
- `/src/components/auth/UserTypeSelector.tsx` - Role selection step
- `/src/components/onboarding/OnboardingFlow.tsx` - Tutorial step
- `/src/components/profile/ProfileSetup.tsx` - Profile completion step
- `/src/components/dashboard/DashboardRouter.tsx` - Dashboard routing
