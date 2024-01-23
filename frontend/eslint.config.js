// @ts-nocheck
import antfu from '@antfu/eslint-config'

export default antfu(
  {   
    ecmaVersion: 12,
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    sourceType: 'module',
    unocss: true,
    formatters: true,
    
  },
)
