import { useRouter } from "expo-router";
import { Button } from "react-native-paper";
import { useAuth } from "../../contexts/AuthContext";

export default function UserButton() {
  const auth = useAuth();
  const router = useRouter();

  if (!auth.auth?.user) {
    return (
      <Button
        onPress={() => {
          router.push("/(auth)/sign-in");
        }}
      >
        Login
      </Button>
    );
  }

  return (
    <Button
      onPress={() => {
        auth.signOut();
      }}
    >
      Logout
    </Button>
  );
}
