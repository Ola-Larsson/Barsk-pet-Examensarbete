import { usePathname, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";

export default function Tabs() {
  const router = useRouter();
  const pathName = usePathname();
  const currentRoute = pathName.split("/")[1];

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
        onPress={() => router.push("/my-page")}
      />
    </View>
  );
}
