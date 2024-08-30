/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#2252e7",
                hoverBg: "#71198e",
                textPrimary: "#696969",
                textSecondary: "#999",
            }
        },

    },
    plugins: [],
}

