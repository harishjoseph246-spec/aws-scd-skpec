/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0518",
        panel: "#130825",
        panelBorder: "#241a35",
        violet: {
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
        },
        accent: "#9333ea",
      },
      fontFamily: {
        display: ["Poppins", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow:   "0 0 40px rgba(147,51,234,0.40)",
        glowSm: "0 0 20px rgba(147,51,234,0.28)",
        glowLg: "0 0 70px rgba(147,51,234,0.45), 0 0 120px rgba(147,51,234,0.2)",
      },
      animation: {
        float:   "float 6s ease-in-out infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        pulse2:  "pulse2 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-12px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: 0.2 },
          "50%":       { opacity: 1 },
        },
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-33.333%)" },
        },
        pulse2: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(147,51,234,0.3)" },
          "50%":       { boxShadow: "0 0 45px rgba(147,51,234,0.65)" },
        },
      },
    },
  },
  plugins: [],
}
