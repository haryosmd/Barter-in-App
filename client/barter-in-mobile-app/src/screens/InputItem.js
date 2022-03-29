import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Keyboard,
  Alert,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
import Input from "../constants/Input";
import TextInputDesc from "../constants/TextInputDesc";
import TextInputTitle from "../constants/TextInputTitle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../constants/Button";
import Loader from "../constants/Loader";

import { useMutation } from "@apollo/client";

import { POST_ITEM, GET_MY_ADS } from "../../lib/apollo/queries/items";

const { width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;

const InputItem = ({ route }) => {
  const navigation = useNavigation();
  const [inputs, setInputs] = React.useState({
    title: "",
    description: "",
    brand: "",
    yearOfPurchase: "",
    category: route.params.id,
  });
  const [errors, setErrors] = React.useState({});
  const [loaded, setLoading] = React.useState(false);
  const [adsImage, setProfileImage] = useState({
    image1: "",
    image2: "",
    image3: "",
  });

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      if (!response.cancelled) {
        setProfileImage((prevState) => ({
          ...prevState,
          image1: response.uri,
        }));
      }
    }
  };

  const openImageLibrary2 = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      if (!response.cancelled) {
        setProfileImage((prevState) => ({
          ...prevState,
          image2: response.uri,
        }));
      }
    }
  };

  const openImageLibrary3 = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      if (!response.cancelled) {
        setProfileImage((prevState) => ({
          ...prevState,
          image3: response.uri,
        }));
      }
    }
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.title) {
      handleError("Title is required", "title");
      isValid = false;
    } else if (inputs.title.length < 15) {
      handleError("Min title length of 15", "title");
      isValid = false;
    }

    if (!inputs.description) {
      handleError("Description is required", "description");
      isValid = false;
    } else if (inputs.description.length < 20) {
      handleError("Min description length of 20", "description");
      isValid = false;
    }
    

    if (!inputs.brand) {
      handleError("Brand is required", "brand");
      isValid = false;
    }

    if (!inputs.yearOfPurchase) {
      handleError("Year Purchase is required", "yearOfPurchase");
      isValid = false;
    }

    if (!adsImage.image1) {
      handleError("3 photos must be selected", "imageUrl");
      isValid = false;
    } else if (!adsImage.image2) {
      handleError("3 photos must be selected", "imageUrl");
      isValid = false;
    } else if (!adsImage.image3) {
      handleError("3 photos must be selected", "imageUrl");
      isValid = false;
    } else if (!adsImage.image1 && !adsImage.image2 && !adsImage.image3) {
      handleError("3 photos must be selected", "imageUrl");
      isValid = false;
    }

    if (isValid) {
      addAds();
    }
  };

  const [fieldsInput, { data, loading, error }] = useMutation(POST_ITEM, {
    refetchQueries: [GET_MY_ADS, "GetMyAds"],
  });

  const addAds = async () => {
    setLoading(true);
      const formData = new FormData();
      let filename3 = adsImage.image3.split("/").pop();
      let match3 = /\.(\w+)$/.exec(filename3);
      let type3 = match2 ? `image/${match3[1]}` : `image`;

      let filename2 = adsImage.image2.split("/").pop();
      let match2 = /\.(\w+)$/.exec(filename2);
      let type2 = match2 ? `image/${match2[1]}` : `image`;

      let filename = adsImage.image1.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      formData.append("image", {
        uri: adsImage.image1,
        name: filename,
        type,
      });
      formData.append("image", {
        uri: adsImage.image2,
        name: filename2,
        type2,
      });
      formData.append("image", {
        uri: adsImage.image3,
        name: filename3,
        type3,
      });

      try {
        const token = await AsyncStorage.getItem("access_token");
        const responseImage = await fetch(
          `https://barterin-server.herokuapp.com/users/myImage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
              access_token: token,
            },
            body: formData,
          }
        );
        if (!responseImage.ok) {
          const message = `An error has occured: ${responseImage.status}`;
          throw new Error(message);
        } else {
          let itemImage = await responseImage.json();
          let fieldsInputs = {
            title: inputs.title,
            category: inputs.category,
            description: inputs.description,
            brand: inputs.brand,
            yearOfPurchase: inputs.yearOfPurchase,
            imageFields: itemImage,
          };
          fieldsInput({
            variables: { newItem: fieldsInputs, accessToken: token },
          });
          setLoading(false);
          navigation.navigate("MY ADS");
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Something went wrong");
        setLoading(false);
      }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
      <Loader visible={loaded} style={{ marginBottom: 50 }} />
      <ScrollView
        contentContainerStyle={{ paddingTop: 25, paddingHorizontal: 20 }}
      >
        <Text style={{ color: COLORS.BLACK, fontSize: 40, fontWeight: "bold" }}>
          Include some details
        </Text>
        <View style={{ marginVertical: 20 }}>
          <TextInputTitle
            onChangeText={(text) => handleOnchange(text, "title")}
            onFocus={() => handleError(null, "title")}
            iconName="format-title"
            label="Ad title*"
            placeholder="Key features of your title"
            error={errors.title}
            maxLength={70}
          />
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Text>{inputs.title.length}/70</Text>
          </View>

          <TextInputDesc
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => handleOnchange(text, "description")}
            onFocus={() => handleError(null, "description")}
            iconName="card-text-outline"
            label="Additional information*"
            placeholder="Include conditional, features and reasons for selling"
            error={errors.description}
            maxLength={4096}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginBottom: 5,
            }}
          >
            <Text>{inputs.description.length}/4096</Text>
          </View>

          <Input
            onChangeText={(text) => handleOnchange(text, "brand")}
            onFocus={() => handleError(null, "brand")}
            iconName="tshirt-v-outline"
            label="Brand*"
            placeholder="Brand"
            error={errors.brand}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "yearOfPurchase")}
            onFocus={() => handleError(null, "yearOfPurchase")}
            iconName="update"
            label="Year Purchase*"
            placeholder="Year Purchase"
            error={errors.yearOfPurchase}
          />

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onFocus={() => handleError(null, "imageUrl")}
              onPress={openImageLibrary}
              style={styles.uploadBtnContainer}
              error={errors.image1}
            >
              {adsImage.image1 ? (
                <Image
                  source={{ uri: adsImage.image1 }}
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <Text style={styles.uploadBtn}>Upload Ad Image</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onFocus={() => handleError(null, "imageUrl")}
              onPress={openImageLibrary2}
              error={errors.image2}
              style={styles.uploadBtnContainer}
            >
              {adsImage.image2 ? (
                <Image
                  source={{ uri: adsImage.image2 }}
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <Text style={styles.uploadBtn}>Upload Ad Image</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onFocus={() => handleError(null, "imageUrl")}
              onPress={openImageLibrary3}
              error={errors.image3}
              style={styles.uploadBtnContainer}
            >
              {adsImage.image3 ? (
                <Image
                  source={{ uri: adsImage.image3 }}
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <Text style={styles.uploadBtn}>Upload Ad Image</Text>
              )}
            </TouchableOpacity>
          </View>
          {errors.imageUrl && (
            <Text
              style={{ marginTop: 7, color: COLORS.PERSIAN_RED, fontSize: 12 }}
            >
              {errors.imageUrl}
            </Text>
          )}
          <Button title="Submit" onPress={validate} />
        </View>
      </ScrollView>
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
  uploadBtnContainer: {
    height: 100,
    width: 100,
    borderRadius: 125 / 2,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    overflow: "hidden",
    marginRight: 15,
  },
  uploadBtn: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.3,
    fontWeight: "bold",
  },
});

export default InputItem;
