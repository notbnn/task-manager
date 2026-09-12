import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: ['**/node_modules/**', 'tests/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      all: true,
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: ['src/**/*.test.*', 'src/main.jsx', 'src/main.tsx', 'src/test/**'],
      thresholds: {
        lines: 10,
        functions: 15,
        branches: 4,
        statements: 9,
      },
    },
  },
})