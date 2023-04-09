import * as SecureStore from "expo-secure-store";

export const getToken = async () => {
  return await SecureStore.getItemAsync("token");
};

export const setToken = async (token: string) => {
  return await SecureStore.setItemAsync("token", token);
};
