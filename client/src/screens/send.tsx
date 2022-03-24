import { FC, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import Constants from "expo-constants";

import Btn from "../components/btn";
import { sendPatientResults } from "../functions/helpers";

interface Props {
  navigation: {
    navigate: (name: string) => void;
    goBack: () => void;
  };
  route: {
    params: {
      patientName: string;
      imageUri: string;
      result: string;
      date: string;
    };
  };
}

const Send: FC<Props> = ({ navigation, route }): JSX.Element => {
  const { width } = useWindowDimensions();
  const { patientName, imageUri, result, date } = route.params;
  const [id, setId] = useState<string | undefined>(undefined);

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
        source={require("../assets/images/send.jpg")}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
      <View style={{ flex: 0.6 }}>
        <Text style={styles.title}>Enter Patient ID</Text>
        <Text style={styles.description}>
          To send the results to a doctor, please enter your patient ID
        </Text>
        <TextInput
          value={id}
          onChangeText={setId}
          style={{
            backgroundColor: "#e5e5e5",
            marginHorizontal: Dimensions.get("window").width / 15,
            marginTop: Dimensions.get("window").height / 37.5,
            padding: 10,
            borderRadius: 5,
          }}
        />
        <Btn
          text="Send"
          onPress={() => {
            sendPatientResults(
              {
                apiPass: "pennapps-Wafjv7EaefPD6H33",
                patientName,
                patientId: id,
                imageUri,
                result,
                date,
              },
              (err, data) => {
                if (err) console.error(data);
                else {
                  Alert.alert(
                    "Success!",
                    "Your scan has been sent to your doctor."
                  );
                }
              }
            );
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
    flex: 0.4,
    marginTop: Dimensions.get("window").height / 25,
    justifyContent: "center",
  },
  title: {
    marginTop: Dimensions.get("window").height / 50,
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

export default Send;
