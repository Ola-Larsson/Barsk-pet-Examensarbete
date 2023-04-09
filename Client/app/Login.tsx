import { useRouter } from "expo-router";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const auth = useAuth();

  React.useEffect(() => {
    if (auth?.user) {
      router.push("/");
    }
  }, [auth?.user]);

  return (
    <View>
      <Text>this is a login page</Text>
      <TextInput placeholder="username" onChangeText={(text) => setUsername(text)} />
      <TextInput placeholder="password" onChangeText={(text) => setPassword(text)} />
      <TouchableOpacity onPress={() => auth?.signin(username, password)}>
        <Text>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}
