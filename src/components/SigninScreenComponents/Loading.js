import React from "react";
import { Text, View, Image } from "react-native";

export default function Loading() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={require("../../loading.gif")} />
      <Text>Please wait</Text>
    </View>
  );
}
