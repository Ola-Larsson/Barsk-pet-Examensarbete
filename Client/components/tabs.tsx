import { usePathname, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";

export default function Tabs() {
  const router = useRouter();
  const pathName = usePathname();
  const currentRoute = pathName.split("/")[1];
  const auth = useAuth();

  return (
    <View
      style={{
        backgroundColor: "#2b2b2b",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <IconButton
        icon="home"
        size={25}
        iconColor={currentRoute == "" ? "#f8c700" : "#aaa"}
        onPress={() => router.push("/")}
      />
      <IconButton
        icon="magnify"
        size={25}
        iconColor={["search", "search-results"].includes(currentRoute) ? "#f8c700" : "#aaa"}
        onPress={() => router.push("/search")}
      />
      <IconButton
        icon="account"
        size={25}
        iconColor={
          ["my-page", "my-favorites", "profile"].includes(currentRoute) ? "#f8c700" : "#aaa"
        }
        onPress={() =>
          auth.auth?.token ? router.push("/my-page") : router.push("/(auth)/sign-in")
        }
      />
    </View>
  );
}
