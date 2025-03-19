/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			screens: {
				'xs': '300px',
				'sm': '640px', // Small devices (like mobile phones)
				'md': '768px', // Tablets
				'lg': '1024px', // Desktops and small screens
				'xl': '1280px', // Larger desktops and screens
			},
			fontFamily: {
				sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif'],
				rubik: ['Rubik', 'sans-serif'],
			},
		},
	},
	plugins: [require('daisyui')],
	darkMode: 'light',
	// daisyUI config (optional - here are the default values)
	daisyui: {
		themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
		darkTheme: 'light', // name of one of the included themes for dark mode
		base: false, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
		themeRoot: ':root', // The element that receives theme color CSS variables
	},
};
