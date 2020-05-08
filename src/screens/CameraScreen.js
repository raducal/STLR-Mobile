import React, { useState, useContext, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { NavigationEvents } from "react-navigation";
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

// export default class CameraScreen extends Component {
//   static contextType = StlrContext;

//   state = {
//     hasCameraPermission: null,
//     type: Camera.Constants.Type.back,
//     isFocused: true,
//     scanned: false,
//     qrInfo: "",
//     message: "",
//   };

//   async componentWillMount() {
//     const { status } = await Permissions.askAsync(Permissions.CAMERA);
//     this.setState({ hasCameraPermission: status === "granted" });
//   }

//   handleBarCode = ({ type, data }) => {
//     const { setQrData, checkQrCode, message } = this.context;
//     this.setState({ scanned: true });
//     checkQrCode(data);
//     setQrData(data);
//     alert(message);
//     setTimeout(() => {
//       this.handleBarCodeNotScanned();
//     }, 2000);
//   };

//   handleBarCodeNotScanned = () => {
//     this.setState({ scanned: false });
//   };

//   render() {
//     const { hasCameraPermission, scanned } = this.state;

//     if (hasCameraPermission === null) {
//       return <View />;
//     } else if (hasCameraPermission === false) {
//       return <Text>No access</Text>;
//     } else {
//       if (this.state.isFocused === false) {
//         return (
//           <NavigationEvents
//             onWillFocus={(payload) => {
//               //console.log("will focus", payload);
//               this.setState({ isFocused: true });
//             }}
//             onDidBlur={(payload) => {
//               //console.log('did leave',payload)
//               this.setState({ isFocused: false });
//             }}
//           />
//         );
//       } else {
//         return (
//           <View
//             style={{
//               flex: 1,
//               flexDirection: "column",
//               justifyContent: "flex-end",
//             }}
//           >
//             <NavigationEvents
//               onWillFocus={(payload) => {
//                 this.setState({ isFocused: true });
//               }}
//               onDidBlur={(payload) => {
//                 this.setState({ isFocused: false });
//               }}
//             />
//             <BarCodeScanner
//               onBarCodeScanned={scanned ? undefined : this.handleBarCode}
//               style={StyleSheet.absoluteFillObject}
//             />
//             {/* // </Camera> */}
//           </View>
//         );
//       }
//     }
//   }
// }

const styles = StyleSheet.create({});
