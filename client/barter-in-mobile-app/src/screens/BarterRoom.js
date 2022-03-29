import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import MuBarterRoomComp from "../components/MyBarterRoomComp";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;
import ItemSpace from "../components/ItemSpace";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { useQuery } from "@apollo/client";
import { GET_ROOM_BARTER } from "../../lib/apollo/queries/items";

const BarterRoomScreen = () => {
  const navigation = useNavigation();
  //graphql
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("");
  async function getToken() {
    try {
      let newToken = await AsyncStorage.getItem("access_token");
      if (newToken) {
        setToken(newToken);
        setAuth(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const { loading, error, data } = useQuery(GET_ROOM_BARTER, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
    variables: {
      accessToken: token,
    },
  });

  let roomBarters = [];
  if (data) {
    roomBarters = data?.getRoomBarter;
  }

  useFocusEffect(
    React.useCallback(() => {
      getToken();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerWrapper}>
          <View style={styles.headerDetails}>
            <View>
              <Text style={styles.nameText}>My Room Barter</Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <FlatList
          contentContainerStyle={styles.listItem}
          data={roomBarters}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <ItemSpace width={10} />}
          ListHeaderComponent={() => <ItemSpace width={10} />}
          ListFooterComponent={() => <ItemSpace width={10} />}
          renderItem={({ item }) => <MuBarterRoomComp item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 25,
    marginBottom: setWidth(20),
  },
  listItem: {
    padding: 10,
    paddingTop: StatusBar.currentHeight || 25,
  },
  header: {
    backgroundColor: COLORS.BASIC_BACKGROUND,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 30,
  },
  headerDetails: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    marginLeft: 10,
  },
  nameText: {
    fontSize: 20,
    color: COLORS.EXTRA_LIGHT_GRAY,
    fontFamily: FONTS.BOLD,
  },
});

export default BarterRoomScreen;
