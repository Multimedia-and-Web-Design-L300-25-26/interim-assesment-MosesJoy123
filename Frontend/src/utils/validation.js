/**
 * Email validation regex - RFC 5322 simplified
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {object} {isValid: boolean, error: string|null}
 */
export const validateEmail = (email) => {
  const trimmed = email.trim();
  if (!trimmed) {
    return { isValid: false, error: "Email is required" };
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }
  return { isValid: true, error: null };
};

/**
 * Validate name/full name
 * @param {string} name - Name to validate
 * @returns {object} {isValid: boolean, error: string|null}
 */
export const validateName = (name) => {
  const trimmed = name.trim();
  if (!trimmed) {
    return { isValid: false, error: "Name is required" };
  }
  if (trimmed.length < 2) {
    return { isValid: false, error: "Name must be at least 2 characters" };
  }
  return { isValid: true, error: null };
};

/**
 * Validate password
 * @param {string} password - Password to validate
 * @returns {object} {isValid: boolean, error: string|null}
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, error: "Password is required" };
  }
  if (password.length < 6) {
    return { isValid: false, error: "Password must be at least 6 characters" };
  }
  return { isValid: true, error: null };
};

/**
 * Validate password confirmation
 * @param {string} password - Password
 * @param {string} confirmation - Password confirmation
 * @returns {object} {isValid: boolean, error: string|null}
 */
export const validatePasswordMatch = (password, confirmation) => {
  if (password !== confirmation) {
    return { isValid: false, error: "Passwords do not match" };
  }
  return { isValid: true, error: null };
};

/**
 * Validate crypto symbol (2-6 uppercase letters/numbers)
 */
export const validateSymbol = (sym) => {
  const trimmed = String(sym || "").trim();
  if (!trimmed) return { isValid: false, error: "Symbol is required" };
  const normalized = trimmed.toUpperCase();
  if (!/^[A-Z0-9]{2,6}$/.test(normalized)) {
    return { isValid: false, error: "Symbol must be 2-6 letters or numbers (no spaces)" };
  }
  return { isValid: true, error: null };
};

/**
 * Validate price or numeric fields
 */
export const validatePositiveNumber = (value, label = "Value") => {
  if (value === "" || value === null || value === undefined) {
    return { isValid: false, error: `${label} is required` };
  }
  const n = Number(value);
  if (Number.isNaN(n)) return { isValid: false, error: `${label} must be a number` };
  if (n < 0) return { isValid: false, error: `${label} must be 0 or greater` };
  return { isValid: true, error: null };
};

/**
 * Simple image URL check (optional)
 */
export const validateImageUrl = (url) => {
  const trimmed = String(url || "").trim();
  if (!trimmed) return { isValid: true, error: null };
  try {
    const u = new URL(trimmed);
    if (!/(png|jpg|jpeg|avif|webp|gif)$/i.test(u.pathname)) {
      // allow but warn (still acceptable)
      return { isValid: true, error: null };
    }
    return { isValid: true, error: null };
  } catch {
    return { isValid: false, error: "Image must be a valid URL" };
  }
};
