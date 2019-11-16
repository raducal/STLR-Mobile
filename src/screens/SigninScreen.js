import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

import SigninImage from "../components/SigninScreenComponents/SigninImage";
import Input from "../components/SigninScreenComponents/Input";
import LoginBtn from "../components/SigninScreenComponents/LoginBtn";
import Loading from "../components/SigninScreenComponents/Loading";

export default class SigninScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      password: "",
      loading: false
    };
  }

  setUsername = text => {
    this.setState({
      username: text
    });
  };

  setPassword = text => {
    this.setState({
      password: text
    });
  };

  getInfo = async () => {
    try {
      const response = await fetch(
        `http://c78cdf28.ngrok.io/scrape?username=${this.state.username}&password=${this.state.password}`
      );
      const data = await response.json();
      console.log(response.status);
      if (response.status !== 200) {
        this.setState({ loading: false });
        this.setPassword("");
        this.setUsername("");
      } else {
        this.setState({ loading: false });
        this.props.navigation.navigate("EventsList");
        return data;
      }
    } catch (error) {
      throw error;
    }
  };

  handleSubmit = async () => {
    this.setState({
      loading: true
    });
    if (this.state.username === "" && this.state.password === "") {
      return console.log("try again");
    }

    if (!this.state.username.includes("B000")) {
      console.log(this.state);
      this.setUsername("");
      this.setPassword("");
      return console.log("invalid username");
    }

    await this.getInfo();
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <Loading />
        ) : (
          <View style={styles.viewMain}>
            <SigninImage />
            <View style={styles.inputView}>
              <Input
                styles={styles.viewStyle}
                iconName="user-graduate"
                inputStyle={styles.input}
                placeholder="Student Number"
                setter={this.setUsername}
                choice={false}
                label={this.state.username}
              />
              <Input
                styles={[styles.inputMargin, styles.viewStyle]}
                iconName="lock"
                inputStyle={styles.input}
                placeholder="Password"
                setter={this.setPassword}
                choice={true}
                label={this.state.password}
              />
              <LoginBtn
                navigation={this.props.navigation}
                handleSubmit={this.handleSubmit}
                username={this.state.username}
                password={this.state.password}
              />
              <View style={styles.descriptionView}>
                <Text style={styles.descriptionViewText}>
                  Please make sure you are enrolled in the Transformative
                  Learning course on Moodle
                </Text>
              </View>
            </View>
          </View>
        )}
      </>
    );
  }
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
