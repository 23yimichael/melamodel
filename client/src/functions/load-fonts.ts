import { useFonts } from "expo-font";

export const loadFonts = (): any => {
  return useFonts({
    "Nunito-Light": require("../assets/fonts/Nunito-Light.ttf"),
    "Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf"),
    "Nunito-Medium": require("../assets/fonts/Nunito-Medium.ttf"),
    "Nunito-SemiBold": require("../assets/fonts/Nunito-SemiBold.ttf"),
    "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
  });
};
