import { FC } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  Dimensions,
} from "react-native";

interface Props {
  item: {
    id: number;
    patientName: string;
    result: string;
    date: string;
    imageUri: string;
  };
  navigation: {
    navigate: (
      name: string,
      params: {
        item: object;
      }
    ) => void;
  };
}
const Scan: FC<Props> = ({ item, navigation }): JSX.Element => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("View Scan", {
          item: item,
        })
      }
    >
      <Image source={{ uri: item.imageUri }} style={styles.image} />
      <View style={{ marginLeft: 15 }}>
        <Text
          style={{ fontFamily: "Nunito-Bold", fontSize: 20, color: "#35C5CF" }}
        >
          Patient {item.patientName}
        </Text>
        <Text
          style={{
            fontFamily: "Nunito-Regular",
            fontSize: 15,
            color: "#9A8B8B",
          }}
        >
          {item.result ? "Melanoma" : "Not Melanoma"}
        </Text>
        <Text
          style={{
            fontFamily: "Nunito-Regular",
            fontSize: 15,
            color: "#9A8B8B",
          }}
        >
          {item.date}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D8EFF5",
    padding: 25,
    marginTop: Dimensions.get("window").height / 25,
    borderRadius: 15,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  image: {
    width: 75,
    height: 75,
    borderRadius: 100,
    marginLeft: -5,
    borderWidth: 3,
    borderColor: "#35C5CF",
  },
});

export default Scan;
