import { View } from "react-native";
import { Text } from "react-native-paper";

type TopTabsProps = {
  selected: "favorites" | "my-drinks" | "profile";
  setTab: (tab: "favorites" | "my-drinks" | "profile") => void;
};
export default function TopTabs({ selected, setTab }: TopTabsProps) {
  return (
    <View
      style={{
        backgroundColor: "#2b2b2b",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <Text
        style={{
          color: selected === "favorites" ? "#f8c700" : "#aaa",
          fontSize: 12,
          fontWeight: "bold",
          marginBottom: 15,
          paddingHorizontal: 10,
        }}
        onPress={() => setTab("favorites")}
      >
        Favorites
      </Text>
      <Text
        style={{
          color: selected === "my-drinks" ? "#f8c700" : "#aaa",
          fontSize: 12,
          fontWeight: "bold",
          marginBottom: 15,
          paddingHorizontal: 10,
        }}
        onPress={() => setTab("my-drinks")}
      >
        My Drinks
      </Text>
      <Text
        style={{
          color: selected === "profile" ? "#f8c700" : "#aaa",
          fontSize: 12,
          fontWeight: "bold",
          marginBottom: 15,
          paddingHorizontal: 10,
        }}
        onPress={() => setTab("profile")}
      >
        Profile
      </Text>
    </View>
  );
}
