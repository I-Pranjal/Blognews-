import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCnYtsWDzuSscAeK5VHnXb0bb2AGSdrXmY",
  authDomain: "magnews-2592b.firebaseapp.com",
  projectId: "magnews-2592b",
  storageBucket: "magnews-2592b.appspot.com",
  messagingSenderId: "418636364122",
  appId: "1:418636364122:web:863d06b283761f66485b63",
  measurementId: "G-8V6D06JT9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); 