import { useRouter, useSegments } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { setAuthInStore } from "../helpers/secureStore";
import { AuthUser, User } from "../interfaces/auth/types";

type AuthContextType = {
  signIn: (data: AuthUser) => void;
  signOut: () => void;
  auth: AuthUser | null;
};

const AuthContext = createContext<AuthContextType>({
  signIn: () => {},
  signOut: () => {},
  auth: null,
});

export function useAuth() {
  return useContext<AuthContextType>(AuthContext);
}

function useProtectedRoute(user: User | null) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    if (!user && !inAuthGroup) {
      router.replace("/sign-in");
    } else if (user && inAuthGroup) {
      router.replace("/");
    }
  }, [user, segments]);
}

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [auth, setAuth] = useState<AuthUser | null>(null);

  // useProtectedRoute(auth?.user || null);

  return (
    <AuthContext.Provider
      value={{
        signIn: (data: AuthUser) => {
          if (data.expiration) setAuth(data);
          setAuthInStore(data);
        },
        signOut: () => {
          setAuth(null);
          setAuthInStore(null);
        },
        auth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
