//@ts-check
const crypto = require('crypto')

const storage = require('./storage');

/**
 * Password requirements
 * 
 * 1) Must contain at least 1 lowercase alphabetical character
 * 2) Must contain at least 1 uppercase alphabetical character
 * 3) Must contain at least 1 numeric character
 * 4) Must contain at least one special character of (!@#$%^&*)
 * 5) Must be eight characters or longer
 * 
 */
const PASSWORD_RE = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

const BANNED_DOMAINS = [
  /0wnd\.net$/i,
  /devnullmail\.com$/i,
  /dispose\.it$/i,
  /gotmail\.org$/i,
  /nospamfor\.us$/i,
  /spamgoes\.in$/i,
  /supermailer\.jp$/i,
  /tempmail\.eu$/i,
  /throwawayemailaddress\.com$/i,
  /trashmail\.me$/i
];


/**
 * Verify that the password provided meets certain criteria.
 * 
 * @param   {string}  password  Password to check
 * @returns {Boolean}           True if the password is valid
 */
const verifyPassword = (password) => {
  if (!password) {
    return false;
  }

  return PASSWORD_RE.test(password);
};

/**
 * Basic password hashing function.
 * 
 * @param {string}  password  Plain text password
 * @returns {string}          Hashed password
 */
const hashPassword = (password) => {
  // Basic MD5 for simplicity
  return crypto.createHash('md5')
    .update(password)
    .digest("hex");
}


/**
 * Checks that the plain-text password matches the one on file.
 * 
 * @param {string} password 
 * @param {string} hashed 
 */
const checkPassword = (password, hashed) => {
  return hashPassword(password) == hashed;
}

/**
 * Verify that the email passes various tests to be considered valid.
 * 
 * @param   {string}  email   Email address to check
 * @returns {Boolean}         True if email is valid
 */
const verifyEmail = (email) => {
  if (!email) {
    return false;
  }

  if (email.search(/\@/) < 0) {
    return false;
  }

  for (const pattern of BANNED_DOMAINS) {
    if (pattern.test(email)) {
      return false;
    }
  }

  return true;
};

/**
 * Get a user by email.  Returns `undefined` if no user is found.
 * 
 * @param {string} email 
 * @returns {Promise<UserRecord>}
 */
const getUser = async(email) => {
  return await storage.get(email);
}

/**
 * 
 * @typedef  {object} UserRecord
 * @property {string} email
 * @property {string} password
 * @property {string} firstName   
 * @property {string} lastName
 * 
 * @param {UserRecord} data
 * @returns {Promise<UserRecord>}
 */
const createUser = async(data) => {
  const { email, password, firstName, lastName } = data || {};

  if (!verifyEmail(email)) {
    throw new Error('invalid-email');
  }

  if (!verifyPassword(password)) {
    throw new Error('invalid-password');
  }

  let user = await storage.get(email);
  if (!user) {
    user = {
      password: hashPassword(password),
      email,
      firstName,
      lastName
    }
  } else {
    throw new Error('account-exists')
  }

  await storage.set(email, user);

  return user;
}

/**
 * Update user's first or last name.  Provided password must be plain-text
 * and will be checked against the hashed password on file.
 * 
 * @param {UserRecord} data
 * @returns {Promise<UserRecord>}
 */
const updateUser = async(data) => {
  const { email, password, firstName, lastName } = data || {};

  let user = await getUser(email || '');
  if (!user) {
    throw new Error('account-does-not-exist');
  }

  if (!checkPassword(password, user.password)) {
    throw new Error('permission-denied');
  }

  user = {
    ...user,
    firstName,
    lastName
  };

  await storage.set(email, user);
  
  return user;
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  verifyEmail,
  verifyPassword,
  hashPassword,
  checkPassword,
};
