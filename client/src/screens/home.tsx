import { FC, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";

import Context from "../utils/context";

interface Props {
  navigation: {
    navigate: (name: string) => void;
  };
}

const Home: FC<Props> = ({ navigation }): JSX.Element => {
  const { setUser, userData, setUserData } = useContext(Context);

  return (
    <View style={styles.backgroundColor}>
      <View style={styles.blueBackground1} />
      <View style={styles.whiteBackground} />
      <View style={styles.blueBackground2} />
      <View style={styles.container}>
        <View style={styles.buttonHeader}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              setUser(false);
              setUserData(undefined);
            }}
          >
            <MaterialIcons name="logout" size={30} color="#034C81" />
          </TouchableOpacity>
        </View>
        <View style={styles.introductionContainer}>
          <Text style={styles.largeHeaderText}>Good Morning,</Text>
          <Text style={styles.smallHeaderText}>
            Dr. {userData.doctor.firstName + " " + userData.doctor.lastName}
          </Text>
        </View>
        <View style={styles.statisticsContainer}>
          <View style={styles.card}>
            <View style={styles.cardBackground}>
              <View style={styles.cardIcons}>
                <Ionicons name="people-outline" size={40} color="#FFFFFF" />
              </View>
              <Text style={styles.cardNumberText}>2</Text>
              <Text style={styles.cardLabelText}>Total Patients</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardBackground}>
              <View style={styles.cardIcons}>
                <Feather name="briefcase" size={40} color="#FFFFFF" />
              </View>
              <Text style={styles.cardNumberText}>2</Text>
              <Text style={styles.cardLabelText}>Total Cases</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardBackground}>
              <View style={styles.cardIcons}>
                <Ionicons name="newspaper-outline" size={40} color="#FFFFFF" />
              </View>
              <Text style={styles.cardNumberText}>1</Text>
              <Text style={styles.cardLabelText}>Serious Moles</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.largeButtonContainer}
          onPress={() => navigation.navigate("Past Scans")}
        >
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <View style={styles.largeButtonContainerIcon}>
              <Ionicons name="newspaper-outline" size={40} color="#034C81" />
            </View>
            <Text style={styles.largeButtonContainerHeaderText}>
              View All Cases
            </Text>
            <Text style={styles.largeButtonContainerSmallText}>
              View all your patients past cases
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.patientCardBackground}>
          <Image
            source={{ uri: userData.results[0].imageUri }}
            style={[styles.image]}
          />
          <View style={{ marginLeft: -10 }}>
            <Text
              style={{
                fontFamily: "Nunito-Bold",
                fontSize: 20,
                color: "#35C5CF",
              }}
            >
              Patient {userData.results[0].patientName}
            </Text>
            <Text
              style={{
                fontFamily: "Nunito-Regular",
                fontSize: 15,
                color: "#9A8B8B",
              }}
            >
              {userData.results[0].result ? "Melanoma" : "Not Melanoma"}
            </Text>
            <Text
              style={{
                fontFamily: "Nunito-Regular",
                fontSize: 15,
                color: "#9A8B8B",
              }}
            >
              {userData.results[0].date}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    margin: 30,
    marginTop: 60,
  },
  buttonHeader: {
    height: 50,
  },
  buttonContainer: {
    backgroundColor: "#FFFFFF",
    width: 50,
    height: 50,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  backgroundColor: {
    backgroundColor: "white",
  },
  introductionContainer: {
    marginTop: 20,
    height: 125,
  },
  largeHeaderText: {
    fontFamily: "Nunito-Bold",
    fontSize: 35,
    color: "#034C81",
  },
  smallHeaderText: {
    fontFamily: "Nunito-Light",
    fontSize: 35,
  },
  statisticsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    height: 235,
    flexWrap: "wrap",
    marginTop: -10,
  },
  card: {
    width: 110,
    padding: 8,
  },
  cardBackground: {
    backgroundColor: "#35C5CF",
    height: 225,
    flexDirection: "column",
    flexWrap: "wrap",
    borderRadius: 75,
    alignContent: "center",
    alignItems: "center",
  },
  cardIcons: {
    backgroundColor: "rgba(229,229,229,0.63)",
    borderRadius: 100,
    padding: 8,
    alignItems: "center",
    marginTop: 20,
  },
  cardNumberText: {
    marginTop: 10,
    fontFamily: "Nunito-Bold",
    fontSize: 30,
    color: "white",
  },
  cardLabelText: {
    marginTop: 10,
    fontFamily: "Nunito-Light",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  largeButtonContainer: {
    backgroundColor: "#034C81",
    height: 120,
    marginTop: Dimensions.get("window").height / 25,
    borderRadius: 17,
  },
  largeButtonContainerIcon: {
    backgroundColor: "white",
    borderRadius: 100,
    padding: 8,
    margin: 15,
  },
  largeButtonContainerHeaderText: {
    fontFamily: "Nunito-Bold",
    fontSize: 25,
    color: "#FFFFFF",
    marginTop: 25,
    marginLeft: -5,
  },
  largeButtonContainerSmallText: {
    fontFamily: "Nunito-Light",
    fontSize: 15,
    color: "#FFFFFF",
    marginLeft: 20,
    marginTop: -7,
  },
  blueBackground1: {
    position: "absolute",
    height: Dimensions.get("window").height / 2.3,
    width: Dimensions.get("window").width,
    backgroundColor: "#D8EFF5",
    borderRadius: 20,
    zIndex: -1,
  },
  whiteBackground: {
    position: "absolute",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    zIndex: -2,
  },
  blueBackground2: {
    position: "absolute",
    marginTop: Dimensions.get("window").height / 1.3,
    height: Dimensions.get("window").height / 2,
    width: Dimensions.get("window").width,
    backgroundColor: "#D8EFF5",
    borderRadius: 20,
    zIndex: -1,
  },
  patientCardBackground: {
    height: 125,
    backgroundColor: "white",
    marginTop: Dimensions.get("window").height / 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 100,
    margin: 25,
    marginLeft: 20,
    borderWidth: 3,
    borderColor: "#35C5CF",
  },
});

export default Home;
