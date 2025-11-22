/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Modern, okunaklı font
            },
            colors: {
                primary: '#1a1a1a', // Derin siyah (Apple/Vercel stili)
                accent: '#3b82f6',  // Eylem rengi (Mavi)
            }
        },
    },
    plugins: [],
}