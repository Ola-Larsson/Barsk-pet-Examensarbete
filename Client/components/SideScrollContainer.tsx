import { ScrollView, View } from "react-native";

type Props = {
  header?: React.ReactNode;
  children: React.ReactNode;
};

export default function SideScrollContainer({ header, children }: Props) {
  return (
    <View
      style={{
        marginBottom: 18,
      }}
    >
      {header}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: "transparent",
          display: "flex",
          overflow: "visible",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            padding: 15,
          }}
        >
          {children}
        </View>
      </ScrollView>
    </View>
  );
}
