/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  "./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
		  colors: {
			background: '#ffffff',
			foreground: '#000000', // Agregamos el color foreground
		  },
		  borderColor: {
			'border': '#d1d5db',
		},
		animation: {
		  shimmer: 'shimmer 3s infinite',
		  twinkle: 'twinkle 3s infinite',
		  float: 'float 6s ease-in-out infinite',
		  glow: 'glow 2s ease-in-out infinite',
		},
		keyframes: {
		  shimmer: {
			'0%': { transform: 'translateX(-100%)' },
			'100%': { transform: 'translateX(100%)' },
		  },
		  twinkle: {
			'0%, 100%': { 
			  opacity: '0.1',
			  transform: 'scale(0.8) rotate(0deg)',
			},
			'50%': { 
			  opacity: '0.5',
			  transform: 'scale(1.2) rotate(180deg)',
			},
		  },
		  float: {
			'0%, 100%': { transform: 'translateY(0) translateX(0)' },
			'25%': { transform: 'translateY(-10px) translateX(5px)' },
			'50%': { transform: 'translateY(0) translateX(10px)' },
			'75%': { transform: 'translateY(10px) translateX(5px)' },
		  },
		  glow: {
			'0%, 100%': {
			  boxShadow: '0 0 5px rgba(139, 92, 246, 0.5), 0 0 25px rgba(139, 92, 246, 0.2)',
			},
			'50%': {
			  boxShadow: '0 0 20px rgba(139, 92, 246, 0.5), 0 0 50px rgba(139, 92, 246, 0.2)',
			},
		  },
		},
	  },
	},
	plugins: [
		require('@tailwindcss/forms'),
	],
}