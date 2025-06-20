import plugin from "tailwindcss/plugin";

export const range = plugin(function ({ addComponents }) {
  addComponents({
    "input[type='range']": {
      "-webkit-appearance": "none",
      appearance: "none",
      width: "100%",
      height: "4px",
      background: "#636366",
      borderRadius: "2px",
      outline: "none",
      overflow: "hidden",
    },
    "input[type='range']::-webkit-slider-thumb": {
      "-webkit-appearance": "none",
      appearance: "none",
      width: "4px",
      height: "4px",
      background: "#fff",
      cursor: "pointer",
      boxShadow: "-602px 0 0 600px #fff",
      borderRadius: "50%",
    },
  });
});
