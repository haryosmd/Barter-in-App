import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";

import { useMutation } from "@apollo/client";
import {
  PATCH_ROOM_BARTER,
  GET_ROOM_BARTER,
} from "../../lib/apollo/queries/items";

import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SPACING = 20;
const ITEM_SIZE = 30;

const MuBarterRoomComp = ({ item }) => {
  
  const navigation = useNavigation();
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("");
  const [id, setId] = useState(0);
  //graphql mutation
  const [patchRoomBarter, { error, reset }] = useMutation(PATCH_ROOM_BARTER, {
    refetchQueries: [
      GET_ROOM_BARTER, // DocumentNode object parsed with gql
      "GetRoomBarter", // Query name
    ],
  });

  const updateRoomBarter = () => {
    patchRoomBarter({ variables: { accessToken: token, roomId: item.id } });
    // navigation.navigate("HomeRouter");
  };

  async function getToken() {
    try {
      let newToken = await AsyncStorage.getItem("access_token");
      let newId = await AsyncStorage.getItem("id");
      if (newToken) {
        setToken(newToken);
        setAuth(true);
        setId(newId);
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
    // <TouchableOpacity
    //   activeOpacity={0.8}
    //   onPress={() =>
    //     navigation.push("Detail", {
    //       id: item.id,
    //     })
    //   }
    // >
    <View style={styles.container}>
      <View style={styles.itemWrapper}>
        <View style={styles.roomBarterCard}>
          <Text style={styles.user1}>{item?.user1.name} Item</Text>
          <View style={styles.item1}>
            <Image
              source={{ uri: item?.Item1?.Images[0]?.imageUrl }}
              style={{
                width: 70,
                height: 70,
                borderRadius: 10,
                marginRight: 10,
                borderColor: COLORS.LIGHT_GRAY,
                borderWidth: 1,
              }}
            />
            <View>
              <Text style={styles.itemTitle} numberOfLines={3}>
                 {item?.Item1?.title.length >= 18
                  ? item?.Item1?.title.slice(0, 17) + "..."
                  : item?.Item1?.title}
              </Text>
              <Text style={styles.itemSubTitle}>{item?.Item1?.brand}</Text>
              <Text style={styles.itemSubTitle}>
                {item?.Item1?.yearOfPurchase} | {item?.Item1?.category}
              </Text>
            </View>
          </View>
          {/* batas */}
          <Text style={styles.user2}>{item?.user2.name} Item</Text>
          <View style={styles.item2}>
            <Image
              source={{ uri: item?.Item2?.Images[0]?.imageUrl }}
              style={{
                width: 70,
                height: 70,
                borderRadius: 10,
                marginRight: 10,
                borderColor: COLORS.LIGHT_GRAY,
                borderWidth: 1,
              }}
            />
            <View>
              <Text style={styles.itemTitle} numberOfLines={3}>
                 {item?.Item2?.title.length >= 18
                  ? item?.Item2?.title.slice(0, 17) + "..."
                  : item?.Item2?.title}
              </Text>
              <Text style={styles.itemSubTitle}>{item?.Item2?.brand}</Text>
              <Text style={styles.itemSubTitle}>
                {item?.Item2?.yearOfPurchase} | {item?.Item2?.category}
              </Text>
            </View>
          </View>
          <View style={styles.containerButton}>
            {item.user1 == id && !item.status1 ? (
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={updateRoomBarter}
              >
                <Text style={styles.buttonText}>CONFIRM</Text>
              </TouchableOpacity>
            ) : (
              <View></View>
            )}
            {item.user2 == id && !item.status2 ? (
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={updateRoomBarter}
              >
                <Text style={styles.buttonText}>CONFIRM</Text>
              </TouchableOpacity>
            ) : (
              <View></View>
            )}
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => navigation.push("ChatRoom", {
                userName: 'Chat Room',
                itemUserId: item?.user2,
              })}
            >
              <Text style={styles.buttonText}>CHAT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    // </TouchableOpacity>
    // ubah dikit
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    borderRadius: 70,
    marginRight: 10,
  },
  roomBarterCard: {
    flexDirection: "column",
  },
  user1: {
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.BOLD,
    fontSize: 22,
    paddingVertical: 2,
  },
  user2: {
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.BOLD,
    fontSize: 22,
    paddingBottom: 2,
  },
  item1: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 10,
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    borderColor: COLORS.LIGHT_GRAY,
    borderWidth: 1,
  },
  item2: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 10,
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    borderColor: COLORS.LIGHT_GRAY,
    borderWidth: 1,
  },
  itemWrapper: {
    flexDirection: "column",
    padding: 10,
    marginBottom: SPACING,
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    borderColor: COLORS.LIGHT_GRAY,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  itemTitle: {
    color: COLORS.LIGHT_GRAY,
    fontFamily: FONTS.BOLD,
    fontSize: 22,
    paddingVertical: 2,
  },
  itemSubTitle: {
    fontSize: setWidth(4),
    fontFamily: FONTS.MEDIUM,
    color: COLORS.LIGHT_GRAY,
  },
  itemSubtitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 60,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 8,
    elevation: 3,
    marginVertical: 2,
    width: setWidth(25),
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.EXTRA_LIGHT_GRAY,
    fontFamily: FONTS.BOLD,
  },
});

export default MuBarterRoomComp;
