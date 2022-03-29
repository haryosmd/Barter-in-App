import React from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../constants/Colors";
import FONTS from "../constants/Fonts";
import { useNavigation } from "@react-navigation/native";

const Splash = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Ini Splash Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  highlight: {
    backgroundColor: COLORS.EXTRA_LIGHT_GRAY,
    width: 230,
    height: 230,
    borderRadius: 12,
    elevation: 5,
    marginVertical: 2,
  },
  highlightItem: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  chipsContainer: {
    backgroundColor: COLORS.PRIMARY_LIGHT,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  chips: {
    color: COLORS.WHITE,
    textTransform: "uppercase",
    fontFamily: FONTS.BOLD,
    fontSize: 12,
  },
  highlightImage: {
    width: 100,
    height: 100,
  },
  highlightTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: 16,
    textTransform: "uppercase",
    color: COLORS.DARK_GREY,
    marginBottom: 5,
  },
  highlightSubtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: 12,
    color: COLORS.DARK_GREY,
  },
});

export default Splash;
