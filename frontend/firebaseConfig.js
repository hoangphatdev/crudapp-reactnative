// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1oq5l9ySHuxd5osYOMjF4iJW21zqfcPM",
  authDomain: "test-b94f1.firebaseapp.com",
  projectId: "test-b94f1",
  storageBucket: "test-b94f1.firebasestorage.app",
  messagingSenderId: "51109781909",
  appId: "1:51109781909:web:70b9389aabf03e1c1cd69c"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Firestore
export const db = getFirestore(app);