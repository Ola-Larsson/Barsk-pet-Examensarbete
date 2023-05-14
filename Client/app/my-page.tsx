import { useState } from "react";
import { View } from "react-native";
import MyDrinks from "../components/my-page/MyDrinks";
import MyFavorites from "../components/my-page/MyFavorites";
import Profile from "../components/my-page/Profile";
import TopTabs from "../components/my-page/TopTabs";

export default function myPage() {
  const [selected, setSelected] = useState<"favorites" | "my-drinks" | "profile">("my-drinks");

  const renderTab = () => {
    switch (selected) {
      case "favorites":
        return <MyFavorites />;
      case "my-drinks":
        return <MyDrinks />;
      case "profile":
        return <Profile />;
      default:
        return <MyDrinks />;
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#1b1c1d",
        flex: 1,
      }}
    >
      <TopTabs selected={selected} setTab={setSelected} />
      {renderTab()}
    </View>
  );
}
