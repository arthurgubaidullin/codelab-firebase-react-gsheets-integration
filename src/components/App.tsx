import React from "react";
import "./App.css";
import "../firebase/auth";
import GoogleAPIsAuthorizedUserOnly from "./GoogleAPIsAuthorizedUserOnly";
import { DataView } from "./DataView";
import { signOut } from "../firebase/auth";
import { useAuth } from "../hooks/auth";

function App() {
  const currentUser = useAuth();

  if (currentUser === undefined) {
    return null;
  }

  return (
    <div style={{ margin: "16px" }}>
      <GoogleAPIsAuthorizedUserOnly>
        <DataView />
      </GoogleAPIsAuthorizedUserOnly>
      {currentUser ? (
        <div style={{ marginTop: "16px" }}>
          <button onClick={signOut}>Sign out</button>
        </div>
      ) : null}
    </div>
  );
}

export default App;
