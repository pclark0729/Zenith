import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': '#f0f9ff',
  				'100': '#e0f2fe',
  				'200': '#bae6fd',
  				'300': '#7dd3fc',
  				'400': '#38bdf8',
  				'500': '#0ea5e9',
  				'600': '#0284c7',
  				'700': '#0369a1',
  				'800': '#075985',
  				'900': '#0c4a6e',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#fdf4ff',
  				'100': '#fae8ff',
  				'200': '#f5d0fe',
  				'300': '#f0abfc',
  				'400': '#e879f9',
  				'500': '#d946ef',
  				'600': '#c026d3',
  				'700': '#a21caf',
  				'800': '#86198f',
  				'900': '#701a75',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			background: {
  				DEFAULT: '#1C1F21',
  				foreground: '#E5E7EB'
  			},
  			foreground: {
  				DEFAULT: '#E5E7EB'
  			},
  			card: {
  				DEFAULT: '#242729',
  				foreground: '#E5E7EB'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: '#6B7280',
  				foreground: '#9CA3AF'
  			},
  			accent: {
  				DEFAULT: '#DEB887',
  				hover: '#C4A484',
  				light: '#E6C9A3',
  				dark: '#B89B76'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-geist-sans)'
  			],
  			mono: [
  				'var(--font-geist-mono)'
  			]
  		},
  		animation: {
  			'fade-in': 'fade-in 0.5s ease-out',
  			'slide-up': 'slide-up 0.5s ease-out',
  			'corner-border': 'corner-border 0.3s ease-out forwards',
  			'float': 'float 3s ease-in-out infinite',
  			'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
  		},
  		keyframes: {
  			'fade-in': {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			'slide-up': {
  				'0%': {
  					transform: 'translateY(10px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			'corner-border': {
  				'0%': { width: '0%', height: '0%', opacity: '0' },
  				'100%': { width: '100%', height: '100%', opacity: '1' }
  			},
  			'float': {
  				'0%, 100%': { transform: 'translateY(0)' },
  				'50%': { transform: 'translateY(-10px)' }
  			},
  			'pulse-glow': {
  				'0%, 100%': { 
  					opacity: '0.2',
  					transform: 'scale(1)',
  					boxShadow: '0 0 0 0 rgba(222, 184, 135, 0.2)'
  				},
  				'50%': { 
  					opacity: '0.5',
  					transform: 'scale(1.1)',
  					boxShadow: '0 0 20px 2px rgba(222, 184, 135, 0.3)'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		gridTemplateColumns: {
  			'benefits': 'repeat(auto-fit, minmax(300px, 1fr))',
  		},
  		backgroundImage: {
  			'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none' stroke='%23333' stroke-width='0.5' stroke-opacity='0.1'/%3E%3C/svg%3E\")",
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config; 