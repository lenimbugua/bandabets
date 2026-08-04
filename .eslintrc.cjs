module.exports = {
  env: {
    node: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  rules: {
    // override/add rules settings here, such as:
    "vue/no-unused-vars": "error",
    // "vue/no-undef-components": [
    //   "error",
    //   {
    //     ignorePatterns: ["router(\\-\\w+)+"],
    //   },
    // ],
    "vue/multi-word-component-names": "off",
    "vue/first-attribute-linebreak": "off",
  },
};
