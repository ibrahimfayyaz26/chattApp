import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import { auth, db } from "../firebase";
import * as Firebase from "firebase";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginLeft: 10 }}>
          <TouchableOpacity onPress={navigation.goBack} activeOpacity={0.5}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
      headerTitle: () => (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: "1.3%",
            alignItems: "center",
          }}
        >
          <View style={{ marginRight: 25 }}>
            <Avatar
              rounded
              source={{
                uri:
                  message[0]?.data.photoURL ||
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              }}
            />
          </View>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
    });
  }, [navigation, message]);
  const sendMessage = () => {
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timeStamp: Firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setInput("");
  };
  useLayoutEffect(() => {
    const unSub = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snap) =>
        setMessage(
          snap.docs.map((item) => ({
            id: item.id,
            data: item.data(),
          }))
        )
      );
    return unSub;
  }, [route]);
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : ""}
        keyboardVerticalOffset={90}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {message.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.rec}>
                    <Avatar
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      position="absolute"
                      size={30}
                      bottom={-15}
                      right={-5}
                      rounded
                      source={{ uri: data.photoURL }}
                    />
                    <Text style={styles.recText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sen}>
                    <Avatar
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      position="absolute"
                      size={30}
                      bottom={-15}
                      right={-5}
                      rounded
                      source={{ uri: data.photoURL }}
                    />
                    <Text style={styles.senText}>{data.message}</Text>
                    <Text style={styles.senName}>{data.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder="chat Privately"
                value={input}
                onChangeText={(e) => setInput(e)}
                onSubmitEditing={() => sendMessage()}
                style={styles.input}
              />
              <Ionicons
                name="send"
                size={24}
                color="#2c6bed"
                onPress={() => sendMessage()}
              />
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  input: {
    bottom: 0,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    borderColor: "transparent",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
    flex: 1,
    height: 40,
  },
  footer: {
    width: "100%",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  rec: {
    padding: 15,
    backgroundColor: "#ececec",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    maxWidth: "80%",
    position: "relative",
    marginBottom: 30,
  },
  sen: {
    padding: 15,
    backgroundColor: "#2b68e6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  recText: {
    color: "black",
    marginLeft: 15,
    marginBottom: 15,
    fontWeight: "500",
  },
  senText: {
    color: "white",
    marginLeft: 15,
    fontWeight: "500",
  },
  senName: {
    left: 10,
    paddingRight: 10,
    fontSize: 12,
    color: "white",
  },
});
