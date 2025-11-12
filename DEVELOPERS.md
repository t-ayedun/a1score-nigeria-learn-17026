# A1Score Nigeria Learn - Developer Guide

## 📋 Table of Contents
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Available Scripts](#available-scripts)
- [Development Workflow](#development-workflow)
- [Component Conventions](#component-conventions)
- [Database & Backend](#database--backend)
- [Common Issues](#common-issues)
- [Best Practices](#best-practices)

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v20.11.0+ (use nvm: `nvm use`)
- **npm**: v10+ (comes with Node)
- **Git**: Latest version
- **Supabase CLI** (optional, for local backend): `npm install -g supabase`

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd a1score-nigeria-learn-17026
   ```

2. **Install Node.js (with nvm)**
   ```bash
   nvm install
   nvm use
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   - Navigate to `http://localhost:8080`

---

## 📁 Project Structure

```
a1score-nigeria-learn-17026/
├── .github/                # GitHub Actions workflows (future)
├── docs/                   # Documentation
│   └── database-schema.md  # Database design docs
├── public/                 # Static assets
│   ├── lovable-uploads/   # User-uploaded images
│   ├── favicon.ico
│   └── robots.txt
├── src/                    # Source code (main app)
│   ├── components/        # React components (139 files)
│   │   ├── admin/        # Admin dashboard components
│   │   ├── auth/         # Authentication components
│   │   ├── dashboard/    # Dashboard routing logic
│   │   ├── demo/         # Demo/pitch mode components
│   │   ├── ethics/       # Academic integrity features
│   │   ├── gamification/ # Points, badges, achievements
│   │   ├── home/         # Landing page components
│   │   │   └── sections/ # Homepage sections (Hero, Features, etc.)
│   │   ├── language/     # Language switching
│   │   ├── layout/       # Layout components (Header, Footer)
│   │   ├── monetization/ # Subscription/pricing features
│   │   ├── onboarding/   # User onboarding flow
│   │   ├── parent/       # Parent dashboard
│   │   ├── profile/      # User profile setup
│   │   ├── student/      # Student dashboard (30+ components)
│   │   ├── support/      # Help & support
│   │   ├── teacher/      # Teacher dashboard
│   │   └── ui/           # Reusable UI components (shadcn/ui)
│   ├── contexts/         # React contexts
│   │   └── EthicsContext.tsx
│   ├── data/             # Mock/sample data
│   │   └── sampleData.ts
│   ├── hooks/            # Custom React hooks
│   │   ├── useAuth.tsx
│   │   ├── useProgressTracking.tsx
│   │   └── ...
│   ├── i18n/             # Internationalization
│   │   ├── locales/      # Translation files (EN, Yoruba, Hausa, Igbo, Pidgin)
│   │   └── index.ts
│   ├── integrations/     # Third-party integrations
│   │   └── supabase/
│   │       ├── client.ts # Supabase client setup
│   │       └── types.ts  # Generated Supabase types
│   ├── lib/              # Utility functions
│   │   └── utils.ts
│   ├── pages/            # Route pages
│   │   ├── Index.tsx     # Home/landing page
│   │   ├── ForTeachers.tsx
│   │   ├── ForParents.tsx
│   │   └── ...
│   ├── types/            # TypeScript type definitions
│   │   ├── user.ts
│   │   └── academicLevel.ts
│   ├── App.tsx           # Main app component with routing
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── supabase/             # Backend configuration
│   ├── functions/        # Edge Functions (serverless)
│   │   ├── ai-tutor-chat/
│   │   ├── analyze-pdf/
│   │   ├── quiz-generator/
│   │   └── save-quiz-attempt/
│   ├── migrations/       # Database migrations (29 files)
│   └── config.toml       # Supabase project config
├── .env                  # Environment variables (not committed)
├── .env.example          # Environment template
├── .nvmrc                # Node version specification
├── package.json          # Dependencies & scripts
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite build configuration
└── README.md             # Project overview
```

---

## 🛠 Technology Stack

### Frontend
- **React** 18.3.1 - UI library
- **TypeScript** 5.5.3 - Type safety
- **Vite** 5.4.1 - Build tool & dev server
- **React Router DOM** 6.26.2 - Client-side routing
- **Tailwind CSS** 3.4.11 - Utility-first CSS
- **shadcn/ui** - Accessible component library (Radix UI)
- **Framer Motion** 12.23.12 - Animations
- **Lucide React** 0.462.0 - Icon library

### State Management
- **React Query** (@tanstack/react-query) 5.56.2 - Server state
- **React Hook Form** 7.53.0 - Form management
- **Zod** 3.23.8 - Schema validation

### Backend
- **Supabase** 2.80.0 - Backend as a Service
  - PostgreSQL database
  - Authentication
  - Row Level Security (RLS)
  - Edge Functions (Deno runtime)
  - Real-time subscriptions

### AI Integration
- **OpenAI API** (GPT-4o-mini) - AI tutoring
- Integrated via Supabase Edge Functions

### Internationalization
- **i18next** 25.3.1
- **react-i18next** 15.6.0
- Support for: English, Yoruba, Hausa, Igbo, Nigerian Pidgin

### Development Tools
- **ESLint** 9.9.0 - Code linting
- **PostCSS** 8.4.47 - CSS processing
- **Lovable Tagger** - Visual development platform integration

---

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:8080)
npm run build            # Production build
npm run build:dev        # Development mode build
npm run preview          # Preview production build locally
npm run lint             # Run ESLint

# Future scripts (to be added)
npm test                 # Run tests (Vitest)
npm run format           # Format code (Prettier)
npm run type-check       # TypeScript type checking
```

---

## 💻 Development Workflow

### Branching Strategy
- `main` - Production-ready code
- `claude/[feature-name]-[session-id]` - Feature branches (AI sessions)
- `feature/[feature-name]` - Human developer features
- `fix/[bug-name]` - Bug fixes

### Commit Messages
Follow conventional commits:
```
feat: Add mobile responsive navigation
fix: Resolve auth redirect loop
docs: Update developer setup guide
style: Format code with Prettier
refactor: Simplify StudentDashboard component
perf: Optimize image loading
test: Add unit tests for useAuth hook
```

### Pull Request Process
1. Create feature branch from `main`
2. Make changes and commit
3. Push to remote
4. Create PR with description
5. Request review
6. Merge after approval

### Code Review Checklist
- [ ] Code follows component conventions
- [ ] Mobile responsive (test on 375px, 768px, 1280px)
- [ ] TypeScript types are correct
- [ ] No console errors/warnings
- [ ] Accessible (keyboard navigation, ARIA labels)
- [ ] i18n strings added for new text
- [ ] Works with all 5 supported languages

---

## 🧩 Component Conventions

### Component Structure
```tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface MyComponentProps {
  title: string;
  onAction: () => void;
  isActive?: boolean;
}

/**
 * MyComponent - Brief description of what this component does
 * @param {MyComponentProps} props - Component props
 * @returns {JSX.Element}
 */
const MyComponent = ({ title, onAction, isActive = false }: MyComponentProps) => {
  const [state, setState] = useState(false);

  return (
    <Card className="p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
      <Button onClick={onAction}>Action</Button>
    </Card>
  );
};

export default MyComponent;
```

### Naming Conventions
- **Components**: PascalCase (e.g., `StudentDashboard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase (e.g., `UserProfile`, `AcademicLevel`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_UPLOAD_SIZE`)

### Mobile-First Responsive Design
Always use mobile-first breakpoints:
```tsx
// ✅ Good - Mobile first
<div className="text-sm sm:text-base lg:text-lg">
<div className="px-4 sm:px-6 lg:px-8">
<div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// ❌ Bad - Desktop first
<div className="lg:text-lg md:text-base text-sm">
```

### Accessibility Requirements
- All interactive elements must have ARIA labels
- Minimum touch target: 44px (use `min-h-11 min-w-11`)
- Keyboard navigation support
- Focus indicators visible
- Semantic HTML (button, nav, main, etc.)

### Import Aliases
```tsx
import { Button } from "@/components/ui/button";  // ✅ Use @ alias
import { useAuth } from "@/hooks/useAuth";        // ✅ Use @ alias
import { formatDate } from "@/lib/utils";         // ✅ Use @ alias
```

---

## 🗄 Database & Backend

### Supabase Setup

#### Local Development (Optional)
```bash
# Install Supabase CLI
npm install -g supabase

# Start local Supabase
supabase start

# Apply migrations
supabase db reset

# Generate types
supabase gen types typescript --local > src/integrations/supabase/types.ts
```

#### Cloud Setup (Default)
- Project is already connected to Supabase Cloud
- Project ID: `pvruvajhcejnggeapwqp`
- Use `.env` file for credentials

### Database Schema
See `docs/database-schema.md` for complete schema documentation.

**Key Tables:**
- `profiles` - User profile data (linked to auth.users)
- `conversation_history` - AI tutor chat history
- `quiz_attempts` - Student quiz results
- `student_analytics` - Progress tracking
- `community_posts` - Student community content
- `community_discussions` - Discussion threads

### Edge Functions
Located in `supabase/functions/`:

1. **ai-tutor-chat** - Handles AI tutoring conversations (OpenAI integration)
2. **analyze-pdf** - PDF analysis and summarization
3. **quiz-generator** - Generate quizzes from topics
4. **save-quiz-attempt** - Save quiz results to database

**Testing Edge Functions Locally:**
```bash
supabase functions serve
```

### Authentication
- Email/password authentication via Supabase Auth
- Role-based access control (student, teacher, parent, admin)
- Protected routes with `<ProtectedRoute>` wrapper
- Use `useAuth()` hook to access current user

---

## 🐛 Common Issues

### Issue: Dependencies not installing
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Build fails with TypeScript errors
```bash
# Solution: Check for type errors
npx tsc --noEmit

# Temporarily disable strict checking (not recommended)
# Edit tsconfig.json: "noImplicitAny": false
```

### Issue: Supabase client errors
```bash
# Solution: Check .env file has correct values
cat .env

# Verify Supabase connection
# Check src/integrations/supabase/client.ts
```

### Issue: Port 8080 already in use
```bash
# Solution: Change port in vite.config.ts
server: {
  port: 3000  // Use different port
}
```

### Issue: Hot reload not working
```bash
# Solution: Restart dev server
npm run dev
```

### Issue: Images not loading
```bash
# Solution: Check images are in public/ directory
# Images in public/ are served at root
# Example: /lovable-uploads/logo.png
```

---

## ✅ Best Practices

### Performance
- Use `React.lazy()` for code splitting on large components
- Add `loading="lazy"` to images below the fold
- Optimize images (compress, use WebP)
- Minimize bundle size (current: 1.8MB - needs optimization)
- Use React Query for efficient data fetching

### Security
- Never commit `.env` file
- API keys stay server-side (Edge Functions)
- Validate all user inputs with Zod
- Use Supabase RLS policies for data access
- Sanitize user-generated content

### Code Quality
- Keep components under 300 lines (split if larger)
- Extract reusable logic into custom hooks
- Use TypeScript types (no `any`)
- Write meaningful variable names
- Comment complex logic
- Keep functions pure when possible

### Testing (To be implemented)
- Unit tests for utilities and hooks
- Component tests for UI components
- Integration tests for user flows
- E2E tests for critical paths

### Internationalization
```tsx
// Use translation hook
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();

  return <h1>{t('hero.main.title')}</h1>;
};
```

### State Management
- Server state: React Query
- Local UI state: useState
- Complex local state: useReducer
- Global app state: React Context (sparingly)

---

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

---

## 🤝 Getting Help

- Check this guide first
- Search existing issues on GitHub
- Ask in team Slack/Discord
- Create detailed bug reports with:
  - Steps to reproduce
  - Expected vs actual behavior
  - Screenshots/videos
  - Browser/device info
  - Console errors

---

## 📝 Notes for New Developers

### What makes this project unique:
1. **Nigerian-focused**: Built specifically for Nigerian education (WAEC, JAMB, NECO)
2. **Multilingual**: 5 Nigerian languages supported
3. **Academic levels**: Serves JSS through PhD students in one platform
4. **AI-powered**: OpenAI integration for personalized tutoring
5. **Role-based**: Separate dashboards for students, teachers, parents, admins
6. **Lovable integration**: Visual development platform (commits auto-deploy)

### Key features to understand:
- **Feature gating** based on academic level (`src/types/academicLevel.ts`)
- **Ethics tracking** for academic integrity (`src/contexts/EthicsContext.tsx`)
- **Dashboard routing** (`src/components/dashboard/DashboardRouter.tsx`)
- **Gamification system** (points, badges, streaks)
- **Demo/pitch mode** for showcasing the platform

### Current priorities:
1. ✅ Mobile responsiveness (in progress)
2. ✅ Landing page optimization (in progress)
3. Offline PWA support
4. Expand to more African languages
5. White-label option for schools
6. Testing infrastructure

---

**Welcome to the team! 🎉**

Last updated: 2024-11-12
