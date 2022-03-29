import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 200) * h;

const CategoryInputCard = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("InputItem", {
          id: item.title,
        })
      }
    >
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageContainer}
          imageStyle={{
            borderRadius: 12,
            backgroundColor: item.backgroundColor,
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Image
            source={item.image}
            style={{
              width: 50,
              height: 50,
            }}
          />
          <Text style={styles.itemTitle}>{item.title}</Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor: COLORS.EXTRA_LIGHT_GRAY,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: setWidth(40),
    height: setHeight(40),
    borderRadius: 8,
    elevation: 3,
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: setWidth(5),
  },
  itemTitle: {
    color: COLORS.NEUTRAL,
    fontFamily: FONTS.BOLD,
    fontSize: 18,
    paddingVertical: 2,
    width: 140,
    textAlign: "center",
  },
});

export default CategoryInputCard;
