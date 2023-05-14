import { useRouter } from "expo-router";
import { Image, View } from "react-native";
import { FAB, IconButton, Text } from "react-native-paper";
import { useApi } from "../../app/hooks/useApi";
import { useAuth } from "../../contexts/AuthContext";
import { Drink } from "../../interfaces/auth/types";

export default function MyDrinks() {
  const auth = useAuth();
  const api = useApi("/mypages/mydrinks", true, auth.auth?.token);
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1e1e1e",
        padding: 15,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Your Creations
      </Text>
      {api.value?.map((drink: Drink) => {
        return (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Image
                source={{ uri: drink.imageUrl }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  marginRight: 10,
                }}
              />
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {drink.name}
                </Text>
                <Text
                  style={{
                    color: "#aaa",
                    fontSize: 12,
                  }}
                >
                  {drink.created}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <IconButton
                  icon="pencil"
                  size={20}
                  onPress={() => {
                    router.push(`/edit/${drink.id}`);
                  }}
                />
                <IconButton icon="delete" size={20} onPress={() => {}} />
              </View>
            </View>
          </View>
        );
      })}
      <FAB
        icon="plus"
        onPress={() => router.push("/create")}
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "#f8c700",
        }}
      />
    </View>
  );
}
