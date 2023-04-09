import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function Details() {
  const router = useRouter();
  return (
    <View>
      <Text
        onPress={() => {
          router.push("/");
        }}
      >
        Details Screen
      </Text>
    </View>
  );
}
