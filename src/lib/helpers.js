/**
 * Generates a random OTP (One-Time Password) of specified length
 * @param {number} length - Length of OTP (default: 6)
 * @returns {string} Generated OTP
 */
// Ensure consistent OTP length (6 digits)
export const generateOTP = (length = 6) => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

/**
 * Generates a random referral code
 * @param {number} length - Length of referral code (default: 8)
 * @returns {string} Generated referral code
 */
export const generateReferralCode = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return code;
};

/**
 * Gets current date in Pakistan timezone
 * @returns {Date} Current date in Pakistan timezone
 */
export const getPakistanDate = () => {
  const now = new Date();
  const pakistanTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Karachi" }));
  return pakistanTime;
};

/**
 * Calculates OTP expiry time (default: 10 minutes from now) in Pakistan timezone
 * @param {number} minutes - Minutes until expiry (default: 10)
 * @returns {Date} Expiry date/time in Pakistan timezone
 */
export const getOtpExpiry = (minutes = 10) => {
  const now = getPakistanDate();
  return new Date(now.getTime() + minutes * 60000);
};

/**
 * Validates an email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validates a password (min 8 chars, at least 1 letter and 1 number)
 * @param {string} password - Password to validate
 * @returns {boolean} True if valid password
 */
export const validatePassword = (password) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  return re.test(password);
};

/**
 * Formats a wallet address for display (e.g., "0x123...abcd")
 * @param {string} address - Full wallet address
 * @param {number} start - Number of starting chars to show (default: 6)
 * @param {number} end - Number of ending chars to show (default: 4)
 * @returns {string} Formatted address
 */
export const formatWalletAddress = (address, start = 6, end = 4) => {
  if (!address || address.length <= start + end) return address;
  return `${address.substring(0, start)}...${address.substring(address.length - end)}`;
};