import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { NavigationEvents } from "react-navigation";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SafeAreaView } from "react-navigation";

export default class CameraScreen extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    isFocused: true,
    scanned: false
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  handleBarCode = ({ type, data }) => {
    this.setState({ scanned: true });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setTimeout(() => {
      this.handleBarCodeNotScanned();
    }, 2000);
  };

  handleBarCodeNotScanned = () => {
    this.setState({ scanned: false });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access</Text>;
    } else {
      if (this.state.isFocused === false) {
        return (
          <NavigationEvents
            onWillFocus={payload => {
              //console.log("will focus", payload);
              this.setState({ isFocused: true });
            }}
            onDidBlur={payload => {
              //console.log('did leave',payload)
              this.setState({ isFocused: false });
            }}
          />
        );
      } else {
        return (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-end"
            }}
          >
            <NavigationEvents
              onWillFocus={payload => {
                this.setState({ isFocused: true });
              }}
              onDidBlur={payload => {
                this.setState({ isFocused: false });
              }}
            />
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : this.handleBarCode}
              style={StyleSheet.absoluteFillObject}
            />
            {/* // </Camera> */}
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({});
