import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { apiUrl } from "../helpers/http";
import { getAuthFromStore } from "../helpers/secureStore";
import { useApi } from "./hooks/useApi";

export default function Home() {
  const auth = useAuth();
  const api = useApi("/test", false, auth.auth?.token);

  useEffect(() => {
    const getTokenAsync = async () => {
      const token = await getAuthFromStore();
      if (token) {
        auth.signIn(token);
      }
    };
    getTokenAsync();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {auth?.auth?.user ? (
        <Text>Logged in as {auth?.auth.user?.username}</Text>
      ) : (
        <Text>Not logged in</Text>
      )}
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{api.value ? api.value[0].name : ""}</Text>
      <Text>{apiUrl}</Text>
      <Button
        title={api.status == "pending" ? "Fetching..." : "Fetch"}
        onPress={() => api.execute()}
      />
      {api.error && <Text>{api.error.toString()}</Text>}
      <Link href="/Details">Go to Details</Link>
      <Link href="/Login">Go to Login</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
