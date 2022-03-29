import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import LottieView from 'lottie-react-native';
import * as Progress from 'react-native-progress';
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
import Highlight from "../components/Highlight";
import Categories from "../components/Categories";
import categoryAdd from "../../data/categoryAdd";
import ItemSpace from "../components/ItemSpace";

import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useQuery } from "@apollo/client";
import { GET_ITEMS_HOME } from "../../lib/apollo/queries/items";

const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;

const numColumns = 3;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState("");
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  //graphql
  const { loading, error, data } = useQuery(GET_ITEMS_HOME, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
    variables: {
      getItemsHomeId: id,
    },
  });

  async function getToken() {
    try {
      let newToken = await AsyncStorage.getItem("access_token");
      let newId = await AsyncStorage.getItem("id");
      let username = await AsyncStorage.getItem("username");
      let photo = await AsyncStorage.getItem("photoUrl");
      if (newToken) {
        setId(newId);
        setPhoto(photo);
        setUsername(username);
        setToken(newToken);
        setAuth(true);
      } else {
        setAuth(false);
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
    <SafeAreaView
      contentContainerStyle={styles.container}
      options={{ headerShown: false }}
    >
      <StatusBar
        style="auto"
        translucent={false}
        backgroundColor={COLORS.EXTRA_LIGHT_GRAY}
      />
      <View style={styles.header}>
        <View style={styles.headerWrapper}>
          <View style={styles.headerDetails}>
            {auth ? (
              <View>
                <Text style={styles.nameText}>{username}</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.nameText}>Login</Text>
              </View>
            )}
            <View style={styles.iconWrapper}>
              <FontAwesome5 name="award" size={24} color="gold" />
            </View>
          </View>
          <View>
            {auth ? (
              <Image
                source={photo ? { uri: photo } : null}
                style={styles.headerImage}
              />
            ) : (
              <Image
                source={require("../../assets/profileacc.png")}
                style={styles.headerImage}
              />
            )}
          </View>
        </View>
      </View>
      
      <View style={styles.highlightWrapper}>
        {loading ?
          <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center'}}>
            <Progress.Circle size={50} indeterminate={true} color={COLORS.PRIMARY} borderWidth={10} />
          </View>
        :
        <FlatList
          data={data?.getItemsHome}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Highlight item={item} />}
          horizontal
          ItemSeparatorComponent={() => <ItemSpace width={20} />}
          ListHeaderComponent={() => <ItemSpace width={20} />}
          ListFooterComponent={() => <ItemSpace width={20} />}
          showsHorizontalScrollIndicator={false}
        />
      }
      </View>

      <View style={styles.categoryWrapper}>
        <View style={styles.category}>
          <View>
            <Text style={styles.categoryTitle}>Categories</Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <FlatList
            data={categoryAdd}
            contentContainerStyle={styles.listCategory}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Categories item={item} />}
            numColumns={numColumns}
          />
        </View>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  listCategory: {
    justifyContent: "center",
    paddingBottom: 20,
  },
  header: {
    backgroundColor: COLORS.BASIC_BACKGROUND,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 20,
  },
  headerImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    borderColor: COLORS.EXTRA_LIGHT_GRAY,
    borderWidth: 2,
  },
  headerDetails: {
    flexDirection: "row",
  },
  iconWrapper: {
    marginLeft: 10,
  },
  highlightWrapper: {
    marginTop: 20,
    // backgroundColor: COLORS.WHITE,
  },
  categoryWrapper: {
    paddingHorizontal: 20,
    marginTop: 20,
    // flex: 1,
    // backgroundColor: COLORS.PRIMARY_LIGHT,
  },
  category: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  categoryTitle: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 18,
    color: COLORS.DARK_GREY,
  },
  categorySubtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: COLORS.DARK_GREY,
    textDecorationLine: "underline",
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
  nameText: {
    fontSize: 20,
    color: COLORS.EXTRA_LIGHT_GRAY,
    fontFamily: FONTS.BOLD,
  },
  buttonText: {
    fontSize: 14,
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.BOLD,
  },
});

export default HomeScreen;
