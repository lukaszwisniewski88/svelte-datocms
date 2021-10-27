import { defineConfig } from 'windicss/helpers'
import filters from 'windicss/plugin/filters'
import forms from 'windicss/plugin/forms'
import aspectRatio from 'windicss/plugin/aspect-ratio'
import lineClamp from 'windicss/plugin/line-clamp'
import typography from 'windicss/plugin/typography'

export default defineConfig({
    darkMode: 'class',
    theme:{
        extend:{

        }
    },
    plugins:[
        filters,
        forms,
        lineClamp,
        aspectRatio,
        typography
    ]
})