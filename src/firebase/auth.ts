import app from "./app";
import firebase from "firebase/app";
import "firebase/auth";
import { setAccessToken, resetAccessToken } from "../store/auth";

const provider = new firebase.auth.GoogleAuthProvider();

provider.addScope("https://www.googleapis.com/auth/spreadsheets.readonly");

export async function signInWithPopup() {
  const userCred = await app.auth().signInWithPopup(provider);
  // @ts-ignore
  const accessToken = userCred.credential!.accessToken;
  setAccessToken(accessToken);
  return userCred;
}

export async function signOut() {
  resetAccessToken();
  return app.auth().signOut();
}

export function onAuthStateChanged(
  callback: (user: firebase.User | null) => void
) {
  return app.auth().onAuthStateChanged(callback);
}
