/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
      },
      colors: {
        "secondaryGray-300": "#f4f7fe",
        "secondaryGray-900": "#1B2559",
        "color-brand-500": "#422AFB",
        "color-brand-600": "#3311DB",
        "color-darkgreyWhatsapp": "#111B21",
        "color-greenWhatsapp": "#25d366",
      },
    },
  },
  plugins: [],
};
