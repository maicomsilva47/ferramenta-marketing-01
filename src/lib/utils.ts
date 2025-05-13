
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// New utility functions to use consistent colors across the UI
export const brandColors = {
  orange: {
    light: 'text-orange-400',
    DEFAULT: 'text-orange-500',
    dark: 'text-orange-600',
  },
  black: 'text-black',
  white: 'text-white',
  green: {
    light: 'text-green-400',
    DEFAULT: 'text-green-500',
    dark: 'text-green-600',
  },
  yellow: {
    light: 'text-amber-400',
    DEFAULT: 'text-amber-500',
    dark: 'text-amber-600',
  },
  red: {
    light: 'text-red-400',
    DEFAULT: 'text-red-500',
    dark: 'text-red-600',
  },
  bgColors: {
    orange: {
      light: 'bg-orange-400',
      DEFAULT: 'bg-orange-500',
      dark: 'bg-orange-600',
    },
    green: {
      light: 'bg-green-400',
      DEFAULT: 'bg-green-500',
      dark: 'bg-green-600',
    },
    yellow: {
      light: 'bg-amber-400',
      DEFAULT: 'bg-amber-500',
      dark: 'bg-amber-600',
    },
    red: {
      light: 'bg-red-400',
      DEFAULT: 'bg-red-500',
      dark: 'bg-red-600',
    }
  }
};
