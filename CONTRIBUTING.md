# Contributing to A1Score Nigeria Learn

Thank you for contributing to A1Score! This document provides guidelines for contributing to the project.

## 📋 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Respect different viewpoints and experiences

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`
5. Make your changes
6. Test thoroughly
7. Commit and push
8. Create a Pull Request

See [DEVELOPERS.md](./DEVELOPERS.md) for detailed setup instructions.

## 🌿 Branch Naming Convention

Use descriptive branch names with prefixes:

- `feature/` - New features (e.g., `feature/offline-mode`)
- `fix/` - Bug fixes (e.g., `fix/login-redirect-loop`)
- `refactor/` - Code refactoring (e.g., `refactor/dashboard-structure`)
- `docs/` - Documentation updates (e.g., `docs/api-reference`)
- `test/` - Test additions/changes (e.g., `test/auth-flow`)
- `perf/` - Performance improvements (e.g., `perf/image-optimization`)
- `style/` - Code style changes (e.g., `style/format-components`)
- `chore/` - Maintenance tasks (e.g., `chore/update-dependencies`)

## ✍️ Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body (optional)>

<footer (optional)>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style/formatting (no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Test additions/changes
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Examples
```
feat(student): add offline quiz mode
fix(auth): resolve infinite redirect loop
docs(readme): update installation instructions
style(dashboard): format with Prettier
refactor(api): simplify Supabase client setup
perf(images): lazy load below-fold images
test(auth): add unit tests for useAuth hook
chore(deps): update React to 18.3.1
```

### Scope (optional but recommended)
- `student` - Student dashboard features
- `teacher` - Teacher dashboard features
- `parent` - Parent dashboard features
- `admin` - Admin dashboard features
- `auth` - Authentication system
- `landing` - Landing page
- `api` - API integration
- `ui` - UI components
- `i18n` - Internationalization
- `docs` - Documentation

## 📝 Pull Request Process

### Before Creating PR

1. **Update from main**
   ```bash
   git checkout main
   git pull origin main
   git checkout your-feature-branch
   git rebase main
   ```

2. **Test your changes**
   - Run dev server: `npm run dev`
   - Test on mobile (375px, 768px, 1280px viewports)
   - Test in multiple browsers (Chrome, Safari, Firefox)
   - Run lint: `npm run lint`
   - Check TypeScript: `npx tsc --noEmit`
   - Run tests (when available): `npm test`

3. **Check build**
   ```bash
   npm run build
   npm run preview
   ```

### PR Title Format
Use the same format as commit messages:
```
feat(student): add offline quiz mode
```

### PR Description Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## Related Issue
Closes #(issue number)

## Changes Made
- Change 1
- Change 2
- Change 3

## Screenshots (if applicable)
Before: [screenshot]
After: [screenshot]

Mobile: [screenshot]
Desktop: [screenshot]

## Testing Done
- [ ] Tested on Chrome
- [ ] Tested on Safari
- [ ] Tested on Firefox
- [ ] Tested on mobile (375px)
- [ ] Tested on tablet (768px)
- [ ] Tested on desktop (1280px+)
- [ ] Tested all 5 languages
- [ ] Tested with keyboard navigation
- [ ] No console errors/warnings

## Checklist
- [ ] Code follows project conventions
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated (if needed)
- [ ] No new warnings/errors
- [ ] Mobile responsive
- [ ] Accessible (ARIA labels, keyboard nav)
- [ ] TypeScript types correct
- [ ] i18n strings added for new text
- [ ] Build passes (`npm run build`)
```

### Review Process
1. Submit PR with detailed description
2. Request review from team member
3. Address review comments
4. Get approval from at least one reviewer
5. Squash and merge (or rebase and merge)

## 🎨 Code Style Guidelines

### TypeScript
```typescript
// ✅ Good
interface ButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}

const Button = ({ onClick, label, disabled = false }: ButtonProps) => {
  // Component logic
};

// ❌ Bad
const Button = ({ onClick, label, disabled }: any) => {
  // No types
};
```

### React Components
```tsx
// ✅ Good - Functional component with proper typing
import { useState } from "react";

interface Props {
  title: string;
}

const MyComponent = ({ title }: Props) => {
  const [count, setCount] = useState(0);

  return <div>{title}: {count}</div>;
};

export default MyComponent;

// ❌ Bad - Missing types, using var
var MyComponent = (props) => {
  var count = 0;
  return <div>{props.title}</div>;
};
```

### Mobile-First CSS
```tsx
// ✅ Good - Mobile first
<div className="text-sm sm:text-base lg:text-lg">
<div className="px-4 sm:px-6 lg:px-8">
<div className="flex-col md:flex-row">

// ❌ Bad - Desktop first
<div className="lg:text-lg md:text-base text-sm">
<div className="lg:px-8 md:px-6 px-4">
```

### File Organization
```typescript
// ✅ Good - Grouped imports
// 1. React/external libraries
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 2. UI components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// 3. Local components
import Header from "./Header";

// 4. Hooks
import { useAuth } from "@/hooks/useAuth";

// 5. Utils/types
import { formatDate } from "@/lib/utils";
import type { User } from "@/types/user";

// ❌ Bad - Random order
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
```

## 🧪 Testing Guidelines (When Implemented)

### Unit Tests
- Test individual functions and hooks
- Mock external dependencies
- Aim for 80%+ coverage

### Component Tests
- Test user interactions
- Test accessibility
- Test different props/states

### Example
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 📱 Mobile Responsiveness Requirements

Every component must be tested at these breakpoints:
- **Mobile**: 375px (iPhone SE)
- **Mobile Large**: 390px (iPhone 12/13)
- **Tablet**: 768px (iPad)
- **Desktop**: 1280px+

### Touch Targets
- Minimum size: 44px x 44px (use `min-h-11 min-w-11`)
- Adequate spacing between interactive elements (8px minimum)

### Typography Scale
```tsx
h1: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
h2: "text-2xl sm:text-3xl lg:text-4xl"
h3: "text-xl sm:text-2xl lg:text-3xl"
body: "text-sm sm:text-base"
small: "text-xs sm:text-sm"
```

## ♿ Accessibility Requirements

- Use semantic HTML (`button`, `nav`, `main`, `article`, etc.)
- Add ARIA labels to interactive elements
- Ensure keyboard navigation works
- Maintain focus indicators
- Test with screen readers
- Color contrast ratio: 4.5:1 minimum
- Alt text for all images

## 🌍 Internationalization (i18n)

### Adding New Text
1. Add translation key to all locale files:
   - `src/i18n/locales/en.json`
   - `src/i18n/locales/yoruba.json`
   - `src/i18n/locales/hausa.json`
   - `src/i18n/locales/igbo.json`
   - `src/i18n/locales/pidgin.json`

2. Use in component:
```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();

  return <h1>{t('section.key.text')}</h1>;
};
```

## 🚫 What NOT to Do

- ❌ Don't commit `.env` files
- ❌ Don't use `any` type in TypeScript
- ❌ Don't commit `console.log` statements
- ❌ Don't hardcode API keys
- ❌ Don't skip mobile testing
- ❌ Don't commit large binary files
- ❌ Don't force push to main/shared branches
- ❌ Don't merge without review
- ❌ Don't commit commented-out code (delete it)
- ❌ Don't use inline styles (use Tailwind classes)

## 📦 Dependencies

### Adding New Dependencies
1. Consider if really needed (bundle size impact)
2. Check license compatibility
3. Check maintenance status (last update, issues)
4. Add with: `npm install <package>`
5. Document usage in PR

### Updating Dependencies
```bash
# Check outdated packages
npm outdated

# Update specific package
npm update <package-name>

# Update all (use with caution)
npm update
```

## 🐛 Bug Reports

### Creating Good Bug Reports
Include:
1. **Title**: Clear, descriptive
2. **Description**: What happened vs what should happen
3. **Steps to reproduce**: Numbered list
4. **Expected behavior**: What should happen
5. **Actual behavior**: What actually happened
6. **Screenshots/videos**: If applicable
7. **Environment**:
   - Browser & version
   - Device (mobile/desktop)
   - OS & version
   - Screen size
8. **Console errors**: Copy/paste from devtools

## 💡 Feature Requests

Include:
1. **Problem statement**: What problem does this solve?
2. **Proposed solution**: How should it work?
3. **Alternatives considered**: Other approaches?
4. **Use case**: Real-world scenario
5. **Priority**: Critical/High/Medium/Low
6. **Target users**: Students/Teachers/Parents/Admins?

## 🎯 Priority Labels

- `P0-critical`: Blocking production, fix immediately
- `P1-high`: Important, fix soon (this week)
- `P2-medium`: Should fix (this sprint)
- `P3-low`: Nice to have (backlog)

## 📞 Getting Help

- Read [DEVELOPERS.md](./DEVELOPERS.md) first
- Search existing issues
- Ask in team communication channel
- Create discussion thread for questions
- Tag appropriate team members

## 🏆 Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Recognized in team meetings

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to A1Score Nigeria Learn! 🎓✨
