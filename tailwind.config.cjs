/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',],
    theme: {
        extend: {
            colors: {
                primary: {
                    "50": "#eff6ff",
                    "100": "#dbeafe",
                    "200": "#bfdbfe",
                    "300": "#93c5fd",
                    "400": "#60a5fa",
                    "500": "#3b82f6",
                    "600": "#2563eb",
                    "700": "#1d4ed8",
                    "800": "#1e40af",
                    "900": "#1e3a8a"
                }
            },
            rotate: {
                "45": "45deg",
                "90": "90deg",
                "135": "135deg",
                "180": "180deg",
                "225": "225deg",
                "270": "270deg",
                "315": "315deg"
            }
        }
    },
    plugins: [
        require('flowbite/plugin')
    ],
    darkMode: 'class'
};