import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChooseCategoryScreen from "../screens/ChooseCategory";
import InputItemScreen from "../screens/InputItem";
import COLORS from "../constants/Colors";

const Stack = createNativeStackNavigator();

const PostItemRouter = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChooseCategory"
        component={ChooseCategoryScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InputItem"
        component={InputItemScreen}
        options={{
          headerBackTitleVisible: false,
          title: "",
          headerTintColor: COLORS.PRIMARY,
        }}
      />
    </Stack.Navigator>
  );
};

export default PostItemRouter;
