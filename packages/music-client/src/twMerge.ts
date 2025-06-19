import { extendTailwindMerge } from "tailwind-merge";

export const tw = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: [(value: string) => !Number.isNaN(Number(value))] },
      ],
    },
  },
});
