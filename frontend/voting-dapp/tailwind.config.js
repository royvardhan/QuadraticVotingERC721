/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Josefin: ["Josefin Sans"],
      },
    },
    minWidth: {
      "1/2": "50%",
      576: "576px",
      100: "100px",
    },
    custom: {
      customInput:
        "placeholder:font-Josefin placeholder:text-slate-400  border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm",
    },
  },
  plugins: [],
};
