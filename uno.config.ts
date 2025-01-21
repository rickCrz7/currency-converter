import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup
} from 'unocss'

export default defineConfig({
    shortcuts: [
        // ...
    ],
    theme: {
        colors: {
            // ...
        }
    },
    presets: [
        presetIcons({
            extraProperties: {
                display: 'inline-block',
                'vertical-align': 'middle'
            }
        }),
        presetUno(),
        presetAttributify(),
        presetTypography(),
        presetWebFonts({
            fonts: {
                // ...
            }
        })
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()]
})
