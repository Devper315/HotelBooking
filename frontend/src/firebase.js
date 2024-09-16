import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCymBhNax3QamfS44UePqfQscM__Y9bKZs",
  authDomain: "hotel-booking-73711.firebaseapp.com",
  projectId: "hotel-booking-73711",
  storageBucket: "hotel-booking-73711.appspot.com",
  messagingSenderId: "137729307198",
  appId: "1:137729307198:web:dbf7650896840db8b7d76f",
  measurementId: "G-E85863K2VE"
};


const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };