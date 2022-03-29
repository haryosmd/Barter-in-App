import React, { useState } from "react";
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

import { useMutation } from "@apollo/client";
import { DELETE_ITEM, GET_MY_ADS } from "../../lib/apollo/queries/items";

import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SPACING = 20;
const ITEM_SIZE = 30;
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 200) * h;

const MyAddsComp = ({ item }) => {
  const [token, setToken] = useState("");
  const [deleteItem, { error, reset }] = useMutation(DELETE_ITEM, {
    refetchQueries: [GET_MY_ADS, "GetMyAds"],
  });
  const deleteMyAds = () => {
    deleteItem({
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-first",
      variables: { itemId: item.id, accessToken: token },
    });
    navigation.navigate("MY ADS");
  };

  async function getToken() {
    try {
      let newToken = await AsyncStorage.getItem("access_token");
      let newId = await AsyncStorage.getItem("id");
      if (newToken) {
        setToken(newToken);
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
  const stylingStatus = () => {
    switch (item.statusPost) {
      case "Accepted":
        return COLORS.GREEN;
      case "Pending":
        return COLORS.YELLOW;
      case "Rejected":
        return COLORS.PERSIAN_RED;
      default:
        return COLORS.YELLOW;
    }
  };
  const messageStatus = () => {
    switch (item.statusPost) {
      case "Accepted":
        return "Your item ready for barter";
      case "Pending":
        return "Your item is being reviewed";
      case "Rejected":
        return "Your item is unqualified";
      default:
        return "Your item is being reviewed";
    }
  };
  const deleteBtn = (item) => {
    if (item.statusPost === "Rejected") {
      return (
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.RED_ERROR,
            width: 60,
            paddingVertical: setWidth(2),
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
            // marginTop: setHeight(4),
            // marginBottom: setHeight(4),
          }}
          onPress={deleteMyAds}
        >
          <Ionicons name="md-trash-outline" size={24} color="white" />
        </TouchableOpacity>
      );
    }
  };
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
        <View style={styles.itemWrapper}>
          <View style={styles.mainCardContent}>
            <View style={styles.leftContainer}>
              <Image
                source={{ uri: item?.Images[0]?.imageUrl }}
                style={{
                  width: setWidth(25),
                  height: setHeight(25),
                  borderRadius: 10,
                  marginRight: 10,
                  borderColor: COLORS.LIGHT_GRAY,
                  borderWidth: 1,
                  // flex: 1 / 4,
                }}
              />
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.itemTitle} numberOfLines={3}>
                {item?.title.length >= 18
                  ? item?.title.slice(0, 17) + "..."
                  : item?.title}
              </Text>
              <Text style={styles.itemSubTitle}>{item?.brand}</Text>
              <Text style={styles.itemSubTitle}>
                {item?.yearOfPurchase} | {item?.category}
              </Text>
              <Text style={styles.itemSubTitle}>{messageStatus()}</Text>
            </View>
          </View>
          <View style={styles.buttonAndChips}>
            <View
              style={{ ...styles.chipsContainer, borderColor: stylingStatus() }}
            >
              <Text style={styles.chips}>{item.statusPost}</Text>
            </View>
            {deleteBtn(item)}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    borderRadius: 70,
    marginRight: 10,
    marginTop: 20,
  },
  mainCardContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  leftContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  rightContainer: {
    paddingTop: setHeight(2),
    paddingLeft: setWidth(2),
  },
  buttonAndChips: {
    backgroundColor: COLORS.WHITE,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: setWidth(5),
    marginTop: setHeight(2),
  },
  chipsContainer: {
    // backgroundColor: COLORS.GREEN,
    // borderColor: COLORS.GREEN,
    borderRadius: 20,
    borderWidth: 1.5,
    paddingHorizontal: 20,
    marginLeft: setWidth(2),
    paddingVertical: setWidth(0.5),
  },
  chips: {
    paddingVertical: setHeight(0.5),
    textAlign: "center",
    color: COLORS.DARK_GREY,
    textTransform: "uppercase",
    fontFamily: FONTS.BOLD,
    fontSize: 12,
  },
  itemWrapper: {
    flexDirection: "column",
    padding: 10,
    paddingTop: setHeight(4),
    marginBottom: SPACING,
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    // borderColor: COLORS.
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: setWidth(0),
      height: setHeight(2),
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  itemTitle: {
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.BOLD,
    fontSize: 22,
    // paddingVertical: setHeight(2),
    // width: 140,
  },
  itemSubTitle: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.LIGHT_GRAY,
  },
  itemSubtitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // rowAndCenter: {
  //   flexDirection: "row",
  //   alignItems: "center",
  // },
});

export default MyAddsComp;
