module.exports = {
    extends: 'eslint:recommended',
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module"
    }, 
    env: {
      node: true,
      es2021: true,
      es6:true,
      jest: true,
    },
  };
  