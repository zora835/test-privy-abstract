/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{jsx,ts,tsx}",
        "./components/**/*.{jsx,ts,tsx}",
        "./app/**/*.{jsx,ts,tsx}",
        "./src/**/*.{jsx,ts,tsx}",
        "../../packages/ui/src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                    foreground: "var(--secondary-foreground)",
                },
                destructive: {
                    DEFAULT: "var(--destructive)",
                    foreground: "var(--destructive-foreground)",
                },
                muted: {
                    DEFAULT: "var(--muted)",
                    foreground: "var(--muted-foreground)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                    foreground: "var(--accent-foreground)",
                },
                popover: {
                    DEFAULT: "var(--popover)",
                    foreground: "var(--popover-foreground)",
                },
                card: {
                    DEFAULT: "var(--card)",
                    foreground: "var(--card-foreground)",
                },
            },
            boxShadow: {
                "purple-glow": "0px 0px 24px 0px rgba(129, 37, 190, 0.5)",
                "yellow-glow": "0px 0px 24px 0px rgba(255, 205, 55, 0.25)",
                "gray-glow": "0px 0px 24px 0px rgba(144, 144, 144, 0.25)",
                "scarlet-glow": "0px 0px 24px 0px rgba(87, 35, 43, 0.25)",
            },
            keyframes: {
                blink: {
                    "0%, 60%, 100%": { opacity: "1" }, // Fully visible
                    "30%": { opacity: "0" }, // Invisible
                },
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "fly-up": {
                    from: {
                        transform: "translate(0, 60px)",
                    },
                    to: {
                        transform: "translate(0, 0)",
                    },
                },
                "fly-down": {
                    from: {
                        transform: "translate(0, -60px)",
                    },
                    to: {
                        transform: "translate(0, 0)",
                    },
                },
                "fly-left": {
                    from: {
                        transform: "translate(60px, 0)",
                    },
                    to: {
                        transform: "translate(0, 0)",
                    },
                },
                "fly-right": {
                    from: {
                        transform: "translate(-60px, 0)",
                    },
                    to: {
                        transform: "translate(0, 0)",
                    },
                },
                "slide-left": {
                    "0%": {
                        transform: "translate(-6px, 0)",
                    },
                    "50%": {
                        transform: "translate(0, 0)",
                    },
                    "100%": {
                        transform: "translate(-6px, 0)",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "fly-linear-up": "fly-up 0.3s linear",
                "fly-up": "fly-up 0.3s var(--ease-out-back)",
                "fly-down": "fly-down 0.3s var(--ease-out-back)",
                "fly-left": "fly-left 0.3s var(--ease-out-back)",
                "fly-right": "fly-right 0.3s var(--ease-out-back)",
                "slide-left": "slide-left 0.5s ease-in-out infinite",
                blink: "blink 1s infinite", // Define the animation name and timing
            },
            fontFamily: {
                uncut: ["UncutSans", "sans-serif"],
            },
            fontSize: {
                "3xs": ["0.5rem", "0.625rem"],
                "2xs": ["0.625rem", "0.75rem"],
            },
            spacing: {
                7.5: "1.875rem",
                11: "2.75rem",
                15: "3.75rem",
                18: "4.5rem",
            },
            transitionTimingFunction: {
                "out-back": "var(--ease-out-back)",
            },
            gridTemplateColumns: {
                auto2: "repeat(2, auto)",
                auto4: "repeat(4, auto)",
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        function ({ addVariant }) {
            addVariant("support-hover", "@media (hover: hover)")
        },
    ],
}
