import { useRouter } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";

export default function Tabs() {
  const router = useRouter();
  const auth = useAuth();

  return (
    <View>
      <Pressable onPress={() => router.push("/")}>
        <Text>Tab 1</Text>
      </Pressable>
      <Pressable onPress={() => router.push("/search")}>
        <Text>Tab 2</Text>
      </Pressable>
      <Pressable onPress={() => router.push("/settings")}>
        <Text>Tab 3</Text>
      </Pressable>
    </View>
  );
}
