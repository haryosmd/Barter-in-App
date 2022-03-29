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
import MyItemComp from "../components/MyItemComp";
import ItemSpace from "../components/ItemSpace";

import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@apollo/client";
import { GET_DATA_FOR_BARTER } from "../../lib/apollo/queries/items";

const MyItemBarter = ({ route }) => {
  
  const navigation = useNavigation();
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("");

  const { loading, error, data } = useQuery(GET_DATA_FOR_BARTER, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
    variables: {
      accessToken: token,
    },
  });

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

  useFocusEffect(
    React.useCallback(() => {
      getToken();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.header}>
        <View style={styles.headerWrapper}>
          <View style={styles.headerDetails}>
            <Text style={styles.nameText}>My Items</Text>
          </View>
        </View>
      </SafeAreaView>
      <View>
        <FlatList
          contentContainerStyle={styles.listItem}
          data={data?.getDataForBarter}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MyItemComp item={item} itemId={route?.params.detailItem.id} userId={route?.params.detailItem.User.id} />
          )}
          ItemSeparatorComponent={() => <ItemSpace width={10} />}
          ListHeaderComponent={() => <ItemSpace width={10} />}
          ListFooterComponent={() => <ItemSpace width={10} />}
          numColumns={1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    paddingTop: StatusBar.currentHeight || 25,
    paddingBottom: setWidth(20),
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

export default MyItemBarter;
