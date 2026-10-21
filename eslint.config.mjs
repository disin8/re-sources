import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      'dist/*',
      'dist/*/**',
      '.cache',
      '**/.cache/**',
      'public',
      '**/public/**',
      'node_modules',
      '**/node_modules/**',
      '*.esm.js',
      '**/*.esm.js/**',
      'scripts',
      '**/scripts/**',
    ],
  },
  {
    rules: {
      'node/prefer-global/process': 'off',
    },
  },
)
