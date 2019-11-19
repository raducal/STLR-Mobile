import React from "react";
import { View, StyleSheet, Image } from "react-native";

export default function SigninImage() {
  return (
    <View style={styles.viewImg}>
      <Image source={require("../../stlr.jpg")} style={styles.imageStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    width: 125,
    height: 135,
    marginBottom: 40
  },
  viewImg: {
    justifyContent: "center",
    alignItems: "center"
  }
});
