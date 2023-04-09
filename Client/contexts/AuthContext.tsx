import { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "../helpers/http";

export type AuthContextType = {
  user: { username: string } | null;
  signin: (username: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
};

const defaultValue: AuthContextType = {
  user: null,
  signin: (email: string, password: string) => {
    throw new Error("Not implemented");
  },
  signup: (email: string, password: string) => {
    throw new Error("Not implemented");
  },
  signout: () => {
    throw new Error("Not implemented");
  },
};

const authContext = createContext<AuthContextType | null>(defaultValue);

type Props = {
  children: React.ReactNode;
};

export function ProvideAuth({ children }: Props) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState<{ username: string } | null>(null);

  const signin = async (email: string, password: string) => {
    const resp = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    });

    if (resp.status === 200) {
      const data = await resp.json();
      console.log(data.user.username);
      setUser(data.user);
    }
  };

  const signup = async (email: string, password: string) => {
    throw new Error("Not implemented");
  };

  const signout = async () => {
    setUser(null);
  };

  useEffect(() => {
    console.log(user);
  }, []);

  return {
    user,
    signin,
    signup,
    signout,
  };
}
