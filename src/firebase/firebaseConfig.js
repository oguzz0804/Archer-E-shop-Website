import * as firebase from "firebase/app";
import "@firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyA8JzwCpLnWxlHPpmuVR437_KE7b_W9TWo",
  authDomain: "archerdb-4601b.firebaseapp.com",
  databaseURL: "https://archerdb-4601b-default-rtdb.firebaseio.com/",
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