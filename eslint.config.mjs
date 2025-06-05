// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import vuePlugin from 'eslint-plugin-vue'
import importPlugin from 'eslint-plugin-import'

// Адаптер для поддержки старого формата конфигурации
const compat = new FlatCompat()

export default withNuxt([
    // Основные правила JavaScript
    js.configs.recommended,

    // Настройка правил Vue
    ...compat.config({
        extends: [
            'plugin:vue/vue3-recommended',
            'eslint:recommended'
        ]
    }),

    // Правила для компонентов Vue
    {
        files: ['**/*.vue'],
        plugins: {
            vue: vuePlugin
        },
        rules: {
            'vue/multi-word-component-names': 'error',
            'vue/no-unused-components': 'error',
            'vue/no-undef-components': 'error',
            'vue/no-unused-vars': 'error',
            'vue/component-name-in-template-casing': ['error', 'PascalCase']
        }
    },

    // Правила для импортов
    {
        plugins: {
            import: importPlugin
        },
        rules: {
            'import/no-unresolved': 'error',
            'import/named': 'error',
            'import/default': 'error',
            'import/namespace': 'error',
            'import/no-unused-modules': 'error'
        },
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js', '.ts', '.vue']
                }
            }
        }
    }
])