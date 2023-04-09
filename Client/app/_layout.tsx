import { Stack } from "expo-router";
import React from "react";
import { ProvideAuth } from "../contexts/AuthContext";
export const unstable_settings = {
  initialRouteName: "index",
  screens: {
    index: {
      path: "/",
      title: "Home",
    },
    details: {
      path: "/details",
      title: "Details",
    },
    login: {
      path: "/login",
      title: "Login",
    },
  },
};

export default function Layout() {
  return (
    <ProvideAuth>
      <Stack
        initialRouteName="home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </ProvideAuth>
  );
}
