import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;
import MyAddsComp from "../components/MyAddsComp";
import ItemSpace from "../components/ItemSpace";
import axios from "axios";

import Item from "../../data/items";

import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@apollo/client";
import { GET_MY_ADS } from "../../lib/apollo/queries/items";

const MyAddsScreen = () => {
  const navigation = useNavigation();
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("");
  //graphql
  let items = [];

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

  const { loading, error, data } = useQuery(GET_MY_ADS, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
    variables: {
      accessToken: token,
    },
  });

  if (data) {
    items = data?.getMyAds;
  }

  useFocusEffect(
    React.useCallback(() => {
      getToken();
    }, [])
  );

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View style={styles.headerWrapper}>
          <View style={styles.headerDetails}>
            <Text style={styles.nameText}>My Ads</Text>
          </View>
        </View>
      </View>
      <View>
        <FlatList
          contentContainerStyle={styles.listItem}
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MyAddsComp item={item} />}
          ItemSeparatorComponent={() => <ItemSpace width={10} />}
          ListHeaderComponent={() => <ItemSpace width={10} />}
          ListFooterComponent={() => <ItemSpace width={10} />}
          numColumns={1}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    paddingTop: StatusBar.currentHeight || 25,
    paddingBottom: setWidth(45),
    // paddingBottom: 200,
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

export default MyAddsScreen;
