import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintJest from 'eslint-plugin-jest'
import html from 'eslint-plugin-html'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import tailwindPlugin from 'eslint-plugin-tailwindcss'

export default [
  { ignores: ['node_modules', 'dist', 'vite.config.js'] },
  {
    files: ['**/*.{ts,tsx,js,jsx,html}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.jest,
        vi: 'readonly',
        __dirname: 'readonly'
      }
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'],
          moduleDirectory: ['node_modules', 'src/']
        }
      }
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      jest: eslintJest,
      html,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      '@typescript-eslint': tsPlugin,
      tailwindcss: tailwindPlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      'import/no-unresolved': 'off',
      ...jsxA11y.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      ...eslintConfigPrettier.rules,
      ...eslintJest.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules
    }
  }
]
