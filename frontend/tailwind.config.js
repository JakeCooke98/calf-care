/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#F8FAFC',
        'foreground': '#1E293B',
        'primary': '#3B82F6',
        'primary-foreground': '#FFFFFF',
        'secondary': '#F1F5F9',
        'secondary-foreground': '#475569',
        'accent': '#0EA5E9',
        'muted': '#E2E8F0',
        'muted-foreground': '#64748B',
        'card': '#FFFFFF',
        'card-foreground': '#1E293B',
        'border': '#E2E8F0',
      },
    },
  },
  plugins: [],
}