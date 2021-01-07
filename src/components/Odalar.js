import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Avatar from "./Avatar";
import vt from "./firebase";

export default function Odalar({ yeniOda, id, name }) {
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      vt.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  const odaOlustur = () => {
    const roomName = prompt("Yeni oda için bir isim girin...");
    if (roomName) {
      vt.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !yeniOda ? (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          alert("Sohbete Git");
        }}
      >
        <View style={styles.room}>
          <View style={styles.avatar}>
            <Avatar />
          </View>
          <View>
            <Text style={styles.roomname}>{name}</Text>
            <Text style={styles.subtext}>{messages[0]?.messages}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  ) : (
    <View>
      <TouchableOpacity onPress={odaOlustur}>
        <View style={styles.eklecontainer}>
          <Text style={styles.ekle}>+ Oda Ekleyin!</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  room: {
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  avatar: {
    marginHorizontal: 10,
  },
  roomname: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtext: {
    fontSize: 18,
  },
  eklecontainer: {
    height: 90,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  ekle: {
    height: 90,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 30,
  },
});
