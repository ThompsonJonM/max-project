//@ts-check
const functions = require('firebase-functions');

const accounts = require('./accounts');

/**
 * 
 * @typedef {import('firebase-functions/lib/providers/https').CallableContext} CallableContext
 * @typedef {import('./accounts').UserRecord} UserRecord
 * 
 */


/**
 * 
 * Returns a dummy context object that can be passed as a second option
 * to functions wrapped with `functions.https.onCall`.  Useful for testing
 * purposes.
 * 
 */
const getContext = () => ({
  auth: null,
  rawRequest: {
    headers: {
      'x-forwarded-for': '127.0.0.1'
    }
  }
});


/**
 * Create a new user account.
 * 
 * @param   {UserRecord}          data
 * @param   {CallableContext}     context
 * @returns {Promise<UserRecord>}
 * @throws  {functions.https.HttpsError}
 */
const createAccount = async (data, context) => {
  try {
    return await accounts.createUser(data);
  } catch (error) {
    if (error.message == 'invalid-email') {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Invalid email'
      );
    } else if (error.message == 'invalid-password') {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Invalid password'
      );
    } else if (error.message = 'account-exists') {
      throw new functions.https.HttpsError(
        'already-exists',
        'Account already exists'
      );
    }
  }

  throw new functions.https.HttpsError(
    'unknown',
    'An unknown error occured'
  );
};

/**
 * Update an existing user record.
 * 
 * @param   {UserRecord}          data
 * @param   {CallableContext}     context
 * @returns {Promise<UserRecord>}
 * @throws  {functions.https.HttpsError}
 */
const updateUser = async (data, context) => {
  try {
    return await accounts.updateUser(data);
  } catch (error) {
    if (error.message == 'account-does-not-exist') {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'Account does not exist'
      );
    } else if (error.message == 'permission-denied') {
      throw new functions.https.HttpsError(
        'permission-denied',
        'Permission denied'
      );
    }
  }

  throw new functions.https.HttpsError(
    'unknown',
    'An unknown error occured'
  );
}

exports.accounts = {
  create: functions.https.onCall(createAccount),
  update: functions.https.onCall(updateUser)
};
