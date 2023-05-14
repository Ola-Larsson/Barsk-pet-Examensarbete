import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import DrinkCard from "../components/DrinkCard";
import SideScrollContainer from "../components/SideScrollContainer";
import { useAuth } from "../contexts/AuthContext";
import { getAuthFromStore } from "../helpers/secureStore";
import { useApi } from "./hooks/useApi";

type Drink = {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  ingredients: { name: string; amount: string }[];
  tags: { name: string }[];
  instructions: string;
};

// export const drinks = [
//   {
//     id: "1",
//     name: "Mojito",
//     description: "A refreshing Cuban highball",
//     ingredients: ["White rum", "Lime juice", "Sugar", "Mint leaves", "Soda water"],
//     tags: ["ContemporaryClassic", "Alcoholic", "Refreshing"],
//     instructions:
//       "Muddle mint leaves with sugar and lime juice. Add a splash of soda water and fill the glass with cracked ice. Pour the rum and top with soda water. Garnish and serve with straw.",
//     image: "https://www.thecocktaildb.com/images/media/drink/3z6xdi1589574603.jpg",
//   },
//   {
//     id: "2",
//     name: "Old Fashioned",
//     description: "A classic cocktail made with whiskey",
//     ingredients: ["Bourbon", "Angostura bitters", "Sugar", "Water"],
//     tags: ["Classic", "Alcoholic"],
//     instructions:
//       "In an old-fashioned glass, place a sugar cube then saturate with bitters and add a dash of plain water. Muddle until dissolved. Fill the glass with ice cubes and add whiskey. Garnish with orange slice, and a cocktail cherry.",
//     image: "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg",
//   },
//   {
//     id: "3",
//     name: "Margarita",
//     description: "A Mexican cocktail consisting of tequila, triple sec, and lime juice",
//     ingredients: ["Tequila", "Triple sec", "Lime juice", "Salt"],
//     tags: ["ContemporaryClassic", "Alcoholic", "Refreshing"],
//     instructions:
//       "Rub the rim of the glass with the lime slice to make the salt stick to it. Shake the other ingredients with ice, then carefully pour into the glass (taking care not to dislodge any salt). Garnish and serve over ice.",
//     image: "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
//   },
//   {
//     id: "4",
//     name: "Moscow Mule",
//     description: "A cocktail made with vodka, spicy ginger beer, and lime juice",
//     ingredients: ["Vodka", "Lime juice", "Ginger beer"],
//     tags: ["ContemporaryClassic", "Alcoholic", "Refreshing"],
//     instructions:
//       "Combine vodka and ginger beer in a highball glass filled with ice. Add lime juice. Stir gently. Garnish.",
//     image: "https://www.thecocktaildb.com/images/media/drink/3pylqc1504370988.jpg",
//   },
// ];

// const randomOrderDrinks = (drinks: Drink[]) => {
//   return [...drinks].sort(() => Math.random() - 0.5);
// };

export default function Home() {
  const [favorites, setFavorites] = React.useState<Drink[]>();
  const [popular, setPopular] = React.useState<Drink[]>();
  const [newDrinks, setNewDrinks] = React.useState<Drink[]>();

  const auth = useAuth();
  const api = useApi("/drinks", true, auth.auth?.token);

  useEffect(() => {
    const getTokenAsync = async () => {
      const token = await getAuthFromStore();
      if (token) {
        if (new Date(token.expiration).getTime() < Date.now()) {
          auth.signOut();
          return;
        }

        auth.signIn(token);
      }
    };
    getTokenAsync();
  }, []);

  useEffect(() => {
    if (api.status == "success") {
      setFavorites(api.value);
      setNewDrinks(api.value);
      setPopular(api.value);
    }
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1b1c1d",
      }}
    >
      <Stack.Screen
        options={{
          title: "Home",
        }}
      />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#1b1c1d",
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
        <View
          style={{
            padding: 15,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#fff",
              marginBottom: 30,
            }}
          >
            Hello{" "}
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#f8c700",
                marginBottom: 30,
              }}
            >
              {auth.auth?.user.username}!
            </Text>
          </Text>
        </View>
        <SideScrollContainer
          header={
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#fff",
                marginLeft: 15,
              }}
            >
              Favorites
            </Text>
          }
        >
          {favorites?.map((drink) => (
            <DrinkCard key={drink.id} drink={drink} />
          ))}
        </SideScrollContainer>
        <SideScrollContainer
          header={
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#fff",
                marginLeft: 15,
              }}
            >
              New Drinks
            </Text>
          }
        >
          {newDrinks?.map((drink) => (
            <DrinkCard key={drink.id} drink={drink} />
          ))}
        </SideScrollContainer>
        <SideScrollContainer
          header={
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#fff",
                marginLeft: 15,
              }}
            >
              Popular
            </Text>
          }
        >
          {popular?.map((drink) => (
            <DrinkCard key={drink.id} drink={drink} />
          ))}
        </SideScrollContainer>
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}
