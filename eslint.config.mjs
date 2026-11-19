import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
  ...nextVitals,
  {
    rules: {
      '@next/next/no-page-custom-font': 'off',
      '@next/next/no-css-tags': 'off'
    }
  },
  globalIgnores(['.next/**', 'node_modules/**', 'next-env.d.ts', 'public/**'])
]);