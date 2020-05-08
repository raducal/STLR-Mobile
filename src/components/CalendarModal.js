import React from "react";
import { Text, View, Modal, TouchableOpacity } from "react-native";

const CalendarModal = ({ modalActive, setModalActive, marked }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalActive}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          width: "100%",
        }}
      >
        <View style={{ marginHorizontal: 40 }}>
          <View
            style={{
              height: 250,
              width: "100%",
              backgroundColor: "#fff",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <View style={{ flex: 5, marginTop: 25, paddingHorizontal: 30 }}>
              {marked.map((event, index) => {
                return (
                  <Text key={index} style={{ fontSize: 14, marginBottom: 10 }}>
                    {event}
                  </Text>
                );
              })}
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setModalActive(false);
                }}
                style={{
                  borderColor: "#333",
                  borderWidth: 1,
                  paddingVertical: 10,
                  borderBottomEndRadius: 10,
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18 }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CalendarModal;
