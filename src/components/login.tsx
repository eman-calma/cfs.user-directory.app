import {
  useMsal,
} from "@azure/msal-react";

import { loginRequest }
from "../auth/authConfig";

export default function LoginButton() {

  const { instance } = useMsal();

  const handleLogin = async () => {

    try {

      await instance.loginRedirect(loginRequest);

    } catch (error) {

      console.error(error);
    }
  };

  return (
    <button onClick={handleLogin}>
      Login with Microsoft
    </button>
  );
}