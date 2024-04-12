import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.cert({
    }),
});

export const firebaseAdmin = admin;