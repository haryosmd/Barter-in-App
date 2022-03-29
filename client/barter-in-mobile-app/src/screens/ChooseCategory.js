// import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  FlatList,
} from "react-native";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
import categoryAdd from "../../data/categoryAdd";
import CategoryInputCard from "../components/CategoryInputCard";
import ItemSpace from "../components/ItemSpace";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
const { width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;

const ChooseCategory = ({ navigation }) => {
  const [auth, setAuth] = useState(false);
  async function getToken() {
    try {
      let token = await AsyncStorage.getItem("access_token");
      if (token) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(() => {
    getToken();
  });
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.header}>
        <View style={styles.headerWrapper}>
          <View style={styles.headerDetails}>
            <View>
              <Text style={styles.nameText}>What are you offering?</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View>
        <FlatList
          data={categoryAdd}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <ItemSpace width={10} />}
          ListHeaderComponent={() => <ItemSpace width={10} />}
          ListFooterComponent={() => <ItemSpace width={10} />}
          renderItem={({ item }) => (
            <CategoryInputCard item={item} navigation={navigation} />
          )}
          numColumns={2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  nameText: {
    fontSize: 20,
    color: COLORS.EXTRA_LIGHT_GRAY,
    fontFamily: FONTS.BOLD,
  },
});

export default ChooseCategory;
