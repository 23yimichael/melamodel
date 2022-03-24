import React, { FC, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { Entypo } from "@expo/vector-icons";

import Context from "../utils/context";
import Scan from "../components/scan";

interface Props {
  navigation: {
    goBack: () => void;
  };
}

const PastScans: FC<Props> = ({ navigation }): JSX.Element => {
  const { userData } = useContext(Context);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-left" size={25} />
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
            All Cases
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <FlatList
          style={{ paddingBottom: 25 }}
          data={userData.results}
          renderItem={({ item }) => (
            <Scan item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
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
  },
});

export default PastScans;
