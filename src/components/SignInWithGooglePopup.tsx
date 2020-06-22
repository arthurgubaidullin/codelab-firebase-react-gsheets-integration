import React from "react";
import { signInWithPopup } from "../firebase/auth";

function SignInWithGooglePopup() {
  return (
    <>
      <h1>You're not athorized</h1>
      <p>You can sign in with your google account.</p>
      <button onClick={signInWithPopup}>Sign in</button>
    </>
  );
}

export default SignInWithGooglePopup;
