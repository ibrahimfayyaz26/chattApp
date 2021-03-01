import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Home from "../screens/Home";
import AddScreen from "../screens/AddScreen";
import ChatScreen from "../screens/ChatScreen";

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
      <stack.Navigator>
        <stack.Screen name="Login" component={LoginScreen} options={options} />
        <stack.Screen
          name="Register"
          component={RegisterScreen}
          options={options}
        />
        <stack.Screen
          name="Home"
          component={Home}
          options={{
            ...options,
            ...{ headerTitle: "🖕 Whatsapp 🖕", headerBackTitleVisibl: false },
          }}
        />
        <stack.Screen
          name="Add"
          component={AddScreen}
          options={{
            ...options,
            ...{ headerTitle: "Add New Chatt" },
          }}
        />
        <stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            headerStyle: { backgroundColor: "#2c6bed" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
          }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
