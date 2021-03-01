import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { auth, db } from "../firebase";

const ChatList = ({ id, chatName, ChatScreen }) => {
  const [mes, setMes] = useState([]);
  useEffect(() => {
    const unSub = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snap) =>
        setMes(
          snap.docs.map((item) => ({
            data: item.data(),
          }))
        )
      );
    return unSub;
  }, []);
  return (
    <ListItem key={id} bottomDivider onPress={ChatScreen}>
      <Avatar
        rounded
        source={{
          uri:
            mes?.[0]?.data.photoURL ||
            "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "bold" }}>
          {chatName ? chatName : "unknown"}
        </ListItem.Title>
        <ListItem.Subtitle
          style={{ fontSize: 15 }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {mes?.[0]?.data.displayName} : {mes?.[0]?.data.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default ChatList;

const styles = StyleSheet.create({});
