import { FC } from "react";
import { StyleSheet, View, Animated, useWindowDimensions } from "react-native";

interface Props {
  data: [
    {
      id: number;
      title: string;
      description: string;
      image: any;
    }
  ];
  scrollX: any;
}

const SlideIndicator: FC<Props> = ({ data, scrollX }): JSX.Element => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ flexDirection: "row", height: 64 }}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#034C81",
    marginHorizontal: 8,
  },
});

export default SlideIndicator;
