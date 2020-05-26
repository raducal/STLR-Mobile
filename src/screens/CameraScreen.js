import React, { useState, useContext, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StlrContext } from "../context/StlrContext";

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { checkQrCode, message, setQrData, setMessage } = useContext(
    StlrContext
  );

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (message.length > 0) {
      alert(message);
      setMessage("");
    }
  }, [message]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    checkQrCode(data);
    setQrData(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
