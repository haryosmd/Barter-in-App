import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";
import MyAddsScreen from "../screens/MyAdds";
import BarterRoomScreen from "../screens/BarterRoom";
import ProfileScreen from "../screens/Profile";
import DetailScreen from "../screens/Detail";
import ListItemHomeScreen from "../screens/ListItemHome";
import Login from "../screens/Login";
import COLORS from "../constants/Colors";

import MyItemScreen from "../screens/MyItemBarter";
import ChatRoomScreen from "../screens/ChatRoom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import MyItemBarterScreen from "../screens/MyItemBarter";
const Stack = createNativeStackNavigator();

const HomeRouter = () => {
  const [auth, setAuth] = useState(false);

  async function getToken() {
    try {
      let token = await AsyncStorage.getItem("access_token");
      if (token) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getToken();
    }, [])
  );

  const navigation = useNavigation();
  return (
    <Stack.Navigator
    screenListeners={({ route, navigation }) => ({
      state: (e) => {
        if ((!auth && route.name === 'MyChatRoom') ) {
          navigation.navigate('Login')
        }
         if ((!auth && route.name === 'MyItemBarter') ) {
          navigation.navigate('Login')
        }
      },
    })}
    >
      <Stack.Screen
        name="HomeRouter"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          headerBackTitleVisible: true,
          title: "",
          headerTintColor: COLORS.PRIMARY,
        }}
      />

      <Stack.Screen
        name="MyChatRoom"
        component={ChatRoomScreen}
        options={({ route }) => ({
          title: route.params.userName,
        })}
      />

      <Stack.Screen
        name="MyItemBarter"
        component={MyItemBarterScreen}
        options={{
          headerBackTitleVisible: false,
          title: "",
          headerTintColor: COLORS.PRIMARY,
        }}
      />

      <Stack.Screen
        name="BarterRoom"
        component={BarterRoomScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerBackTitleVisible: false,
          title: "",
          headerTintColor: COLORS.PRIMARY,
          headerShown: false,
        }}
      />

      <Stack.Screen name="MyItem" component={MyItemScreen} />

      <Stack.Screen
        name="ListItemHome"
        component={ListItemHomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeRouter;
