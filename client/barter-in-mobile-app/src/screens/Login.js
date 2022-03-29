import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
} from "react-native";

import { TouchableRipple } from "react-native-paper";

import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";

import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Google from "expo-google-app-auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const windowHeight = Dimensions.get("window").height;
const { width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;

import { useMutation } from "@apollo/client";
import { POST_GOOGLE_LOGIN } from "../../lib/apollo/queries/items";

import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

const Login = () => {
  const [token, setToken] = useState("");
  const [LoginGoogle, { data, loading, error }] =
    useMutation(POST_GOOGLE_LOGIN);

  useEffect(() => {
    registerForPushNotificationsAsync().then((data) => {
      setToken(data);
    });
  }, []);

  const navigation = useNavigation();
  const handleGoogleSignIn = () => {

    console.log('hiiiiiii')
    const config = {
      iosClientId: `844458367499-o26lt12vj3hmr4l995o11q3dosv0meav.apps.googleusercontent.com`,
      androidClientId: `844458367499-c1pqe2nh4on96u7go5oc5r0bum5c05dv.apps.googleusercontent.com`,
      scopes: ["profile", "email"],
    };
    let user = {};
    Google.logInAsync(config)
      .then((result) => {
        user = result.user;
        return registerForPushNotificationsAsync()
      })
      .then((data) => {
            return LoginGoogle({ variables: { newUser: user, newToken: data } })
      })
      .then((data) => {
        AsyncStorage.setItem("id", data.data.loginGoogle.id);
        AsyncStorage.setItem("username", data.data.loginGoogle.username);
        AsyncStorage.setItem("email", data.data.loginGoogle.email);
        AsyncStorage.setItem("photoUrl", data.data.loginGoogle.photoUrl);
        return AsyncStorage.setItem(
          "access_token",
          data.data.loginGoogle.access_token
        );
      })
      .then((result) => {
        navigation.navigate("Profile", {
          dataUser: user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      <SafeAreaView style={styles.header}>
        <View style={styles.headerWrapper}>
          <TouchableRipple
            style={{ alignSelf: "flex-start" }}
            onPress={(props) => {
              navigation.navigate("Profile");
            }}
          >
            <Icon name="close" color="#fff" size={30} />
          </TouchableRipple>
          <View style={styles.headerDetails}>
            <View>
              <Text style={styles.welcomeText}>WELCOME</Text>
              <Text style={styles.toText}>to</Text>
            </View>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require("../../assets/images/Barterin-logos_white.png")}
              style={styles.headerImage}
            />
            <Text style={styles.communityText}>
              The trusted community of barterers.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            activeOpacity={0.8}
            google={true}
            onPress={handleGoogleSignIn}
          >
            <View style={styles.iconWrapper}>
              <Ionicons
                name="logo-google"
                style={styles.icon}
                size={24}
                color="white"
              />
            </View>
            <View style={styles.btnTxtWrapper}>
              <Text style={styles.buttonText}>Continue with Google</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.acceptText}>
            If you continue, you are accepting
          </Text>
          <Text style={styles.termText}>
            Barter.In Terms and Conditions and Privacy Policy
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: 230,
    height: windowHeight / 15,
    padding: 8,
    flexDirection: "row",
    borderRadius: 3,
    backgroundColor: "rgb(66,134,245)",
    borderColor: "#fff",
    borderWidth: 1,
  },
  iconWrapper: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontWeight: "bold",
  },
  btnTxtWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: COLORS.BASIC_BACKGROUND,
  },
  header: {
    backgroundColor: COLORS.BASIC_BACKGROUND,
    height: windowHeight,
  },
  headerWrapper: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    height: setWidth(120),
    paddingBottom: 200,
  },
  headerImage: {
    height: 100,
    width: 240,
  },
  headerDetails: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    marginLeft: 10,
  },
  welcomeText: {
    paddingTop: 70,
    fontSize: 46,
    color: "white",
    fontFamily: FONTS.BOLD,
  },
  toText: {
    fontSize: 30,
    color: COLORS.EXTRA_LIGHT_GRAY,
    fontFamily: FONTS.BOLD,
    textAlign: "center",
  },
  communityText: {
    marginTop: 10,
    fontSize: 17,
    marginBottom: 35,
    color: COLORS.EXTRA_LIGHT_GRAY,
    textAlign: "center",
  },
  acceptText: {
    marginTop: 50,
    fontSize: 14,
    marginBottom: 8,
    color: COLORS.EXTRA_LIGHT_GRAY,
    textAlign: "center",
  },
  termText: {
    fontSize: 14,
    marginBottom: 35,
    color: COLORS.EXTRA_LIGHT_GRAY,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  buttonText: {
    fontSize: 14,
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.BOLD,
    color: "white",
  },
});

export default Login;
