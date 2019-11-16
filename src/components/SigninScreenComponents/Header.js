import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header({ message }) {
  return (
    <View style={styles.topView}>
      <Text style={styles.topViewText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topView: {
    backgroundColor: "lightseagreen",
    height: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  topViewText: {
    fontSize: 25
  }
});
