import { FC, useContext, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useHeaderHeight } from "@react-navigation/elements";
import Constants from "expo-constants";
import { Entypo } from "@expo/vector-icons";

import { doctorLogin } from "../functions/helpers";
import Context from "../utils/context";
import Btn from "../components/btn";

interface Props {
  navigation: {
    goBack: () => void;
    navigate: (name: string) => void;
  };
}

const Login: FC<Props> = ({ navigation }): JSX.Element => {
  const { setUser, setLoaded, setUserData } = useContext(Context);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-left" size={25} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: "center",
          marginTop: Dimensions.get("window").height / 20,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            height: 75,
            width: 75,
            borderRadius: 15,
          }}
        >
          <Image
            source={require("../assets/images/logo.png")}
            style={{
              height: 75,
              width: 75,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: Dimensions.get("window").height / 50,
          }}
        >
          <Text
            style={{
              fontFamily: "Nunito-Bold",
              fontSize: 36,
              color: "#034C81",
            }}
          >
            Mela
          </Text>
          <Text
            style={{
              fontFamily: "Nunito-Bold",
              fontSize: 36,
              color: "turquoise",
            }}
          >
            Model
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text
          style={{
            fontFamily: "Nunito-SemiBold",
            fontSize: 28,
            color: "#034C81",
          }}
        >
          Welcome Back
        </Text>
        <Text
          style={{
            fontFamily: "Nunito-Regular",
            fontSize: 16,
            color: "grey",
          }}
        >
          Hello there, sign in to continue...
        </Text>
        <Text
          style={{
            fontFamily: "Nunito-Light",
            fontSize: 16,
            color: "lightgrey",
            marginTop: Dimensions.get("window").height / 50,
          }}
        >
          Username
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />
        <Text
          style={{
            fontFamily: "Nunito-Light",
            fontSize: 16,
            color: "lightgrey",
            marginTop: Dimensions.get("window").height / 75,
          }}
        >
          Password
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Btn
          text="Sign in"
          onPress={() => {
            doctorLogin(
              {
                apiPass: "pennapps-Wafjv7EaefPD6H33",
                username,
                pass: password,
              },
              (err, data) => {
                if (err) console.error(err);
                else {
                  setUserData(data);
                  setUser(true);
                  setLoaded(true);
                }
              }
            );
          }}
        />
        <Text
          style={{
            textAlign: "center",
            marginTop: Dimensions.get("window").height / 10,
            fontFamily: "Nunito-Light",
            fontSize: 16,
            color: "grey",
          }}
        >
          Don't have an account? Contact your medical provider.
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8EFF5",
    paddingTop:
      Constants.statusBarHeight + Dimensions.get("window").height / 25,
  },

  header: {
    marginHorizontal: Dimensions.get("window").width / 15,
    flexDirection: "row",
  },

  icon: {
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
    flexGrow: 1,
    marginTop: Dimensions.get("window").height / 15,
    backgroundColor: "white",
    borderTopLeftRadius: 37.5,
    borderTopRightRadius: 37.5,
    paddingHorizontal: Dimensions.get("window").width / 10,
    paddingTop: Dimensions.get("window").height / 20,
    paddingBottom: Dimensions.get("window").height,
  },

  input: {
    backgroundColor: "#e5e5e5",
    padding: 15,
    borderRadius: 10,
    marginTop: Dimensions.get("window").height / 75,
  },
});

export default Login;
