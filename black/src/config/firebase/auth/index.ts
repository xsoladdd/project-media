// import firebase from "firebase";
import initializeFirebase from "../firebase-config";
import firebase from "firebase";
export * from "./authProviders";

initializeFirebase();
export const signinWithProvider = async (
  provider: firebase.auth.AuthProvider
) => {
  try {
    const res = await firebase.auth().signInWithPopup(provider);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
