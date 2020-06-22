import { createStore, createEvent } from "effector";

export const setAccessToken = createEvent<string>();
export const resetAccessToken = createEvent();

const localStorageKey = "googleAccesToken";
const initialAccessToken = localStorage.getItem(localStorageKey);

export const googleAccessToken = createStore<string | null>(initialAccessToken)
  .on(setAccessToken, (unused, newAccessToken) => {
    return newAccessToken;
  })
  .reset(resetAccessToken);

setAccessToken.watch((token) => {
  localStorage.setItem(localStorageKey, token);
});

resetAccessToken.watch(() => {
  localStorage.removeItem(localStorageKey);
});
