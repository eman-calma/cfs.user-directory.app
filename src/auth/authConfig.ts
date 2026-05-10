export const msalConfig = {
  auth: {
    clientId: "f3fa80b8-980e-4984-9fc4-3b23cf1de57c",
    authority:"https://login.microsoftonline.com/70972e81-3ac9-4b88-b940-029abff8eea6",
    redirectUri: "http://localhost:5173",
  },

  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: [
    "https://emcdemo.onmicrosoft.com/89da3a56-58ea-4f69-9adb-5ad1553abab8/access_as_user",
  ],
};