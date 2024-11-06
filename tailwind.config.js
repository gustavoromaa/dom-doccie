const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
        colors: {
            background: 'var(--background)',
            foreground: 'var(--foreground)',
            neutral: {
                0: 'var(--color-neutral-0)',
                10: 'var(--color-neutral-10)',
                30: 'var(--color-neutral-30)',
                40: 'var(--color-neutral-40)',
            },
            rosa: {
                claro: 'var(--rosa-claro)',
                forte: 'var(--rosa-forte)',
                escuro: 'var(--rosa-escuro)',
            },
            amarelo: {
                fraco: 'var(--amarelo-fraco)',
            },
            azul: {
                DEFAULT: 'var(--azul)',
                claro: 'var(--azul-claro)',
            },
            ciano: 'var(--ciano)',
            marrom: 'var(--marrom)',
            verde: 'var(--verde)',
            hover: 'var(--hover)',
        },
    },
},
  darkMode: "class",
  plugins: [nextui()],
};
