/**
 * ============================================================
 * 🎨 DESIGN SYSTEM REFERENCE (LIGHT + DARK MODE)
 * Palette: Prussian Blue · Orange · Alabaster · Black · White
 * ============================================================
 *
 * 🌞 LIGHT MODE
 *
 * App Background:
 *   bg-alabaster-900   (#fafafa)
 *
 * Cards / Surfaces:
 *   bg-white
 *
 * Primary Text (Headings, important content):
 *   text-prussian-500
 *
 * Secondary Text (Paragraphs, labels):
 *   text-black-700
 *
 * Muted / Helper Text:
 *   text-black-600
 *
 * Primary Button (Main CTA):
 *   bg-orange-500
 *   text-black-100
 *   hover:bg-orange-600
 *
 * Secondary Button:
 *   bg-prussian-500
 *   text-white
 *   hover:bg-prussian-600
 *
 * Borders / Dividers:
 *   border-alabaster-300
 *
 * Navbar / Header:
 *   bg-white
 *   text-prussian-500
 *   border-b border-alabaster-300
 *
 * ------------------------------------------------------------
 *
 * 🌚 DARK MODE
 *
 * App Background:
 *   dark:bg-prussian-100   (#04070c)
 *
 * Cards / Surfaces:
 *   dark:bg-prussian-300
 *
 * Primary Text:
 *   dark:text-alabaster-900
 *
 * Secondary Text:
 *   dark:text-alabaster-700
 *
 * Muted / Helper Text:
 *   dark:text-alabaster-600
 *
 * Primary Button (Same as light mode):
 *   bg-orange-500
 *   text-black-100
 *   hover:bg-orange-600
 *
 * Secondary Button:
 *   dark:bg-prussian-600
 *   text-white
 *   hover:bg-prussian-700
 *
 * Borders / Dividers:
 *   dark:border-prussian-400
 *
 * Navbar / Header:
 *   dark:bg-prussian-200
 *   dark:text-alabaster-900
 *   dark:border-prussian-400
 *
 * ============================================================
 * GOLDEN RULES:
 * 1. Orange is ONLY for actions (buttons, highlights)
 * 2. Prussian = brand, structure, navigation
 * 3. Alabaster = backgrounds & readable text
 * 4. Same CTA color in light & dark mode
 * 5. Never invent new colors — reuse shades
 * ============================================================
 */

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#000000",
          100: "#000000",
          200: "#000000",
          300: "#000000",
          400: "#000000",
          500: "#000000",
          600: "#333333",
          700: "#666666",
          800: "#999999",
          900: "#cccccc",
        },

        prussian: {
          DEFAULT: "#14213d",
          100: "#04070c",
          200: "#080d19",
          300: "#0c1425",
          400: "#101b31",
          500: "#14213d",
          600: "#29447e",
          700: "#3e67bf",
          800: "#7e99d5",
          900: "#beccea",
        },

        orange: {
          DEFAULT: "#fca311",
          100: "#362101",
          200: "#6b4201",
          300: "#a16402",
          400: "#d68502",
          500: "#fca311",
          600: "#fdb541",
          700: "#fec871",
          800: "#fedaa0",
          900: "#ffedd0",
        },

        alabaster: {
          DEFAULT: "#e5e5e5",
          100: "#2e2e2e",
          200: "#5c5c5c",
          300: "#8a8a8a",
          400: "#b8b8b8",
          500: "#e5e5e5",
          600: "#ebebeb",
          700: "#f0f0f0",
          800: "#f5f5f5",
          900: "#fafafa",
        },

        white: {
          DEFAULT: "#ffffff",
          100: "#333333",
          200: "#666666",
          300: "#999999",
          400: "#cccccc",
          500: "#ffffff",
        },
        primary: "#14213d",
        accent: "#fca311",
        surface: "#ffffff",
      },
    },
  },
  plugins: [],
};

export default config;
