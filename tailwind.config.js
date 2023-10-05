/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./packages/@orchidui-vue/src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@orchidui/vue/dist/**/*.js",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    fontSize: {
      'xs': ['0.625rem', {
        lineHeight: '1.5rem',
        // letterSpacing: '-0.01em',
      }],
      'sm': ['0.75rem', {
        lineHeight: '1.5rem',
      }],
      'base': ['0.875rem', {
        lineHeight: '1.5rem',
      }],
      'lg': ['1rem', {
        lineHeight: '1.4rem',
      }],
      'xl': ['1.125rem', {
        lineHeight: '1.35rem',
      }],
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    spacing: {
      px: '1px',
      0: '0',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      11: '2.75rem',
      12: '3rem',
      14: '3.5rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      44: '11rem',
      48: '12rem',
      52: '13rem',
      56: '14rem',
      60: '15rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem',
    },
    borderRadius: {
      'sm': 'var(--oc-border-sm)',
      DEFAULT: 'var(--oc-border-default)',
      'lg': 'var(--oc-border-lg)',
      'full': 'var(--oc-border-full)',
    },
    extend: {
      colors: {
        "oc-primary": {
          DEFAULT: "var(--oc-primary-500)",
          "50-tr": "var(--oc-primary-50-tr)",
          50: "var(--oc-primary-50)",
          100: "var(--oc-primary-100)",
          200: "var(--oc-primary-200)",
          300: "var(--oc-primary-300)",
          400: "var(--oc-primary-400)",
          500: "var(--oc-primary-500)",
          600: "var(--oc-primary-600)",
        },
        "oc-grey": {
          DEFAULT: "var(--oc-grey-100)",
          50: "var(--oc-grey-50)",
          100: "var(--oc-grey-100)",
          200: "var(--oc-grey-200)",
          300: "var(--oc-grey-300)",
          400: "var(--oc-grey-400)",
          500: "var(--oc-grey-500)",
          600: "var(--oc-grey-600)",
          700: "var(--oc-grey-700)",
          800: "var(--oc-grey-800)",
          900: "var(--oc-grey-900)",
        },
        "oc-text": {
          DEFAULT: "var(--oc-text-500)",
          "000": "var(--oc-text-000)",
          200: "var(--oc-text-200)",
          300: "var(--oc-text-300)",
          400: "var(--oc-text-400)",
          500: "var(--oc-text-500)",
        },
        "oc-bg": {
          DEFAULT: "var(--oc-background-white)",
          blue: "var(--oc-background-blue)",
          white: "var(--oc-background-white)",
        },
        contast: {
          DEFAULT: "var(--oc-contrast-black)",
          black: "var(--oc-contrast-black)",
          white: "var(--oc-contrast-white)",
        },

        "oc-blue": {
          DEFAULT: "var(--oc-blue-500)",
          "50-tr": "var(--oc-blue-50-tr)",
          50: "var(--oc-blue-50)",
          100: "var(--oc-blue-100)",
          200: "var(--oc-blue-200)",
          300: "var(--oc-blue-300)",
          400: "var(--oc-blue-400)",
          500: "var(--oc-blue-500)",
        },

        "oc-purple": {
          DEFAULT: "var(--oc-purple-500)",
          "50-tr": "var(--oc-purple-50-tr)",
          50: "var(--oc-purple-50)",
          100: "var(--oc-purple-100)",
          200: "var(--oc-purple-200)",
          300: "var(--oc-purple-300)",
          400: "var(--oc-purple-400)",
          500: "var(--oc-purple-500)",
        },

        "oc-red": {
          DEFAULT: "var(--oc-red-500)",
          "50-tr": "var(--oc-red-50-tr)",
          50: "var(--oc-red-50)",
          100: "var(--oc-red-100)",
          200: "var(--oc-red-200)",
          300: "var(--oc-red-300)",
          400: "var(--oc-red-400)",
          500: "var(--oc-red-500)",
        },

        "oc-success": {
          DEFAULT: "var(--oc-success-500)",
          "50-tr": "var(--oc-success-50-tr)",
          50: "var(--oc-success-50)",
          100: "var(--oc-success-100)",
          200: "var(--oc-success-200)",
          300: "var(--oc-success-300)",
          400: "var(--oc-success-400)",
          500: "var(--oc-success-500)",
        },

        "oc-warning": {
          DEFAULT: "var(--oc-warning-500)",
          "50-tr": "var(--oc-warning-50-tr)",
          50: "var(--oc-warning-50)",
          100: "var(--oc-warning-100)",
          200: "var(--oc-warning-200)",
          300: "var(--oc-warning-300)",
          400: "var(--oc-warning-400)",
          500: "var(--oc-warning-500)",
        },

        "oc-error": {
          DEFAULT: "var(--oc-error-500)",
          "50-tr": "var(--oc-error-50-tr)",
          50: "var(--oc-error-50)",
          100: "var(--oc-error-100)",
          200: "var(--oc-error-200)",
          300: "var(--oc-error-300)",
          400: "var(--oc-error-400)",
          500: "var(--oc-error-500)",
        },
      }
    },
  }
};
