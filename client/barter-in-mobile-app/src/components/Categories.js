import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../constants/Colors";
import FONTS from "../constants/Fonts";
const { height, width } = Dimensions.get("screen");
const setHeight = (h) => (height / 200) * h;
const setWidth = (w) => (width / 100) * w;
const Categories = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.push("ListItemHome", { item, categoryName: item.title })}
    >
      <View
        style={{
          width: width / 3 - 30,
          marginHorizontal: 10,
          marginRight: 4,
          justifyContent: "center",
          marginBottom: 20,
          marginTop: 10,
          elevation: 3,
          borderRadius: 8,
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            backgroundColor: item.backgroundColor,
            borderRadius: 10,
            width: width / 3 - 30,
            height: width / 3 - 30,
          }}
        />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={item.image}
            style={{
              width: width / 5 - 30,
              height: width / 5 - 30,
              marginTop: 10,
            }}
          />
          <Text
            style={{
              textAlign: "center",
              fontFamily: FONTS.MEDIUM,
              marginTop: 10,
              fontSize: 14,
            }}
          >
            {item.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  // buat push
  // buat push lagi
};

export default Categories;
