import { FC, useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants";
import { format } from "date-fns";

import Context from "../utils/context";
import { process } from "../functions/tf";
import Btn from "../components/btn";

interface Props {
  navigation: {
    navigate: (
      name: string,
      params?: {
        patientName: string;
        imageUri: string;
        result: string;
        date: string;
      }
    ) => void;
    goBack: () => void;
  };
  route: {
    params: {
      image: {
        uri: string;
      };
    };
  };
}

const Results: FC<Props> = ({ navigation, route }): JSX.Element => {
  const { width } = useWindowDimensions();
  const { image } = route.params;
  const { result } = useContext(Context);
  const [diagnosis, setDiagnosis] = useState<string | undefined>(undefined);
  const [processing, setProcessing] = useState<boolean>(true);
  const d = format(new Date(), "MM/d/y p");

  useEffect(() => {
    process(image, setDiagnosis, setProcessing);
  }, []);

  if (processing) {
    return (
      <View style={[styles.container, { width }]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigation.navigate("Landing")}
          >
            <Feather name="home" size={30} style={{ color: "#034C81" }} />
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.headerText}>
            {processing ? "Loading..." : "Success"}
          </Text>
          <Image
            source={{
              uri: image.uri,
            }}
            style={[styles.placeHolderImage]}
          />
          <ActivityIndicator
            color="#034C81"
            style={{
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
              marginTop: Dimensions.get("window").height / 50,
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.navigate("Landing")}
        >
          <Feather name="home" size={30} style={{ color: "#034C81" }} />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.headerText}>
          {processing ? "Loading..." : "Success"}
        </Text>
        <Image
          source={{
            uri: image.uri,
          }}
          style={[styles.placeHolderImage]}
        />
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 25 }}>
          <Text style={styles.dataLabel}>Result:</Text>
          <Text style={styles.data}>{diagnosis}</Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={styles.dataLabel}>Date:</Text>
          <Text style={styles.data}>{" " + d}</Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={styles.dataLabel}>Information:</Text>
          <Text style={styles.dataLarge}>
            {result
              ? "Our AI predicts that your mole is likely melanoma. Seek consultation from a professional immediately."
              : "Our AI predicts that your mole is likely benign. There is nothing to be stressed about."}
          </Text>
        </View>
        <Btn
          text="Send To Doctor"
          onPress={() => {
            navigation.navigate("Send", {
              patientName: "Michael Yi",
              imageUri: image.uri,
              result,
              date: d,
            });
          }}
        />
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
  cardContainer: {
    backgroundColor: "#D8EFF5",
    borderRadius: 18,
    marginLeft: 30,
    marginRight: 30,
    marginTop: Constants.statusBarHeight + Dimensions.get("window").height / 21,
    paddingBottom: 20,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  headerText: {
    fontFamily: "Nunito-Bold",
    fontSize: 30,
    color: "#034C81",
    textAlign: "center",
    marginTop: 20,
  },
  placeHolderImage: {
    width: 250,
    height: 180,
    marginTop: 15,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    borderRadius: 10,
  },
  dataLabel: {
    marginLeft: 40,
    fontFamily: "Nunito-Bold",
    fontSize: 16,
    color: "#034C81",
  },
  data: {
    fontFamily: "Nunito-Light",
    fontSize: 16,
    color: "#9A8B8B",
  },
  dataLarge: {
    marginLeft: 40,
    fontFamily: "Nunito-Light",
    fontSize: 16,
    color: "#9A8B8B",
    marginRight: 40,
  },
});

export default Results;
