import { type Config } from 'tailwindcss';
import designTokens from './design-tokens.json';

export const theme: Config['theme'] = {
  extend: {
    colors: {
      text: designTokens.colors.text,
      background: designTokens.colors.background,
      primary: designTokens.colors.primary,
      secondary: designTokens.colors.secondary,
      accent: designTokens.colors.accent,
      neutral: designTokens.colors.neutral,
      success: designTokens.colors.success,
      warning: designTokens.colors.warning,
      error: designTokens.colors.error,
      info: designTokens.colors.info,
    },
    keyframes: {
      float: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-10px)' },
      }
    },
    animation: {
      float: 'float 6s ease-in-out infinite',
    },
    fontFamily: {
      heading: [designTokens.typography.fontFamily.heading],
      body: [designTokens.typography.fontFamily.body],
    },
    fontSize: designTokens.typography.fontSize,
    letterSpacing: designTokens.typography.letterSpacing,
    borderRadius: designTokens.borderRadius,
    boxShadow: designTokens.elevation,
    screens: designTokens.breakpoints,
    transitionDuration: designTokens.transitions.duration,
    transitionTimingFunction: designTokens.transitions.timing,
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        xs: '100%',
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
};

export default theme;