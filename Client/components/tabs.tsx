import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";

export default function Tabs() {
  const router = useRouter();
  const auth = useAuth();

  return (
    <View
      style={{
        backgroundColor: "#2b2b2b",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <IconButton icon="home" size={25} iconColor="#f8c700" onPress={() => router.push("/")} />
      <IconButton
        icon="magnify"
        size={25}
        iconColor="#aaa"
        onPress={() => router.push("/search")}
      />
      <IconButton
        icon="account"
        size={25}
        iconColor="#aaa"
        onPress={() => router.push("/my-page")}
      />
    </View>
  );
}
