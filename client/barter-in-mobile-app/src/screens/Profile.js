import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;

const ProfileScreen = ({ route }) => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const navigation = useNavigation();
  const [auth, setAuth] = useState(false);
  const toLoginPage = () => {
    navigation.navigate("Login");
  };

  const logout = async () => {
    await AsyncStorage.removeItem("access_token");
    setAuth(false);
    navigation.navigate("Profile");
  };

  async function getToken() {
    try {
      let token = await AsyncStorage.getItem("access_token");
      let username = await AsyncStorage.getItem("username");
      let email = await AsyncStorage.getItem("email");
      let photo = await AsyncStorage.getItem("photoUrl");
      if (token) {
        setAuth(true);
        setUsername(username);
        setEmail(email);
        setPhoto(photo);
      } else {
        setAuth(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getToken()
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerWrapper}>
          <Text style={styles.nameText}>My Account</Text>
        </View>
      </View>
      <StatusBar style="auto" />

      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          {auth ? (
            <Avatar.Image
               source={photo ? {uri: photo } : null}
              size={80}
            />
          ) : (
            <Avatar.Image
              source={require("../../assets/profileacc.png")}
              size={80}
            />
          )}

          {auth ? (
            <View style={{ marginLeft: 20 }}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                  },
                ]}
              >
                {username}
              </Title>
              <Caption style={styles.caption}>@{username.toLowerCase()}</Caption>
            </View>
          ) : (
            <View style={{ marginLeft: 20 }}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 11,
                    marginBottom: 5,
                  },
                ]}
              >
                Login
              </Title>
              <TouchableOpacity onPress={toLoginPage}>
                <Text
                  style={{
                    color: "#777777",
                    fontWeight: "600",
                    fontSize: 15,
                    textDecorationLine: "underline",
                  }}
                >
                  Log in to your account
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {auth ? (
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="email" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              {email}
            </Text>
          </View>
        </View>
      ) : (
        false
      )}

      {auth ? (
        <View style={styles.infoBoxWrapper}>
          <View
            style={[
              styles.infoBox,
              {
                borderRightColor: "#dddddd",
                borderRightWidth: 1,
              },
            ]}
          >
            <Title>100</Title>
            <Caption>Views</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>12</Title>
            <Caption>Ads</Caption>
          </View>
        </View>
      ) : (
        false
      )}

      <View style={styles.menuWrapper}>
        {auth ? (
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="heart-outline" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Your Favorites</Text>
            </View>
          </TouchableRipple>
        ) : (
          false
        )}
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Help and Support</Text>
          </View>
        </TouchableRipple>
        {auth ? (
          <TouchableRipple onPress={logout}>
            <View style={styles.menuItem}>
              <Icon name="logout" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Logout</Text>
            </View>
          </TouchableRipple>
        ) : (
          false
        )}
        { auth ? false :
             <TouchableOpacity
          style={{
            backgroundColor: COLORS.PRIMARY,
            width: 323,
            paddingVertical: 8,
            borderRadius: 10,
            justifyContent: "center",
            marginTop: 4,
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              marginVertical: 5,
            }}
          >
            Login or Register
          </Text>
        </TouchableOpacity>
        }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  nameText: {
    fontSize: 20,
    color: COLORS.EXTRA_LIGHT_GRAY,
    fontFamily: FONTS.BOLD,
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
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.EXTRA_LIGHT_GRAY,
  },
  headerImage: {
    height: 135,
    width: 135,
    borderRadius: 100,
    borderWidth: 2,
  },
  header: {
    backgroundColor: COLORS.BASIC_BACKGROUND,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 30,
  },
  userInfoSection: {
    paddingHorizontal: 25,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 8,
    marginHorizontal: 25,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});

export default ProfileScreen;
