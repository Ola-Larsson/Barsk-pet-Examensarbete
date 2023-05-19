import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import UserButton from "../components/header/user-button";
import Tabs from "../components/tabs";
import { AuthProvider } from "../contexts/AuthContext";

export const unstable_settings = {
  inititalRouteName: "index",
};

export default function Layout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2b2b2b",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => <UserButton />,
        }}
      />
      <StatusBar style="light" />
      <Tabs />
    </AuthProvider>
  );
}
