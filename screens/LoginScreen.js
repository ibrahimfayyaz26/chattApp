import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { stopClock } from "react-native-reanimated";
import { auth } from "../firebase";

const LoginScreen = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");

  const loginF = () => {
    return console.log("Login");
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((us) => {
      if (us) {
        props.navigation.replace("Home");
        console.log(us);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.container}>
        <Image
          style={{ width: 200, height: 200 }}
          source={require("../assets/chatt.png")}
        />
        <View style={styles.input}>
          <Input
            placeholder="Email"
            autoCompleteType="email"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Password"
            autoCompleteType="password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <Button title="Login" containerStyle={styles.button} onPress={loginF} />
        <Button
          title="Register"
          type="outline"
          containerStyle={styles.button}
          onPress={() => props.navigation.navigate("Register")}
        />
        <StatusBar style="auto" />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    alignItems: "center",
  },
  input: {
    width: 300,
    marginTop: 10,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});

export default LoginScreen;
