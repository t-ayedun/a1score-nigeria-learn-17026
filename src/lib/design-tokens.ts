/**
 * Design Tokens - Mobile-First Responsive Design System
 *
 * This file contains standardized design tokens for consistent
 * mobile-responsive implementation across the application.
 */

export const BREAKPOINTS = {
  sm: '640px',   // Small devices (landscape phones, 640px and up)
  md: '768px',   // Medium devices (tablets, 768px and up)
  lg: '1024px',  // Large devices (desktops, 1024px and up)
  xl: '1280px',  // Extra large devices (large desktops, 1280px and up)
  '2xl': '1536px' // 2X Extra large devices
} as const;

/**
 * Spacing Scale - Section and Container Padding
 * Use these for consistent spacing across all sections
 */
export const SPACING = {
  section: {
    mobile: 'py-12',
    tablet: 'sm:py-16',
    desktop: 'lg:py-20',
    // Combined: 'py-12 sm:py-16 lg:py-20'
  },
  container: {
    mobile: 'px-4',
    tablet: 'sm:px-6',
    desktop: 'lg:px-8',
    // Combined: 'px-4 sm:px-6 lg:px-8'
  },
  element: {
    small: 'space-y-4 sm:space-y-6',
    medium: 'space-y-6 sm:space-y-8',
    large: 'space-y-8 sm:space-y-12',
  },
  grid: {
    small: 'gap-3 sm:gap-4 lg:gap-6',
    medium: 'gap-4 sm:gap-6 lg:gap-8',
    large: 'gap-6 sm:gap-8 lg:gap-10',
  }
} as const;

/**
 * Typography Scale - Responsive Text Sizes
 * Use these for consistent text sizing across breakpoints
 */
export const TYPOGRAPHY = {
  h1: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
  h2: 'text-2xl sm:text-3xl lg:text-4xl',
  h3: 'text-xl sm:text-2xl lg:text-3xl',
  h4: 'text-lg sm:text-xl lg:text-2xl',
  h5: 'text-base sm:text-lg lg:text-xl',
  body: 'text-sm sm:text-base',
  bodyLarge: 'text-base sm:text-lg',
  small: 'text-xs sm:text-sm',
  tiny: 'text-xs',
} as const;

/**
 * Font Weights
 */
export const FONT_WEIGHT = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
} as const;

/**
 * Icon Sizes - Responsive Icon Dimensions
 */
export const ICON_SIZE = {
  tiny: 'h-3 w-3 sm:h-4 sm:w-4',
  small: 'h-4 w-4 sm:h-5 sm:w-5',
  medium: 'h-6 w-6 sm:h-8 sm:w-8',
  large: 'h-8 w-8 sm:h-10 sm:w-10',
  xlarge: 'h-10 w-10 sm:h-12 sm:w-12',
  hero: 'h-12 w-12 sm:h-16 sm:h-16',
} as const;

/**
 * Button Sizes - Responsive Button Padding and Text
 */
export const BUTTON = {
  size: {
    small: 'px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm',
    medium: 'px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base',
    large: 'px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg',
  },
  width: {
    full: 'w-full',
    auto: 'w-full sm:w-auto',
    fixed: 'w-auto',
  },
  touchTarget: 'min-h-11 min-w-11', // 44px minimum for accessibility
} as const;

/**
 * Card Padding - Responsive Card/Container Padding
 */
export const CARD = {
  padding: {
    small: 'p-3 sm:p-4',
    medium: 'p-4 sm:p-6',
    large: 'p-6 sm:p-8',
    xlarge: 'p-8 sm:p-10 lg:p-12',
  },
  gap: {
    small: 'space-y-2 sm:space-y-3',
    medium: 'space-y-3 sm:space-y-4',
    large: 'space-y-4 sm:space-y-6',
  }
} as const;

/**
 * Grid Layouts - Common Grid Patterns
 */
export const GRID = {
  cards2: 'grid-cols-1 md:grid-cols-2',
  cards3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  cards4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  features: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  pricing: 'grid-cols-1 md:grid-cols-3',
  stats: 'grid-cols-2 md:grid-cols-4',
  testimonials: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
} as const;

/**
 * Flex Layouts - Common Flex Patterns
 */
export const FLEX = {
  stackMobile: 'flex flex-col sm:flex-row',
  stackTablet: 'flex flex-col md:flex-row',
  center: 'flex items-center justify-center',
  between: 'flex items-center justify-between',
  gap: {
    small: 'gap-2 sm:gap-3',
    medium: 'gap-3 sm:gap-4',
    large: 'gap-4 sm:gap-6',
  }
} as const;

/**
 * Border Radius
 */
export const RADIUS = {
  small: 'rounded-sm',
  medium: 'rounded-md',
  large: 'rounded-lg',
  xlarge: 'rounded-xl',
  full: 'rounded-full',
} as const;

/**
 * Shadows
 */
export const SHADOW = {
  small: 'shadow-sm',
  medium: 'shadow-md',
  large: 'shadow-lg',
  xlarge: 'shadow-xl',
  none: 'shadow-none',
} as const;

/**
 * Z-Index Scale
 */
export const Z_INDEX = {
  base: 'z-0',
  dropdown: 'z-10',
  sticky: 'z-20',
  header: 'z-30',
  sidebar: 'z-40',
  modal: 'z-50',
  tooltip: 'z-60',
} as const;

/**
 * Transitions
 */
export const TRANSITION = {
  fast: 'transition-all duration-150',
  normal: 'transition-all duration-200',
  slow: 'transition-all duration-300',
  verySlow: 'transition-all duration-500',
} as const;

/**
 * Hover Effects - Disable on touch devices
 */
export const HOVER = {
  scale: 'hover:scale-105 active:scale-95',
  shadow: 'hover:shadow-lg',
  opacity: 'hover:opacity-90',
  // Note: Use @media (hover: hover) in CSS to disable on touch devices
} as const;

/**
 * Helper function to combine classes
 */
export const combineClasses = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Helper function to get full section spacing
 */
export const getSection Spacing = () => {
  return combineClasses(
    SPACING.section.mobile,
    SPACING.section.tablet,
    SPACING.section.desktop,
    SPACING.container.mobile,
    SPACING.container.tablet,
    SPACING.container.desktop
  );
};

/**
 * Helper function to get full grid pattern with gap
 */
export const getGridPattern = (
  pattern: keyof typeof GRID,
  gap: 'small' | 'medium' | 'large' = 'medium'
) => {
  return combineClasses('grid', GRID[pattern], SPACING.grid[gap]);
};

/**
 * Responsive Helper - Check if mobile
 * Note: This should be used with window.matchMedia for runtime checks
 */
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

export const isTablet = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

export const isDesktop = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 1024;
};
