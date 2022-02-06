import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBwwIZnx9lHGswO40tNlZYoFHP8aKxT9G8",
  authDomain: "javln-2542a.firebaseapp.com",
  projectId: "javln-2542a",
  storageBucket: "javln-2542a.appspot.com",
  messagingSenderId: "1072333946963",
  appId: "1:1072333946963:web:80c091d05658a2767206a6",
  measurementId: "G-MQL2M71ZCN"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);