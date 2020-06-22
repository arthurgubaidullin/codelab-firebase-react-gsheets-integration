import React from "react";
import { useStore } from "effector-react";
import { googleAccessToken } from "../store/auth";
import SignInWithGooglePopup from "./SignInWithGooglePopup";

const GoogleAPIsAuthorizedUserOnly: React.FC = function GoogleAPIsAuthorizedUserOnly({
  children,
}) {
  const token = useStore(googleAccessToken);

  if (token === null || token === undefined) {
    return <SignInWithGooglePopup />;
  }

  return <>{children}</>;
};

export default GoogleAPIsAuthorizedUserOnly;
