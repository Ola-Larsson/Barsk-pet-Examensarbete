import Constants from "expo-constants";

const { manifest } = Constants;

const api =
  typeof manifest?.packagerOpts === `object` && manifest.packagerOpts.dev
    ? manifest.debuggerHost?.split(`:`).shift()?.concat(`:5001`)
    : `api.example.com`;

export const apiUrl = `http://${api}/api`;
