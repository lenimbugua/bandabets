// passwordRules.js
export const passwordConfig = {
  enabled: true, // turn validator ON/OFF

  minLength: 6,

  rules: {
    uppercase: true,
    lowercase: true,
    number: true,
    special: true,
  },
};
