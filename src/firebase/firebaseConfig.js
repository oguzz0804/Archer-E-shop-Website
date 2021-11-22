import * as firebase from "firebase/app";
import "@firebase/firestore";

const app = firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain:process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket:process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
});

export function getFirebase() {
  return app;
}

export const getFirestore = () => {
  return firebase.firestore(app);
};