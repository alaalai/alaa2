module.exports = {
    important: false,
    content: [
        "src/views/**/*.twig",
        "src/assets/js/**/*.js",
        //todo:: inject it via the plugin or easier way
        'node_modules/@salla.sa/twilight-tailwind-theme/safe-list-css.txt',
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        container: {
            center: true,
            padding: '1rem',
            screens: {
                '2xl': "1280px"
            }
        },
        fontFamily: {
            sans: [
                'var(--font-main)',
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Roboto',
                'Helvetica Neue',
                'Arial',
                'sans-serif',
            ],
            primary: "var(--font-main)"
        },
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    light: 'var(--color-primary-light)',
                    dark: 'var(--color-primary-dark)',
                },
                secondary: {
                    DEFAULT: 'var(--color-secondary)',
                    light: 'var(--color-secondary-light)',
                    dark: 'var(--color-secondary-dark)',
                },
                accent: 'var(--color-accent)',
                'text-main': 'var(--color-text-main)',
                'text-muted': 'var(--color-text-muted)',
                'bg-light': 'var(--color-bg-light)',
                success: '#10B981',
                warning: '#F59E0B',
                danger: '#EF4444',
                info: '#3B82F6',
                dark: '#1D1F1F',
                darker: '#0E0F0F',
                light: '#F3F4F6',
                gray: {
                    50: '#F9FAFB',
                    100: '#F3F4F6',
                    200: '#E5E7EB',
                    300: '#D1D5DB',
                    400: '#9CA3AF',
                    500: '#6B7280',
                    600: '#4B5563',
                    700: '#374151',
                    800: '#1F2937',
                    900: '#111827',
                }
            },
            spacing: {
                '3.75': '0.9375rem', // 15px
                '7.5': '1.875rem',  // 30px
                '18': '4.5rem',
                '22': '5.5rem',
                '58': '14.5rem',
                '62': '15.5rem',
                '74': '18.5rem',
                '76': '19rem',
                '78': '19.5rem',
                '100': '25rem',
                '116': '29rem',
                '132': '33rem',
                '200': '50rem',
            },
            borderRadius: {
                'large': '1.375rem', // 22px
                'big': '2.5rem',   // 40px
                'tiny': '0.1875rem', // 3px
                DEFAULT: '0.75rem',
            },
            fontSize: {
                'xxs': '0.625rem',
                'xs': '0.75rem',
                'sm': '0.875rem',
                'base': '1rem',
                'lg': '1.125rem',
                'xl': '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
                '4xl': '2.25rem',
                '5xl': '3rem',
                'icon-lg': '2.0625rem', // 33px
                'title-size': '2.625rem', // 42px
            },
            boxShadow: {
                'default': '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
                'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                'card': '0 0 20px rgba(0, 0, 0, 0.05)',
                'dropdown': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                'sticky': '0 -2px 10px rgba(0, 0, 0, 0.05)',
            },
            zIndex: {
                '1': '1',
                '2': '2',
                '10': '10',
                '20': '20',
                '30': '30',
                '40': '40',
                '50': '50',
                'modal': '100',
                'tooltip': '110',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
            },
            animation: {
                fadeIn: 'fadeIn 0.5s ease-out',
                slideUp: 'slideUp 0.5s ease-out',
                slideDown: 'slideDown 0.3s ease-out',
                slideInRight: 'slideInRight 0.4s ease-out',
            },
        },
    },
    corePlugins: {
        outline: false,
    },
    plugins: [
        require('@salla.sa/twilight-tailwind-theme'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp'),
    ],
}
