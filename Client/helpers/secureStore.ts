import * as SecureStore from "expo-secure-store";
import { AuthUser } from "../interfaces/auth/types";

export const getAuthFromStore = async () => {
  const auth = await SecureStore.getItemAsync("auth");
  if (auth) {
    const authdata = JSON.parse(auth);
    return authdata;
  }
};

export const setAuthInStore = async (data: AuthUser | null) => {
  if (data === null) return await SecureStore.deleteItemAsync("auth");
  return await SecureStore.setItemAsync("auth", JSON.stringify(data));
};
