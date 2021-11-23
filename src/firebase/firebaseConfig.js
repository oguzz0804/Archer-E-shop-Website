import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyA8JzwCpLnWxlHPpmuVR437_KE7b_W9TWo",
  authDomain: "archerdb-4601b.firebaseapp.com",
  databaseURL: "https://archerdb-4601b-default-rtdb.firebaseio.com",
  projectId: "archerdb-4601b",
  storageBucket: "archerdb-4601b.appspot.com",
  messagingSenderId: "112012461960",
  appId: "1:112012461960:web:f3526c24a58ecde26d5c3d"
});

export function getFirebase() {
  return app;
}

export const getFirestore = () => {
  return firebase.firestore(app);
};

export const auth = getAuth(app);


// import { getDatabase } from "firebase/database";
// import { initializeApp } from "firebase/app";

// const firebaseConfig =  {
//     apiKey: process.env.apiKey,
//     authDomain: process.env.authDomain,
//     projectId: process.env.projectId,
//     storageBucket: process.env.storageBucket,
//     messagingSenderId: process.env.messagingSenderId,
//     appId: process.env.appId
// }

// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);
// export default app
