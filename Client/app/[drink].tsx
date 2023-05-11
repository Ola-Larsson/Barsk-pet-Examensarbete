import { Stack, usePathname } from "expo-router";
import React from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
import { useApi } from "./hooks/useApi";

export default function Details() {
  const pathName = usePathname().split("/")[1];
  const auth = useAuth();
  const api = useApi("/drinks/" + pathName, true, auth.auth?.token);
  const favoriteApi = useApi("/favorites/" + pathName, false, auth.auth?.token);
  const ratingApi = useApi("/ratings/" + pathName, false, auth.auth?.token);

  React.useEffect(() => {
    if (favoriteApi.status == "success") {
      api.execute();
    }
  }, [favoriteApi.status]);

  React.useEffect(() => {
    if (ratingApi.status == "success") {
      api.execute();
    }
  }, [ratingApi.status]);

  console.log(api.value);

  return (
    <View
      style={{
        backgroundColor: "#1b1c1d",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <Stack.Screen options={{ title: api.value?.name }} />
      <ScrollView
        style={{
          flex: 1,
          width: "100%",
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
        <Card
          style={{
            backgroundColor: "transparent",
            width: "100%",
            height: 300,
            flex: 1,
          }}
        >
          <Card.Cover
            source={{ uri: api.value?.imageUrl }}
            style={{
              width: "100%",
              height: 300,
              backgroundColor: "transparent",
            }}
            borderRadius={0}
          />
          <IconButton
            icon={api.value?.isFavorite ? "heart" : "heart-outline"}
            iconColor={api.value?.isFavorite ? "#f8c700" : "#fff"}
            size={30}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "transparent",
            }}
            onPress={() => {
              api.value?.isFavorite ? favoriteApi.execute("DELETE") : favoriteApi.execute("POST");
            }}
          />
        </Card>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 24,
              fontWeight: "bold",
              marginRight: 2,
            }}
          >
            {api.value?.name}
          </Text>
          <Text
            style={{
              color: "#aaa",
              fontSize: 24,
            }}
          >
            Rating: {api.value?.rating} / 5
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: "#aaa",
              fontSize: 16,
            }}
          >
            {api.value?.description}
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 24,
              fontWeight: "bold",
              marginTop: 20,
            }}
          >
            Ingredients
          </Text>
          {api.value?.ingredients?.map((ingredient: { name: string; amount: string }) => (
            <Text
              key={ingredient.name}
              style={{
                color: "#aaa",
                fontSize: 16,
              }}
            >
              {ingredient.name} - {ingredient.amount}
            </Text>
          ))}
          <Text
            style={{
              color: "#fff",
              fontSize: 24,
              fontWeight: "bold",
              marginTop: 20,
            }}
          >
            Instructions
          </Text>
          <Text
            style={{
              color: "#aaa",
              fontSize: 16,
            }}
          >
            {api.value?.instructions}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
