import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import COLORS from "../constants/Colors";
import FONTS from "../constants/Fonts";
import { useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 200) * h;

const Highlight = ({ item }) => {
  const navigation = useNavigation();
  let numberOfLines = 0
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.push("Detail", { id: item?.id })}
    >
      <View>
        <ImageBackground
          style={styles.highlight}
          imageStyle={{
            borderRadius: 12,
            // backgroundColor: item.backgroundColor,
            flexDirection: "row",
            alignItems: "flex-end",
          }}
          source={{ uri: item?.Images[0]?.imageUrl }}
        ></ImageBackground>
        <View>
          <View style={styles.highlightItem}>
            {/* <Image source={item.image} style={styles.highlightImage} /> */}
          </View>
          <View>
            <Text style={styles.itemTitle} numberOfLines={1} onTextLayout={(event) => {
              const { lines } = event.nativeEvent
              lines.length > numberOfLines
            }}>
              {item?.title.length >= 20 ? item?.title.slice(0, 19) + "..." : item?.title}
            </Text>
            <View style={styles.itemSubtitleContainer}>
              <Text style={styles.itemSubTitle}>
                Purchased on {item.yearOfPurchase}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  highlight: {
    width: 230,
    height: 230,
    borderRadius: 12,
    elevation: 5,
    marginVertical: 2,
    shadowColor: COLORS.GRAY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  itemTitle: {
    flexWrap: 'wrap',
    fontFamily: FONTS.BOLD,
    fontSize: 18,
    color: COLORS.DARK_GREY,
  },
  itemSubTitle: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 14,
    color: COLORS.LIGHT_GRAY,
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

export default Highlight;
