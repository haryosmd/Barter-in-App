import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
import Carousel from "react-native-snap-carousel";
import { GET_ITEM } from "../../lib/apollo/queries/items";
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;
import { useQuery } from "@apollo/client";

const DetailScreen = ({ route }) => {

  const [readMore, setReadMore] = useState(false);
  const navigation = useNavigation();
  const controllRead = (value) => {
    setReadMore(value);
  };

  const { loading, error, data } = useQuery(GET_ITEM, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
    variables: {
      itemId: route.params.id,
    },
  });

  const renderItem2 = ({ item, index }) => {
    return (
      <View
        style={{
          height: 250,
          width: width * 0.8,
        }}
      >
        <Image
          source={item?.imageUrl ? {uri: item?.imageUrl } : null}
          style={{
            height: 250,
            width: width * 0.8,
          }}
        ></Image>
      </View>
    );
  };

  return (
  <SafeAreaView style={styles.container}>    
    <View style={styles.container}>
      <ScrollView style={{ width: Dimensions.get("window").width }}>
        <Carousel
          data={data?.getItem.Images ? data?.getItem.Images : null}
          renderItem={renderItem2}
          sliderWidth={width * 1}
          itemWidth={width * 0.8}
          layout={"default"}
        />
        <View>
          <Text
            style={{
              fontFamily: FONTS.BOLD,
              fontSize: 18,
              marginTop: 15,
              marginLeft: 15,
              marginRight: 15,
              // borderBottomWidth: 2,
              borderColor: "#C0C0C0",
            }}
          >
            {data?.getItem.title}
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <View
            style={{
              flex: 1,
              height: 6,
              backgroundColor: COLORS.EXTRA_LIGHT_GRAY,
            }}
          />
        </View>
        {/* <View>
          <Text
            style={{
              fontFamily: FONTS.BOLD,
              fontSize: 17,
              marginTop: 15,
              marginLeft: 15,
              marginRight: 15,
              borderBottomWidth: 3,
              borderColor: COLORS.EXTRA_LIGHT_GRAY,
            }}
          >
            Details
          </Text>
        </View> */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: 17,
              color: COLORS.DARK_GREY,
              fontFamily: FONTS.SEMI_BOLD,
              marginTop: 15,
              marginLeft: 15,
            }}
          >
            Brand
          </Text>
          <Text
            style={{
              fontSize: 17,
              marginTop: 15,
              marginLeft: 15,
              marginRight: 15,
              fontFamily: FONTS.MEDIUM,
              color: COLORS.LIGHT_GRAY,
            }}
          >
            {data?.getItem.brand}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 15,
            marginTop: 10,
          }}
        >
          <View
            style={{ flex: 1, height: 1, backgroundColor: COLORS.DARK_GREY }}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: 17,
              marginTop: 15,
              marginLeft: 15,
              fontFamily: FONTS.SEMI_BOLD,
              color: COLORS.DARK_GREY,
            }}
          >
            Year
          </Text>
          <Text
            style={{
              fontSize: 17,
              marginTop: 15,
              marginLeft: 15,
              marginRight: 15,
              fontFamily: FONTS.MEDIUM,
              color: COLORS.LIGHT_GRAY,
            }}
          >
            {data?.getItem.yearOfPurchase}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 15,
            marginTop: 10,
          }}
        >
          <View
            style={{ flex: 1, height: 1, backgroundColor: COLORS.DARK_GREY }}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 17,
              marginTop: 15,
              marginLeft: 15,
              marginRight: 15,
              fontFamily: FONTS.SEMI_BOLD,
              color: COLORS.DARK_GREY,
            }}
          >
            Description
          </Text>
          {readMore ? (
            <Text
              style={{
                marginTop: 10,
                fontSize: 17,
                marginBottom: 15,
                marginLeft: 15,
                marginRight: 15,
                borderBottomWidth: 2,
                borderColor: COLORS.EXTRA_LIGHT_GRAY,
              }}
            >
              {data?.getItem.description}
            </Text>
          ) : (
            <Text
              style={{
                marginTop: 10,
                fontSize: 17,
                marginBottom: 10,
                marginLeft: 15,
                marginRight: 15,
                borderBottomWidth: 2,
                borderColor: "#C0C0C0",
              }}
              numberOfLines={3}
            >
              {data?.getItem.description}
            </Text>
          )}
          {readMore ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginLeft: 15,
                marginRight: 15,
              }}
            >
              <TouchableOpacity onPress={() => controllRead(false)}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: FONTS.SEMI_BOLD,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  READ LESS
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginLeft: 15,
                marginRight: 15,
              }}
            >
              <TouchableOpacity onPress={() => controllRead(true)}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: FONTS.SEMI_BOLD,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  READ MORE
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <View
            style={{
              flex: 1,
              height: 4,
              backgroundColor: COLORS.EXTRA_LIGHT_GRAY,
            }}
          />
        </View>
        <View>
          <Text
            style={{
              color: "black",
              fontFamily: FONTS.SEMI_BOLD,
              fontSize: 17,
              marginTop: 12,
              marginLeft: 15,
              marginRight: 15,
              marginBottom: 7,
            }}
          >
            Barter Profile
          </Text>
          <View
            style={{ flexDirection: "row", marginLeft: 15, marginBottom: 15 }}
          >
            <Image
               source={{
            uri: `${data?.getItem.User.photoUrl}`,
            }}
              style={styles.headerImage}
            />
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
              <Text
                style={{
                  color: "black",
                  fontFamily: FONTS.SEMI_BOLD,
                  fontSize: 13,
                  marginLeft: 9,
                  marginRight: 15,
                }}
              >
                {data?.getItem.User.username}
              </Text>
              <Text
                style={{
                  color: "black",
                  fontFamily: FONTS.SEMI_BOLD,
                  fontSize: 13,
                  marginLeft: 9,
                  marginRight: 15,
                }}
              >
                {data?.getItem.User.email}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 0,
            marginBottom: 15,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 4,
              backgroundColor: COLORS.EXTRA_LIGHT_GRAY,
            }}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.PRIMARY,
              width: 350,
              paddingVertical: 8,
              borderRadius: 10,
              justifyContent: "center",
              marginTop: 4,
            }}
            onPress={() => navigation.push("MyItemBarter", { detailItem: data?.getItem })}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                marginVertical: 5,
              }}
            >
              Ajukan Barter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#2E2EFF",
              width: 350,
              paddingVertical: 8,
              borderRadius: 10,
              justifyContent: "center",
              marginTop: 20,
              marginBottom: 25,
            }}
            onPress={() =>
              navigation.push("MyChatRoom", {
                userName: data?.getItem.User.username,
                itemUserId: data?.getItem.User.id,
              })
            }
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                marginVertical: 5,
              }}
            >
              Chat
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerImage: {
    height: 65,
    width: 65,
    borderRadius: 50,
    borderWidth: 2,
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
    fontSize: 13,
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.BOLD,
  },
});

export default DetailScreen;
