import { FC, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";

import Btn from "../components/btn";

interface Props {
  navigation: {
    navigate: (
      name: string,
      params?: {
        image: object;
      }
    ) => void;
    goBack: () => void;
  };
}

const Upload: FC<Props> = ({ navigation }): JSX.Element => {
  const { width } = useWindowDimensions();
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      navigation.navigate("Results", {
        image: result,
      });
    }
  };

  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-left" size={25} style={{ color: "#034C81" }} />
        </TouchableOpacity>
      </View>
      <Image
        source={require("../assets/images/upload.jpg")}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
      <View style={{ flex: 0.5 }}>
        <Text style={styles.title}>Upload Image</Text>
        <Text style={styles.description}>
          Please upload an image of your skin mole. Ensure that your picture is
          clear for an accurate result.
        </Text>

        <Btn text="Upload Image" onPress={pickImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingTop:
      Constants.statusBarHeight + Dimensions.get("window").height / 25,
    marginHorizontal: Dimensions.get("window").width / 15,
  },
  icon: {
    backgroundColor: "#D8EFF5",
    padding: 5,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  image: {
    flex: 0.5,
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

export default Upload;
