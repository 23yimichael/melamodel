import { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/home";
import PastScans from "../screens/past-scans";
import ViewScan from "../screens/view-scan";

const Stack = createStackNavigator();

const HomeStack: FC = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Past Scans" component={PastScans} />
        <Stack.Screen name="View Scan" component={ViewScan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeStack;
