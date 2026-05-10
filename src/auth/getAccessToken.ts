import { msalInstance }
from "./msalInstance";

import { loginRequest }
from "./authConfig";

export async function getAccessToken() {

  const accounts =
    msalInstance.getAllAccounts();

  if (accounts.length === 0) {

    throw new Error(
      "No authenticated account found"
    );
  }

  const response =
    await msalInstance.acquireTokenSilent({

      ...loginRequest,

      account: accounts[0],
    });

  return response.accessToken;
}