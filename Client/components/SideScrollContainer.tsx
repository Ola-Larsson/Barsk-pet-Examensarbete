import { ScrollView, View } from "react-native";

type Props = {
  header?: React.ReactNode;
  children?: any;
  drinks?: any;
};

export default function SideScrollContainer({ header, children, drinks }: Props) {
  if (children?.length == 0) return null;
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
