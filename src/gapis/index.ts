import { googleAccessToken, resetAccessToken } from "../store/auth";

const clientId = process.env.REACT_APP_CLIENT_ID;
const scope = "https://www.googleapis.com/auth/spreadsheets.readonly";
const discoveryDocs = [
  "https://sheets.googleapis.com/$discovery/rest?version=v4",
];

let ready = false;

export async function getClient(): Promise<typeof gapi.client> {
  if (ready) {
    return gapi.client;
  }
  return new Promise((resolve) => {
    gapi.load("client:auth2", async () => {
      await gapi.client.init({
        clientId,
        discoveryDocs,
        scope,
      });
      googleAccessToken.watch((accessToken) => {
        if (accessToken !== null) {
          gapi.client.setToken({ access_token: accessToken });
        } else {
          gapi.client.setToken(null);
        }
        ready = true;
        resolve(gapi.client);
      });
    });
  });
}

export async function wrapRequest<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (error.status === 401) {
      gapi.client.setToken(null);
      resetAccessToken();
    }
    throw error;
  }
}
