import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import getFunctions from 'firebase-auth-functions';
admin.initializeApp();

const VD_EMAIL = 'capitalsnewman@hotmail.com';

// FROM HAS TO BE A VERIFIED SENDER
// TEST EMAILING TO SAME ADDRESS AS SENDER
// TEST EMAILING TO MAIN EMAIL FROM CAPITALSNEWMAN
// ADD HTML BACK INTO MESSAGE

export const { signUp, signIn, editProfile } = getFunctions(admin, functions);

export const contactSubmission = functions.https.onCall((data) => {
  const { name, email, message } = data;

  if (typeof name !== 'string')
    throw new functions.https.HttpsError(
      'invalid-argument',
      'name field must be of type string'
    );
  if (typeof email !== 'string')
    throw new functions.https.HttpsError(
      'invalid-argument',
      'email field must be of type string'
    );
  if (typeof message !== 'string')
    throw new functions.https.HttpsError(
      'invalid-argument',
      'message field must be of type string'
    );

  admin
    .firestore()
    .collection('mail')
    .add({
      to: VD_EMAIL,
      from: VD_EMAIL,
      message: {
        subject: 'Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      },
    });
});

