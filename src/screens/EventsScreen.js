import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-navigation";

import Header from "../components/SigninScreenComponents/Header";

// fake data
const events = [
  {
    title: "STLR 1",
    Date: "19/08/2019",
    Description: "Very cool event"
  },
  {
    title: "STLR 2",
    Date: "19/08/2019",
    Description: "Very shit event"
  },
  {
    title: "STLR 3",
    Date: "19/08/2019",
    Description: "cool event"
  },
  {
    title: "STLR 4",
    Date: "19/08/2019",
    Description: "Very cool"
  },
  {
    title: "STLR 5",
    Date: "19/08/2019",
    Description: "Very cool"
  }
];

const EventsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
      <Header message="Upcoming Events" />
      <View style={styles.mainView}>
        <FlatList
          data={events}
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
    </SafeAreaView>
  );
};

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

export default EventsScreen;
