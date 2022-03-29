import React, { useEffect, useState, useRef } from "react";
import AppLoading from "expo-app-loading";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/Colors";
import HomeRouter from "./HomeRouter";
import BarterRouter from "./BarterRouter";
import ProfileScreen from "../screens/Profile";
import MyAddsRouter from "./MyAddsRouter";
import PostItemRouter from "./PostItemRouter";
import Splash from "../screens/Splash";
import * as Notifications from "expo-notifications";

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Login from "../screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ChatRoomScreen from "../screens/ChatRoom";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainApp = () => {
  const [auth, setAuth] = useState(false);
  const navigation = useNavigation();
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

  useFocusEffect(() => {
    getToken();
  });

  useEffect(() => {
    Notifications.addNotificationResponseReceivedListener((response) => {
      navigation.push(response.notification.request.content.data.navigate, {
        itemUserId: response.notification.request.content.data.navigateData,
      });
      Router(response.notification.request.content.data.username);
    });
  }, []);

  const [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
    Bold: require("../../assets/fonts/Poppins-Bold.ttf"),
    Black: require("../../assets/fonts/Poppins-Black.ttf"),
    ExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
    ExtraLight: require("../../assets/fonts/Poppins-ExtraLight.ttf"),
    Light: require("../../assets/fonts/Poppins-Light.ttf"),
    SemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
    Medium: require("../../assets/fonts/Poppins-Medium.ttf"),
    Italic: require("../../assets/fonts/Poppins-Italic.ttf"),
  });

  const getTabBarStyle = (route) => {  
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'BARTER';
      let display = (routeName === 'MyChatRoom' || routeName === 'Login') ? 'none':'flex';
      return {display}
  }

  return fontsLoaded ? (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "EXPLORE") {
            iconName = focused ? "home-sharp" : "home-outline";
          } else if (route.name === "MY ACCOUNT") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "ADD ADS") {
            iconName = focused
              ? "md-add-circle-sharp"
              : "md-add-circle-outline";
          } else if (route.name === "MY ADS") {
            iconName = focused ? "archive-sharp" : "archive-outline";
          } else if (route.name === "BARTER") {
            iconName = focused ? "basket-sharp" : "basket-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.PRIMARY_LIGHT,
        tabBarInactiveTintColor: COLORS.EXTRA_LIGHT_GRAY,
        tabBarActiveBackgroundColor: COLORS.BASIC_BACKGROUND,
        tabBarInactiveBackgroundColor: COLORS.BASIC_BACKGROUND,
      })}
    >
      <Tab.Screen
        name="EXPLORE"
        component={HomeRouter}
        options={({ route }) => ({
          tabBarStyle: getTabBarStyle(route),
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="MY ADS"
        component={MyAddsRouter}
        options={({ route }) => ({
          tabBarStyle: getTabBarStyle(route),
          headerShown: false,
        })}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            e.preventDefault();
            if (!auth) {
              navigation.navigate("Login");
            } else if (auth) {
              navigation.navigate("MY ADS");
            }
          },
        })}
      />
      <Tab.Screen
        name="ADD ADS"
        component={PostItemRouter}
        options={({ route }) => ({
          tabBarStyle: getTabBarStyle(route),
          headerShown: false,
        })}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            e.preventDefault();
            if (!auth) {
              navigation.navigate("Login");
            } else {
              navigation.navigate("ADD ADS");
            }
          },
        })}
      />
      <Tab.Screen
        name="BARTER"
        component={BarterRouter}
        options={({ route }) => ({
          tabBarStyle: getTabBarStyle(route),
          headerShown: false,
        })}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            e.preventDefault();
            if (!auth) {
              navigation.navigate("Login");
            } else {
              navigation.navigate("BARTER");
            }
          },
        })}
      />
      <Tab.Screen
        name="MY ACCOUNT"
        component={ProfileScreen}
        options={({ route }) => ({
          tabBarStyle: getTabBarStyle(route),
          headerShown: false,
        })}
      />
    </Tab.Navigator>
  ) : (
    <AppLoading />
  );
};

const Router = (route) => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="HomeRouter"
        component={HomeRouter}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MyAddsRouter"
        component={MyAddsRouter}
        options={{ headerShown: false }}
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

      <Stack.Screen
        name="PostItemRouter"
        component={PostItemRouter}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="BarterRouter"
        component={BarterRouter}
        options={{ headerShown: false }}
      />

      {/* <Stack.Screen
      name="MyChatRoom"
      component={ChatRoomScreen}
      options={{ headerShown: false }}
    /> */}

      <Stack.Screen
        name="MyChatRoom"
        component={ChatRoomScreen}
        options={({ route }) => ({
          title: "",
        })}
      />
    </Stack.Navigator>
  );
};

export default Router;
