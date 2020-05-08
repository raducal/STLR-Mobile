import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Header({
  message,
  username,
  options,
  active,
  setActive,
}) {
  return (
    <View style={styles.topView}>
      <View style={styles.heading}>
        <Text style={styles.topViewText}>Your {message}</Text>
        <Text style={{ fontSize: 14, color: "#E0E0E0" }}>{username}</Text>
      </View>
      {/* {options ? (
        <View style={styles.buttonViews}>
          <TouchableOpacity
            style={
              active
                ? styles.buttons
                : [styles.buttons, { backgroundColor: "#17827d" }]
            }
            onPress={() => setActive(!active)}
          >
            <Text style={{ fontSize: 14, color: "#E0E0E0" }}>
              Tagged Events
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              active
                ? [styles.buttons, { backgroundColor: "#17827d" }]
                : styles.buttons
            }
            onPress={() => setActive(!active)}
          >
            <Text style={{ fontSize: 14, color: "#E0E0E0" }}>
              Student Events
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  topView: {
    backgroundColor: "lightseagreen",
    height: 120,
    flexDirection: "column",
    lineHeight: 50,
    paddingTop: 10,
  },
  heading: {
    paddingHorizontal: 15,
  },
  buttonViews: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    color: "#fff",
  },
  buttons: {
    flex: 1,
    alignItems: "center",
    borderColor: "rgba(255, 255, 255, 0.4)",
    paddingVertical: 8,
    borderWidth: 1,
  },
  topViewText: {
    fontSize: 20,
    paddingBottom: 5,
    color: "#E0E0E0",
  },
});
