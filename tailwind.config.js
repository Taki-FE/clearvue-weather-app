module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts.jsx.tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2AC4CF",
        secondary: "#63C7D9",
        secondaryLight: "#A7E0EB",
        secondaryLighter: "#E3F4F7",
        background: "#F5F5F5",
        text: "#333333",
        accent: "#FF6B4A",
        accentLight: "#FF9D87",
        accentLighter: "#FFE1DB",
        successColor: "#4FE310"
      }
    },
    fontFamily: {
      Lexend: ["Lexend, sans-serif"]
    },
    screens: {
      sm: "640px",
      md: "1065px",
    }
  },
  plugins: [],
}

