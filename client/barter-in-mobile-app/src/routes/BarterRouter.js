import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";
import BarterRoomScreen from "../screens/BarterRoom";
import ChatRoomScreen from "../screens/ChatRoom";
import DetailScreen from "../screens/Detail";
import COLORS from "../constants/Colors";

const Stack = createNativeStackNavigator();

const BarterRouter = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BarterRoom"
        component={BarterRoomScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Detail" component={DetailScreen}
         options={{
            headerBackTitleVisible: true,
            headerTransparent: true,
            title: "",
            headerTintColor: COLORS.PRIMARY,
          }}
      />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTintColor: COLORS.PRIMARY,
          title: route.params.userName,
        })}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default BarterRouter;
