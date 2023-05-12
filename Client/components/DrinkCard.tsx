import { useRouter } from "expo-router";
import { Card, Surface, Text } from "react-native-paper";

type Props = {
  drink: {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    ingredients: { name: string; amount: string }[];
    tags: { name: string }[];
    instructions: string;
  };
};

export default function DrinkCard({ drink }: Props) {
  const router = useRouter();

  return (
    <Surface
      style={{
        backgroundColor: "transparent",
        borderRadius: 10,
        width: 120,
        marginRight: 10,
      }}
    >
      <Card
        style={{
          backgroundColor: "#2b2b2b",
          width: 120,
          height: 120,
          borderRadius: 0,
        }}
        onPress={() => {
          router.push(`/${drink.id}`);
        }}
      >
        <Card.Cover
          source={{ uri: drink.imageUrl }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 0,
            backgroundColor: "transparent",
          }}
        />
      </Card>
      <Text
        style={{
          color: "#fff",
        }}
      >
        {drink.name}
      </Text>
      <Text
        style={{
          color: "#aaa",
          flex: 1,
        }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {drink.tags.map((tag) => tag.name).join(", ")}
      </Text>
    </Surface>
  );
}
