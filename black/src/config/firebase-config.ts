import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBCnUq9fWjvMQQDS2zJVzbf3PIHZtellWc",
  authDomain: "project-media-5f4c1.firebaseapp.com",
  projectId: "project-media-5f4c1",
  storageBucket: "project-media-5f4c1.appspot.com",
  messagingSenderId: "89620102271",
  appId: "1:89620102271:web:249c0c762ae8eee326934a",
  measurementId: "G-3GRJ930BQT",
};

// firebase.initializeApp();

const initializeFirebase = () => {
  !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();
};

export default initializeFirebase;

// export const auth = typeof app !== "undefined" && app.auth();
