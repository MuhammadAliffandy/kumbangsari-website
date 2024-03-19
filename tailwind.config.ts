import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#007bff',
        'CUSTOM-RED': '#F45B69',
        'CUSTOM-DARK-BLUE' : '#52489c',
        'CUSTOM-LIGHT-BLUE': '#59c3c3',
        'CUSTOM-BLUE': '#4062bb',
        'CUSTOM-GREY': '#F7F9F9',
        'CUSTOM-GREY-LIGHT': '#6B728E',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        mono: ['Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        poppins : ['Poppins','sans-serif']
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [
    // ...
    require('tailwind-scrollbar')({ preferredStrategy: 'pseudoelements' , nocompatible: true}),
  ],
};
export default config;
