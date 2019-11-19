import React from "react";
import { Text, View, Modal, TouchableOpacity } from "react-native";

export default function StlrModal({ modal, setModal }) {
  return (
    <Modal animationType="slide" transparent={true} visible={modal}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          width: "100%"
        }}
      >
        <View style={{ marginHorizontal: 40 }}>
          <View
            style={{
              height: 250,
              width: "100%",
              backgroundColor: "#fff",
              alignItems: "center",
              borderRadius: 10
            }}
          >
            <View style={{ flex: 5, marginTop: 25, paddingHorizontal: 30 }}>
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                Invalid Username or Passowrd
              </Text>
              <Text style={{ fontSize: 14 }}>
                Please use your Student ID and password to access the STLR app.
                All students who wish to access the application must be enrolled
                in the Transformative Learning module on Moodle
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                width: "100%"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setModal(false);
                }}
                style={{
                  borderColor: "#333",
                  borderWidth: 1,
                  paddingVertical: 10,
                  borderBottomEndRadius: 10,
                  width: "100%",
                  alignItems: "center"
                }}
              >
                <Text style={{ fontSize: 18 }}>Try Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
