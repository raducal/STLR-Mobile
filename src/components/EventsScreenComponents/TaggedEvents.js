import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

export default function TaggedEvents({ data }) {
  return (
    <View style={styles.mainView}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.eventView}>
            <View style={styles.eventDateView}>
              <Text style={styles.eventContent}>{item.Date}</Text>
            </View>
            <View style={styles.eventDescView}>
              <View style={styles.eventContent}>
                <Text style={styles.titleStyle}>{item.title}</Text>
                <Text>{item.Description}</Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={item => item.title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: 15,
    flex: 1
  },
  eventView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: "#f3f3f3",
    flexDirection: "row",
    height: 130,
    marginVertical: 15
  },
  eventDateView: {
    flex: 1,
    backgroundColor: "#E8E8E8"
  },
  eventDescView: {
    flex: 3
  },
  titleStyle: {
    fontSize: 20,
    paddingBottom: 15
  },
  eventContent: {
    padding: 10
  }
});
