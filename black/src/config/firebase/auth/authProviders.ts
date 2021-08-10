// import firebase from "../firebase-config";

import firebase from "firebase";
// import firebase from "../../../config/firebase-config";

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
