import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: '*****************',
  authDomain: '*************',
  projectId: '************',
  storageBucket: '*****************',
  messagingSenderId: '********************',
  appId: '************',
};

initializeApp(firebaseConfig);

const firestore = getFirestore();

const MESSAGES = 'messages';

export {
    firestore,
    collection,
    addDoc,
    serverTimestamp,
    MESSAGES
};