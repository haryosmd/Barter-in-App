import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
const windowHeight = Dimensions.get("window").height;
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("MainApp");
    }, 3000);
  }, [navigation]);

  return (
    <View>
      <StatusBar
        style="auto"
        translucent={false}
        backgroundColor={COLORS.EXTRA_LIGHT_GRAY}
      />
      <SafeAreaView style={styles.header}>
        <View style={styles.headerWrapper}>
          <View style={styles.headerDetails}>

            <View>
              <Text style={styles.welcomeText}></Text>
              <Text style={styles.toText}></Text>
            </View>

          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require("../../assets/images/splash3.png")}
              style={styles.headerImage}
            />
            <Text style={styles.communityText}>
              The trusted community of barterers.
            </Text>
          </View>
          {/* <Text style={styles.acceptText}>
            Barter Anywhere 
          </Text>
          <Text style={styles.termText}>
            Barter.In Terms and Conditions and Privacy Policy
          </Text> */}
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
    height: setWidth(80),
    paddingBottom: 340,
  },
  headerImage: {
    height: 240,
    width: 280,
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
    color: COLORS.EXTRA_LIGHT_GRAY,
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
    fontSize: 20,
    marginBottom: 35,
    color: COLORS.EXTRA_LIGHT_GRAY,
    fontFamily: FONTS.BOLD,
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

export default Splash;
