import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyAddsScreen from "../screens/MyAdds";
import DetailScreen from "../screens/Detail";

const Stack = createNativeStackNavigator();

const MyAddsRouter = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyAdds"
        component={MyAddsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default MyAddsRouter;
