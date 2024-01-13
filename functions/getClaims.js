const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert('./serviceAccountKey.json'),
});

const uid = 'jHpbaLlenmW3Bg1GIIjNHzLj6O73';

admin
  .auth()
  .getUser(uid)
  .then((userRecord) => {
    // Log the existing custom claims
    console.log('Existing custom claims:', userRecord.customClaims);
  });
