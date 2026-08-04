// usePasswordValidator.js
export function validatePassword(password, config) {
  // If validator is disabled → always valid
  if (!config?.enabled) {
    return {
      valid: true,
      errors: {},
    };
  }

  const errors = {};

  if (config.minLength) {
    errors.minLength = password.length >= config.minLength;
  }

  if (config.rules.uppercase) {
    errors.uppercase = /[A-Z]/.test(password);
  }

  if (config.rules.lowercase) {
    errors.lowercase = /[a-z]/.test(password);
  }

  if (config.rules.number) {
    errors.number = /[0-9]/.test(password);
  }

  if (config.rules.special) {
    errors.special = /[^A-Za-z0-9]/.test(password);
  }

  const valid = Object.values(errors).every(Boolean);

  return {
    valid,
    errors,
  };
}
