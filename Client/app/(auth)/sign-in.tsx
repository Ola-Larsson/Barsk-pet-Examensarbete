import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Switch, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useAuth } from "../../contexts/AuthContext";
import { useApi } from "../hooks/useApi";
export default function SignIn() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(true);
  const router = useRouter();
  const auth = useAuth();
  const api = useApi("/auth/login", false);

  const signIn = async () => {
    api.execute("POST", {
      username,
      password,
    });
  };

  useEffect(() => {
    if (api.status === "success") {
      auth.signIn(api.value);
      router.push("/");
    }
  }, [api.status]);

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
          title: "Sign In",
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
          What do we call this app?
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
          placeholder="Username or Email"
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
          onPress={() => signIn()}
          style={{
            backgroundColor: "#f8c701",
            width: 100,
          }}
          textColor="#000"
        >
          {api.status === "pending" ? "Loading..." : "SIGN IN"}
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
          onPress={() => router.push("/(auth)/register")}
        >
          SIGN UP
        </Text>
        <Text style={{ color: "#fff" }}>FORGOT PASSWORD?</Text>
      </View>
    </View>
  );
}
