import { defineConfig } from 'windicss/helpers'
import filters from 'windicss/plugin/filters'
import forms from 'windicss/plugin/forms'
import aspectRatio from 'windicss/plugin/aspect-ratio'
import lineClamp from 'windicss/plugin/line-clamp'
import typography from 'windicss/plugin/typography'

export default defineConfig({
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                "accent": {
                    "50": "#ff8b6f",
                    "100": "#ff8165",
                    "200": "#ff775b",
                    "300": "#ff6d51",
                    "400": "#ff6347",
                    "500": "#ff593d",
                    "600": "#f54f33",
                    "700": "#eb4529",
                    "800": "#e13b1f",
                    "900": "#d73115"
                }

            }
        }
    },
    plugins: [
        filters,
        forms,
        lineClamp,
        aspectRatio,
        typography
    ]
})