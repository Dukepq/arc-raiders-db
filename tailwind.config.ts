import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      primary: "#1D0E24",
      "primary-mild": "#302536",
      text: "#e8f7f6",
      backdrop: "#0F0912",
      "backdrop-offset": "#170E1B",
      "backdrop-darker": "#0B060E",
      background: "#222026",
      secondary: "#34225C",
      accent: "#F1AA1C",
      success: "#00FC00",
      error: "#FF0000",
      "accent-red": "#EB2737",
      "border-grey": "#27272A",
      "arc-rarity-common": "#03CC7C",
      "arc-rarity-uncommon": "#54C8E7",
      "arc-rarity-rare": "#F32734",
      "arc-rarity-scarce": "#ECA610",
      "arc-badge": "#B9B8BE",
      "arc-badge-secondary": "#302E38",
    },
    extend: {
      transitionDuration: {
        "25": "25ms",
        "35": "35ms",
        "50": "50ms",
      },
      gridTemplateColumns: {
        "1fr-3.5fr": "1fr 3.5fr",
        "auto-fit-minmax-32": "repeat(auto-fit, minmax(min(8rem, 100%), 1fr))",
        "auto-fit-minmax-60": "repeat(auto-fit, minmax(min(15rem, 100%), 1fr))",
        "auto-fit-minmax-80": "repeat(auto-fit, minmax(min(20rem, 100%), 1fr))",
        "auto-fit-minmax-100":
          "repeat(auto-fit, minmax(min(25rem, 100%), 1fr))",
      },
      spacing: {
        "128": "32rem",
        "256": "64rem",
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: "0", transform: "translateX(2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: "0", transform: "translateY(2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: "translateX(-2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        modalSlideUpAndFade: {
          from: {
            opacity: "0",
            transform: "translateY(calc(-50% + 2px)) translateX(-50%)",
          },
          to: { opacity: "1", transform: "translateY(-50%) translateX(-50%)" },
        },
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "0.5" },
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        modalSlideUpAndFade:
          "modalSlideUpAndFade 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideDownAndFade:
          "slideDownAndFade 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        fadeOut: "fadeOut 350ms forwards ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
