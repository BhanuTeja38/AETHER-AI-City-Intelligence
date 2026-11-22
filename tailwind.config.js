/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060913',
          900: '#090D1A',
          850: '#0D1326',
          800: '#111A33',
          750: '#162244',
          700: '#1C2B54',
          600: '#263B73',
        },
        cyber: {
          blue: '#00D8FF',
          cyan: '#00F0FF',
          neon: '#38BDF8',
          teal: '#14B8A6',
          amber: '#F59E0B',
          rose: '#F43F5E',
          red: '#EF4444',
          emerald: '#10B981',
          purple: '#A855F7',
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -3px rgba(0, 240, 255, 0.35)',
        'glow-blue': '0 0 20px -3px rgba(56, 189, 248, 0.35)',
        'glow-amber': '0 0 20px -3px rgba(245, 158, 11, 0.35)',
        'glow-red': '0 0 20px -3px rgba(239, 68, 68, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-sweep': 'radar 4s linear infinite',
        'scan': 'scan 2s ease-in-out infinite',
      },
      keyframes: {
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        scan: {
          '0%, 100%': { transform: 'translateY(0%)', opacity: '0.8' },
          '50%': { transform: 'translateY(100%)', opacity: '0.2' },
        }
      }
    },
  },
  plugins: [],
}
