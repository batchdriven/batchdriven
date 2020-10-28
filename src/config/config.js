import firebase from 'react-native-firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX_gMY84aDqaciy-ZQqmYF0sgOPQxHR_0",
  authDomain: "batchdriven-97457.firebaseapp.com",
  databaseURL: "https://batchdriven-97457.firebaseio.com",
  projectId: "batchdriven-97457",
  storageBucket: "batchdriven-97457.appspot.com",
  messagingSenderId: "830771903868",
  appId: "1:830771903868:web:9708eeb773295d4524b8f9",
  measurementId: "G-LD0KKSLDDC"
};

const Firebase = firebase.initializeApp(firebaseConfig, 'BatchDriven');

Firebase.auth();
Firebase.firestore();

export default Firebase;