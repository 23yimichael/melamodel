import { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Landing from "../screens/landing";
import Login from "../screens/login";
import Upload from "../screens/upload";
import Results from "../screens/results";
import Send from "../screens/send";

const Stack = createStackNavigator();

const Stacks: FC = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Upload" component={Upload} />
        <Stack.Screen name="Results" component={Results} />
        <Stack.Screen name="Send" component={Send} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacks;
