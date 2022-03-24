import { FC } from "react";
import { StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";

interface Props {
  text: string;
  onPress: () => void;
}

const Btn: FC<Props> = ({ text, onPress }): JSX.Element => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#034C81",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: Dimensions.get("window").width / 15,
    marginTop: Dimensions.get("window").width / 15,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  text: {
    fontFamily: "Nunito-Regular",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});

export default Btn;
