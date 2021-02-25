import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Home from "../screens/Home";

const stack = createStackNavigator();

const AppNavigation = () => {
  const options = {
    headerTitleAlign: "center",
    headerStyle: { backgroundColor: "#2c6bed" },
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
  };

  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Home">
        <stack.Screen name="Login" component={LoginScreen} options={options} />
        <stack.Screen
          name="Register"
          component={RegisterScreen}
          options={options}
        />
        <stack.Screen
          name="Home"
          component={Home}
          options={{ ...options, ...{ headerTitle: "🖕 Whatsapp 🖕" } }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
