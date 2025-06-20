/** @type {import('tailwindcss').Config} */
import colors from "./tailwind/colors";
import { range } from "./tailwind/input";

const px0_200 = Array.from({ length: 201 }, (_, i) => `${i}px`);
const px0_20 = px0_200.slice(0, 21);

export default {
  content: ["./index.html", "src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: px0_200,
      borderRadius: px0_20,
      borderWidth: px0_20,
      fontSize: px0_200,
      colors,
    },
  },
  plugins: [range],
};
