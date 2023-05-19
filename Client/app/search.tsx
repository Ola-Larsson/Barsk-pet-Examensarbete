import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { useApi } from "./hooks/useApi";

export default function Search() {
  const [query, setQuery] = useState("");
  const api = useApi("/search", false);
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1b1c1d",
      }}
    >
      <TextInput
        onChangeText={(text) => setQuery(text)}
        value={query}
        placeholder="Search for a drink"
        placeholderTextColor="#a0a0a0"
        style={{
          backgroundColor: "#2b2b2b",
          color: "white",
          padding: 10,
          borderRadius: 5,
          margin: 15,
          marginBottom: 0,
        }}
      />
      <Button
        onPress={() => api.execute("GET", {}, "?query=" + query)}
        style={{
          backgroundColor: "#f8c700",
          borderRadius: 5,
          margin: 15,
          marginBottom: 20,
        }}
        labelStyle={{
          color: "#1b1c1d",
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        Search
      </Button>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#1e1e1e",
          padding: 15,
        }}
      >
        {api.value?.map((result: any) => {
          return (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
              key={result.id}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                {result.imageUrl == null ? (
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      marginRight: 10,
                      backgroundColor: "#2b2b2b",
                    }}
                  >
                    <Text
                      style={{
                        color: "#a0a0a0",
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center",
                        lineHeight: 50,
                      }}
                    >
                      {result.name
                        .split(" ")
                        .map((word: string) => word[0])
                        .join("")}
                    </Text>
                  </View>
                ) : (
                  <Image
                    source={{ uri: result.imageUrl }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      marginRight: 10,
                    }}
                  />
                )}
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
                    {result.name}
                  </Text>
                  <Text
                    style={{
                      color: "#a0a0a0",
                      fontSize: 14,
                    }}
                  >
                    {result.type}
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
                      result.type == "Drink"
                        ? router.push("/" + result.id)
                        : router.push("user/" + result.id);
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
          );
        })}
      </ScrollView>
    </View>
  );
}
