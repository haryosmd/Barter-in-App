import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";

import { useMutation } from "@apollo/client";
import {
  POST_ROOM_BARTER,
  GET_ROOM_BARTER,
} from "../../lib/apollo/queries/items";

import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SPACING = 20;
const ITEM_SIZE = 30;
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 200) * h;

const MyItemComp = ({ item, itemId, userId }) => {
  const navigation = useNavigation();
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("");

  const [postRoomBarter, { error, reset }] = useMutation(POST_ROOM_BARTER, {
    refetchQueries: [GET_ROOM_BARTER, "GetRoomBarter"],
  });

  const addRoomBarter = () => {
    postRoomBarter({
      variables: {
        accessToken: token,
        user2: userId,
        item1: item.id,
        item2: itemId,
      },
    });
    navigation.navigate("HomeRouter");
    navigation.navigate("BARTER");
  };
  // console.log(token, ">>>>");
  async function getToken() {
    try {
      let newToken = await AsyncStorage.getItem("access_token");
      let newId = await AsyncStorage.getItem("id");
      if (newToken) {
        setToken(newToken);
        setAuth(true);
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemWrapper}>
        <View style={styles.mainCardContent}>
          <View style={styles.leftContainer}>
            <Image
              source={{ uri: item?.Images[0]?.imageUrl }}
              style={{
                width: setWidth(20),
                height: setHeight(20),
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
              {item?.title.length >= 15
                ? item?.title.slice(0, 14) + "..."
                : item?.title}
            </Text>
            <Text style={styles.itemSubTitle}>{item?.brand}</Text>
            <Text style={styles.itemSubTitle}>
              {item?.yearOfPurchase} | {item?.category}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.ACTIVE,
              width: setWidth(10),
              marginLeft: 40,
              paddingVertical: setWidth(2),
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={addRoomBarter}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: 10,
  },
  addIconContainer: {
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: COLORS.ACTIVE,
    paddingHorizontal: 2,
    paddingVertical: setWidth(0.5),
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
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 18,
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

export default MyItemComp;
