import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
    plugins: [typography, daisyui],
    theme: {
        extend: {},
    },
};
