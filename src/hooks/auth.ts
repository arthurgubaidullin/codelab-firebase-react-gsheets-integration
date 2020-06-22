import { onAuthStateChanged } from "../firebase/auth";
import { useEffect, useState } from "react";

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<
    firebase.User | null | undefined
  >(undefined);
  useEffect(() => {
    return onAuthStateChanged(setCurrentUser);
  }, []);
  return currentUser;
}
