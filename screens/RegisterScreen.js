import React, { useLayoutEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Button, Input, Image, Text } from "react-native-elements";
import { Formik } from "formik";
import * as yup from "yup";

let schema = yup.object().shape({
  fullName: yup.string().required().min(4).max(20),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const RegisterScreen = ({ navigation }) => {
  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        password: "",
        picture: "",
      }}
      validationSchema={schema}
      onSubmit={(value) => {
        console.log(value);
      }}
    >
      {(props) => {
        return (
          <KeyboardAvoidingView style={styles.container}>
            <Text style={{ marginBottom: 50, fontSize: 18 }}>
              Create Private Chat With Ibrahim Account
            </Text>
            <View style={styles.inputContainer}>
              <Input
                placeholder="Full Name"
                value={props.values.fullName}
                onChangeText={props.handleChange("fullName")}
                onBlur={props.handleBlur("fullName")}
              />
              <Text style={{ color: "red" }}>
                {props.touched.fullName && props.errors.fullName}
              </Text>
              <Input
                placeholder="Email"
                keyboardType="email-address"
                value={props.values.email}
                onChangeText={props.handleChange("email")}
                onBlur={props.handleBlur("email")}
              />
              <Text style={{ color: "red" }}>
                {props.touched.email && props.errors.email}
              </Text>
              <Input
                placeholder="Password"
                secureTextEntry
                value={props.values.password}
                onChangeText={props.handleChange("password")}
                onBlur={props.handleBlur("password")}
              />
              <Text style={{ color: "red" }}>
                {props.touched.password && props.errors.password}
              </Text>
              <Input
                placeholder="Picture Url"
                value={props.values.picture}
                onChangeText={props.handleChange("picture")}
                onBlur={props.handleBlur("picture")}
              />
            </View>
            <Button
              containerStyle={styles.button}
              title="Register"
              onPress={props.handleSubmit}
            />
            <View style={{ height: 80 }} />
          </KeyboardAvoidingView>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});

export default RegisterScreen;
