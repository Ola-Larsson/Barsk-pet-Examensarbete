import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";

type Props = {
  id: string;
  rating: number;
  ratingCount: number;
  currentUserRating: number;
  api: any;
};

const ratingStars = [1, 2, 3, 4, 5];
const ratingButton = (number: number, api: any, rating: number, auth: boolean) => {
  return (
    <IconButton
      icon={number <= rating ? "star" : "star-outline"}
      iconColor={"#f8c700"}
      onPress={() => {
        api.execute("POST", number);
      }}
      disabled={!auth}
      style={{ margin: 0, padding: 0, width: 25, height: 25 }}
      key={number}
    />
  );
};

export default function Rating({ id, rating, ratingCount, currentUserRating, api }: Props) {
  const auth = useAuth();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      {ratingStars.map((number) => ratingButton(number, api, rating, !!auth.auth?.token))}
    </View>
  );
}
