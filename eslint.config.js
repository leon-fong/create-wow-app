// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      // eslint ignore globs here
      'templates/**',
    ],
  },
  {
    rules: {
      // overrides
      'no-console': 'off',
    },
  },
)
