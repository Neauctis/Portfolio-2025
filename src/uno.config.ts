import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      'text-main': 'text-hex-333333 dark:text-hex-ffffff',
      'text-link': 'text-hex-333333 dark:text-hex-ffffff',
      'border-main': 'border-hex-333333 dark:border-hex-ffffff',
      'bg-main': 'bg-hex-ffffff dark:bg-hex-000000',
    },
    {
      'text-title': 'text-hex-333333 dark:text-hex-ffffff text-4xl font-800',
      'nav-link': 'text-hex-333333 dark:text-hex-ffffff opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer',
      'prose-link': 'text-hex-333333 dark:text-hex-ffffff text-nowrap cursor-pointer border-b-1 border-hex-333333 dark:border-hex-ffffff hover:border-hex-333333 dark:hover:border-hex-ffffff transition-border-color duration-200 decoration-none',
      'container-link': 'p-2 opacity-60 hover:opacity-100 cursor-pointer hover:bg-hex-333333 dark:hover:bg-hex-ffffff hover:bg-op-10 transition-colors transition-opacity duration-200',
    },
    {
      'hr-line': 'w-14 mx-auto my-8 border-solid border-1px border-hex-333333 dark:border-hex-ffffff border-op-30',
    },
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      prefix: 'i-',
      extraProperties: {
        display: 'inline-block',
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,600,800',
        mono: 'DM Mono:400,600',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: [
    'i-ri-file-list-2-line',
    'i-carbon-campsite',
    'i-simple-icons-github',
    'i-simple-icons-x',
    'i-simple-icons-linkedin',
    'i-simple-icons-instagram',
    'i-simple-icons-youtube',
    'i-simple-icons-bilibili',
    'i-simple-icons-zhihu',
    'i-simple-icons-sinaweibo',
    'i-ri-github-line',
    'i-ri-twitter-x-line',
  ],
})
