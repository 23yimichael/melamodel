import { FC } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { Entypo } from "@expo/vector-icons";

interface Props {
  navigation: {
    goBack: () => void;
  };
  route: {
    params: {
      item: {
        id: number;
        patientName: string;
        result: string;
        date: string;
        imageUri: string;
      };
    };
  };
}

const ViewScan: FC<Props> = ({ navigation, route }): JSX.Element => {
  const { id, patientName, result, date, imageUri } = route.params.item;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-left" size={25} style={{ color: "#034C81" }} />
        </TouchableOpacity>
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Nunito-Bold",
              fontSize: 25,
              color: "#034C81",
            }}
          >
            View Scan
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.box}>
          <Text
            style={{
              fontFamily: "Nunito-Bold",
              fontSize: 25,
              color: "#034C81",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Results
          </Text>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "Nunito-Bold",
                fontSize: 16,
                color: "#034C81",
                marginLeft: 45,
                marginTop: 10,
              }}
            >
              Name:{" "}
            </Text>

            <Text
              style={{
                fontFamily: "Nunito-Regular",
                fontSize: 16,
                color: "grey",
                marginTop: 10,
              }}
            >
              {patientName}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Nunito-Bold",
                fontSize: 16,
                color: "#034C81",
                marginLeft: 45,
              }}
            >
              Result:{" "}
            </Text>

            <Text
              style={{
                fontFamily: "Nunito-Regular",
                fontSize: 16,
                color: "grey",
              }}
            >
              {result ? "Melanoma" : "Not Melanoma"}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Nunito-Bold",
                fontSize: 16,
                color: "#034C81",
                marginLeft: 45,
              }}
            >
              Date:{" "}
            </Text>

            <Text
              style={{
                fontFamily: "Nunito-Regular",
                fontSize: 16,
                color: "grey",
              }}
            >
              {date}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "Nunito-Bold",
              fontSize: 16,
              color: "#034C81",
              marginLeft: 45,
            }}
          >
            Information:{" "}
          </Text>

          <Text
            style={{
              fontFamily: "Nunito-Regular",
              fontSize: 16,
              color: "grey",
              marginRight: 45,
              marginLeft: 45,
            }}
          >
            {result
              ? "Our AI predicts that your mole is likely melanoma. Seek consultation from a professional immediately."
              : "Our AI predicts that your mole is likely benign. There is nothing to be stressed about."}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:
      Constants.statusBarHeight + Dimensions.get("window").height / 25,
    backgroundColor: "white",
  },

  header: {
    marginHorizontal: Dimensions.get("window").width / 15,
    flexDirection: "row",
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
  body: {
    marginHorizontal: Dimensions.get("window").width / 15,
    marginTop: 100,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  box: {
    backgroundColor: "#D8EFF5",
    borderRadius: 20,
    paddingBottom: 25,
  },
  image: {
    marginTop: Dimensions.get("window").height / 50,
    width: 250,
    height: 180,
    alignSelf: "center",
    borderRadius: 10,
  },
});

export default ViewScan;
