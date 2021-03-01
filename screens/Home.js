import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-elements";
import ChatList from "../components/ChatList";
import { auth, db } from "../firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const [chat, setChat] = useState([]);
  useEffect(() => {
    const unSub = db.collection("chats").onSnapshot((snap) =>
      setChat(
        snap.docs.map((item) => ({
          id: item.id,
          data: item.data(),
        }))
      )
    );
    return unSub;
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginStart: 15,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              auth.signOut().then(() => navigation.replace("Login"))
            }
          >
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginEnd: 15,
            flexDirection: "row",
          }}
        >
          <View style={{ marginStart: 20 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Add")}>
              <SimpleLineIcons name="pencil" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      ),
    });
  }, [navigation]);

  const ChatScreen = (id, chatName) => {
    navigation.navigate("Chat", {
      id: id,
      chatName: chatName,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
        <View style={styles.container}>
          {chat.map(({ id, data: { chatName } }) => (
            <ChatList
              key={id}
              id={id}
              chatName={chatName}
              ChatScreen={() => ChatScreen(id, chatName)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
