import { Stack, useRouter } from "expo-router";
import React from "react";
import { Switch, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useAuth } from "../../contexts/AuthContext";
import { useApi } from "../hooks/useApi";

export default function Register() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(true);
  const router = useRouter();
  const auth = useAuth();

  const registerApi = useApi("/auth/register", false);
  const loginApi = useApi("/auth/login", false);

  const register = async () => {
    const result = await registerApi.execute("POST", {
      email,
      username,
      password,
    });
  };

  const signIn = async () => {
    const result = await loginApi.execute("POST", {
      username,
      password,
    });
  };

  React.useEffect(() => {
    if (registerApi.status === "success") {
      signIn();
    }
  }, [registerApi.status]);

  React.useEffect(() => {
    if (loginApi.status === "success") {
      auth.signIn(loginApi.value);
      router.push("/");
    }
  }, [loginApi.status]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1b1c1d",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Stack.Screen
        options={{
          title: "Register",
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: "#1b1c1d",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          padding: 15,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#fff",
            marginBottom: 40,
          }}
        >
          Register a new account
        </Text>
        <TextInput
          selectionColor="#aaa"
          style={{
            backgroundColor: "#2d2d2d",
            width: "100%",
            height: 35,
            marginBottom: 20,
            borderRadius: 5,
          }}
          activeUnderlineColor="#2d2d2d"
          underlineStyle={{ display: "none" }}
          placeholder="Email"
          inputMode="email"
          placeholderTextColor="#aaa"
          textColor="#fff"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          selectionColor="#aaa"
          style={{
            backgroundColor: "#2d2d2d",
            width: "100%",
            height: 35,
            marginBottom: 20,
            borderRadius: 5,
          }}
          activeUnderlineColor="#2d2d2d"
          underlineStyle={{ display: "none" }}
          placeholder="Username"
          placeholderTextColor="#aaa"
          textColor="#fff"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          selectionColor="#aaa"
          style={{
            backgroundColor: "#2d2d2d",
            width: "100%",
            height: 35,
            borderRadius: 5,
          }}
          activeUnderlineColor="#2d2d2d"
          underlineStyle={{ display: "none" }}
          placeholder="Password"
          placeholderTextColor="#aaa"
          textColor="#fff"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingLeft: 2,
          }}
        >
          <Text style={{ color: "#fff" }}>Remember me</Text>
          <Switch
            value={rememberMe}
            onValueChange={() => setRememberMe(!rememberMe)}
            trackColor={{ false: "#2d2d2d", true: "#2d2d2d" }}
            thumbColor={rememberMe ? "#f8c700" : "#f4f3f4"}
          />
        </View>
        <Button
          onPress={() => register()}
          style={{
            backgroundColor: "#f8c701",
            width: 100,
            marginTop: 40,
          }}
          textColor="#000"
        >
          {registerApi.status === "pending"
            ? "Loading..."
            : loginApi.status === "pending"
            ? "Logging in"
            : "REGISTER"}
        </Button>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 40,
        }}
      >
        <Text
          style={{ color: "#fff", marginBottom: 15 }}
          onPress={() => router.push("/(auth)/sign-in")}
        >
          RETURN TO SIGN IN
        </Text>
      </View>
    </View>
  );
}
