import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db } from "../firebase";
import { Input, Button } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

const AddScreen = ({ navigation }) => {
  const [input, setInput] = useState();
  const adding = async () => {
    await db
      .collection("chats")
      .add({
        chatName: input,
      })
      .then(() => {
        navigation.goBack();
        setInput("");
      });
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ width: "85%" }}>
        <Input
          placeholder="Add New Chat"
          value={input}
          onChangeText={(text) => setInput(text)}
          leftIcon={
            <View style={{ marginEnd: 10 }}>
              <AntDesign name="wechat" size={24} color="black" />
            </View>
          }
        />
      </View>
      <Button
        disabled={!input}
        title="ADD"
        containerStyle={{ width: "50%", marginTop: 10 }}
        onPress={adding}
      />
    </View>
  );
};

export default AddScreen;
