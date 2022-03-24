import { FC, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";

import Btn from "./btn";

interface Props {
  item: {
    image: any;
    title: string;
    description: string;
  };
  navigation: {
    navigate: (name: string) => void;
  };
}

const Slide: FC<Props> = ({ item, navigation }): JSX.Element => {
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
        onLoadEnd={() => setLoading(false)}
      />
      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <Btn
          text={item.title === "Patients" ? "Scan" : "Login"}
          onPress={() =>
            navigation.navigate(item.title === "Patients" ? "Upload" : "Login")
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
  },
  title: {
    fontFamily: "Nunito-Bold",
    fontSize: 25,
    marginBottom: 10,
    color: "#034C81",
    textAlign: "center",
  },
  description: {
    fontFamily: "Nunito-Regular",
    fontSize: 15,
    color: "#9A8B8B",
    textAlign: "center",
    paddingHorizontal: 64,
  },
});

export default Slide;
