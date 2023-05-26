import { useCallback, useEffect, useState } from "react";
import { apiUrl } from "../../helpers/http";

export const statusType = {
  pending: "pending",
  success: "success",
  error: "error",
};

type StatusType = "pending" | "success" | "error" | "idle";
type MethodType = "GET" | "POST" | "PUT" | "DELETE";
type data = any;
type urlParams = string;
type path = string;
type immediate = boolean;
type value = any;

export const useApi = (
  path: path,
  immediate: boolean,
  authKey?: string
): {
  execute: (method?: MethodType, data?: data, urlParams?: urlParams) => Promise<void>;
  status: StatusType;
  value: value;
  error: any;
} => {
  const [status, setStatus] = useState<StatusType>("idle");
  const [value, setValue] = useState<value>(null);
  const [error, setError] = useState<any>(null);
  const [mounted, setMounted] = useState<boolean>(true);

  const execute = useCallback(
    async (method?: MethodType, data?: data, urlParams: urlParams = "") => {
      setStatus("pending");
      // setValue(null);
      setError(null);
      try {
        const response = await query(path, method, data, urlParams, authKey);
        if (mounted) {
          setValue(response);
          setStatus("success");
        }
      } catch (error: any) {
        if (mounted) {
          setError(error);
          setStatus("error");
        }
      }
    },
    [mounted, path, authKey]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
};

const query = async (
  path: path,
  method: MethodType = "GET",
  data?: data,
  urlParams?: urlParams,
  authKey?: string
): Promise<any> => {
  path = apiUrl + path;
  path += urlParams;
  let res: Response;
  if (method === "POST") {
    res = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authKey || "",
      },
      body: JSON.stringify(data),
    });
  } else if (method === "PUT") {
    res = await fetch(path, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authKey || "",
      },
      body: JSON.stringify(data),
    });
  } else if (method === "DELETE") {
    res = await fetch(path, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authKey || "",
      },
      body: JSON.stringify(data),
    });
  } else {
    res = await fetch(path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authKey || "",
      },
    });
  }

  if (res.status === 401) {
    throw new Error("Unauthorized");
  }

  if (res.ok) {
    try {
      const txt = await res.text();
      if (txt === "") {
        return null;
      }
      const data = JSON.parse(txt);
      return data;
    } catch (error) {
      throw new Error("Invalid JSON response from server.");
    }
  }
};
