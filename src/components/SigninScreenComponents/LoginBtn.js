import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const LoginBtn = ({ handleSubmit }) => {
  return (
    <TouchableOpacity
      style={styles.loginBtn}
      onPress={() => {
        handleSubmit();
      }}
    >
      <Text style={styles.loginBtnText}>LOGIN</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginBtn: {
    alignSelf: "stretch",
    marginHorizontal: 30,
    marginTop: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "lightseagreen"
  },
  loginBtnText: {
    color: "#f7f7f7",
    fontWeight: "bold",
    fontSize: 17
  }
});

export default LoginBtn;
