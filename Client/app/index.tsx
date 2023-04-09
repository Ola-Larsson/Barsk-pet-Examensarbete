import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { apiUrl } from "../helpers/http";

export default function Home() {
  const [data, setData] = React.useState(null);
  const auth = useAuth();

  const fetchData = async () => {
    var resp = await fetch(`${apiUrl}/test`);
    var data = await resp.json();
    setData(data);
  };

  console.log(auth?.user);

  return (
    <View style={styles.container}>
      {auth?.user ? <Text>Logged in as {auth?.user?.username}</Text> : <Text>Not logged in</Text>}
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{JSON.stringify(data)}</Text>
      <Text>{apiUrl}</Text>
      <Button title="Fetch" onPress={() => fetchData()} />

      <StatusBar style="auto" />
      <Stack.Screen
        options={{
          headerRight: () => <Button onPress={() => auth?.signout()} title="Logout" color="#000" />,
        }}
      />

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
