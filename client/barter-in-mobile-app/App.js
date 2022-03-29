import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, ActivityIndicator, View, AppLoading } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/routes/index";
import { AuthContext } from "./src/components/context";
import { useFonts } from "expo-font";
import client from "./lib/apollo/connection";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApolloProvider } from "@apollo/client";

const App = () => {

  const [fontsLoaded] = useFonts({
    Regular: require("./assets/fonts/Poppins-Regular.ttf"),
    Bold: require("./assets/fonts/Poppins-Bold.ttf"),
    Black: require("./assets/fonts/Poppins-Black.ttf"),
    ExtraBold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    ExtraLight: require("./assets/fonts/Poppins-ExtraLight.ttf"),
    Light: require("./assets/fonts/Poppins-Light.ttf"),
    SemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    Medium: require("./assets/fonts/Poppins-Medium.ttf"),
    Italic: require("./assets/fonts/Poppins-Italic.ttf"),
  });

  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

   const authContext = React.useMemo(() => ({
    signOut: async() => {
      try {
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem("username");
        await AsyncStorage.removeItem("email");
        await AsyncStorage.removeItem("photoUrl");
        setUserToken(null);
        setIsLoading(false);
      } catch(e) {
        console.log(e);
      }
    },
   }), []);
  
    useEffect(() => {
      setTimeout(async() => {
        setIsLoading(false);
        try {
          await AsyncStorage.getItem('access_token');
        } catch(err) {
          console.log(err);
        }
      }, 1000);
  }, []);
  
  if( isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return fontsLoaded ? (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      </AuthContext.Provider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
};

export default App;

const styles = StyleSheet.create({});
