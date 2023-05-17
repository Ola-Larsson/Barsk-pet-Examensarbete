import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useAuth } from "../../contexts/AuthContext";

export default function Profile() {
  const auth = useAuth();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1b1c1d",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Profile
      </Text>

      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        {auth.auth?.user?.username}
      </Text>
      <Text
        style={{
          color: "#aaa",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        {auth.auth?.user?.email}
      </Text>

      <Button onPress={() => auth.signOut()}>Logout</Button>
    </View>
  );
}
