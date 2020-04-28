import React, { useContext, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { StlrContext } from "../context/StlrContext";

import SigninImage from "../components/SigninScreenComponents/SigninImage";
import Input from "../components/SigninScreenComponents/Input";
import LoginBtn from "../components/SigninScreenComponents/LoginBtn";
import Loading from "../components/SigninScreenComponents/Loading";
import StlrModal from "../components/SigninScreenComponents/StlrModal";

export default function SigninScreen({ navigation }) {
  const {
    loading,
    username,
    password,
    setPassword,
    setUsername,
    handleSubmit,
    modal,
    setModal,
    getScreenSize
  } = useContext(StlrContext);

  useEffect(() => {
    getScreenSize();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.viewMain}>
          <StlrModal modal={modal} setModal={setModal} />
          <SigninImage />
          <View style={styles.inputView}>
            <Input
              styles={styles.viewStyle}
              iconName="user-graduate"
              inputStyle={styles.input}
              placeholder="Student Number"
              setter={setUsername}
              choice={false}
              label={username}
            />
            <Input
              styles={[styles.inputMargin, styles.viewStyle]}
              iconName="lock"
              inputStyle={styles.input}
              placeholder="Password"
              setter={setPassword}
              choice={true}
              label={password}
            />

            <LoginBtn
              navigation={navigation}
              handleSubmit={handleSubmit}
              username={username}
              password={password}
            />
            <View style={styles.descriptionView}>
              <Text style={styles.descriptionViewText}>
                Please make sure you are enrolled in the Transformative Learning
                course on Moodle
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  viewMain: {
    flex: 1,
    alignItems: "center",
    paddingTop: 120
  },
  inputView: {
    flex: 1,
    alignSelf: "stretch"
  },
  viewStyle: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    marginHorizontal: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "lightgrey",
    borderWidth: 1
  },
  input: {
    flex: 1,
    paddingLeft: 20
  },
  inputMargin: {
    marginTop: 25
  },
  descriptionView: {
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 40,
    height: 50,
    fontSize: 20
  },
  descriptionViewText: {
    lineHeight: 25,
    textAlign: "center"
  }
});
