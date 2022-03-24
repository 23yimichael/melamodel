import { FC, useState } from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import Context from "./utils/context";

import { loadFonts } from "./functions/load-fonts";
import HomeStack from "./components/home-stack";
import Stacks from "./components/stacks";

const App: FC = (): JSX.Element => {
  let [fontsLoaded] = loadFonts();
  const [user, setUser] = useState<boolean>(false);
  const [userData, setUserData] = useState<any | undefined>(undefined);
  const [loaded, setLoaded] = useState<boolean>(true);

  if (!fontsLoaded || !loaded) {
    return (
      <ActivityIndicator
        color="#034C81"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        userData,
        setUserData,
        loaded,
        setLoaded,
      }}
    >
      <StatusBar style="dark" />
      {user ? <HomeStack /> : <Stacks />}
    </Context.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
