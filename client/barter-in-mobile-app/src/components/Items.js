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
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 200) * h;

const Items = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.push("Detail", {
          id: item.id,
        })
      }
    >
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageContainer}
          imageStyle={{ borderRadius: 12 }}
          source={{ uri: item?.Images[0]?.imageUrl }}
        >
          {/* <View style={{ ...styles.container }}>
          <Image
            source={{ uri: movie.imgUrl }}
            style={{
              ...styles.container,
              width: 230 * size,
              height: 340 * size,
              borderRadius: 12,
            }}
          />
        </View> */}
        </ImageBackground>
        <View>
          <Text style={styles.itemTitle} numberOfLines={3}>
            {item.title}
          </Text>
          <View style={styles.itemSubtitleContainer}>
            <Text style={styles.itemSubTitle}>
              Purchased on {item.yearOfPurchase}
            </Text>
            {/* <View style={styles.rowAndCenter}>
              <Ionicons
                style={{ marginRight: 5 }}
                name="star"
                size={17}
                color={COLORS.YELLOW}
              />
              <Text style={styles.numberRating}>{movie.rating}</Text>
            </View> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
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
    shadowColor: COLORS.GRAY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  itemTitle: {
    color: COLORS.DARK_GREY,
    fontSize: 18,
    fontFamily: FONTS.BOLD,
    paddingVertical: 2,
    width: 140,
  },
  itemSubTitle: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.GRAY,
  },
  itemSubtitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowAndCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Items;
