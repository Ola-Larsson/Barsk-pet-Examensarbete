import { useRouter } from "expo-router";
import { Image, Pressable, RefreshControl, ScrollView, TouchableOpacity, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { useApi } from "../../app/hooks/useApi";
import { useAuth } from "../../contexts/AuthContext";
import { Drink } from "../../interfaces/auth/types";

export default function MyFavorites() {
  const auth = useAuth();
  const router = useRouter();
  const api = useApi("/mypages/myfavorites", true, auth.auth?.token);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1b1c1d",
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#1e1e1e",
          padding: 15,
        }}
        refreshControl={
          <RefreshControl
            refreshing={api.status == "pending"}
            style={{ backgroundColor: "#1b1c1d" }}
            colors={["#f8c700", "#f8c700", "#f8c700"]}
            progressBackgroundColor={"#2b2b2b"}
            onRefresh={() => {
              api.execute();
            }}
          />
        }
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Your Favorites
        </Text>
        {api.value?.map((drink: Drink) => {
          return (
            <Pressable 
            key={drink.id}
            onPress={() => {
            router.push(`/${drink.id}`);
            }}> 
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
              key={drink.id}
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
                    {new Date(drink.created).toDateString()}
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
                  <TouchableOpacity
                    onPress={() => {
                      router.push(`/${drink.id}`);
                    }}
                  >
                    <IconButton
                      icon="arrow-right"
                      iconColor="#f8c700"
                      size={20}
                      style={{
                        backgroundColor: "#2b2b2b",
                        marginRight: 10,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
