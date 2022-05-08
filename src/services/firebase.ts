import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';

let config: any = {
  apiKey: 'AIzaSyCmEEHFyeZvsi0IuhKAer8LWbvkDSfppS8',
  authDomain: 'visualdelusions-b6d13.firebaseapp.com',
  projectId: 'visualdelusions-b6d13',
  storageBucket: 'visualdelusions-b6d13.appspot.com',
  messagingSenderId: '403686251342',
  appId: '1:403686251342:web:8599b357dc4fe00d45dc1f',
};

export const app = firebase.initializeApp(config);
export const auth = firebase.auth(app);
export const db = firebase.firestore(app);
export const functions = firebase.functions(app);
export const storage = firebase.storage(app);

export type Query = firebase.firestore.Query;
export type CollectionReference = firebase.firestore.CollectionReference;
export type WhereFilterOp = firebase.firestore.WhereFilterOp;

export const callableContactSubmission =
  functions.httpsCallable('contactSubmission');

if (process.env.NODE_ENV === 'development') {
  auth.useEmulator('http://localhost:9099');
  db.useEmulator('localhost', 8080);
  functions.useEmulator('localhost', 5001);
  storage.useEmulator('localhost', 9199);
}

