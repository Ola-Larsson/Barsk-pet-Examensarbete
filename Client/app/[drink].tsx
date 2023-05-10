import { Stack, usePathname, useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { drinks } from "./index";

export default function Details() {
  const router = useRouter();
  const pathName = usePathname();
  const drink = drinks.find((drink) => drink.id === pathName.split("/")[1]);

  return (
    <View
      style={{
        backgroundColor: "#1b1c1d",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <Stack.Screen options={{ title: drink?.name }} />
      <ScrollView
        style={{
          flex: 1,
          width: "100%",
        }}
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
            source={{ uri: drink?.image }}
            style={{
              width: "100%",
              height: 300,
              backgroundColor: "transparent",
            }}
            borderRadius={0}
          />
        </Card>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
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
            {drink?.name}
          </Text>
          <Text
            style={{
              color: "#aaa",
              fontSize: 24,
            }}
          >
            RATING HERE
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
            {drink?.description}
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
          {drink?.ingredients.map((ingredient) => (
            <Text
              key={ingredient}
              style={{
                color: "#aaa",
                fontSize: 16,
              }}
            >
              {ingredient}
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
            {drink?.instructions}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
