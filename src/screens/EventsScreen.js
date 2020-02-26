import React, { useEffect, useContext, useState } from "react";
import { SafeAreaView } from "react-navigation";
import { Text } from "react-native";

import Header from "../components/SigninScreenComponents/Header";
import TaggedEvents from "../components/EventsScreenComponents/TaggedEvents";
import { StlrContext } from "../context/StlrContext";

// fake data
const fakeevents = [
  {
    title: "STLR 1",
    due: "19/08/2019",
    Description: "Very cool event",
    qrID: "1"
  },
  {
    title: "STLR 2",
    due: "19/08/2019",
    Description: "Very shit event",
    qrID: "2"
  },
  {
    title: "STLR 3",
    due: "19/08/2019",
    Description: "cool event",
    qrID: "3"
  },
  {
    title: "STLR 4",
    due: "19/08/2019",
    Description: "Very cool",
    qrID: "4"
  },
  {
    title: "STLR 5",
    Date: "19/08/2019",
    Description: "Very cool",
    qrID: "5"
  }
];

const fakeStudentEvents = [
  {
    title: "STLR 10",
    Date: "19/08/2019",
    Description: "Very cool event"
  },
  {
    title: "STLR 21",
    Date: "19/08/2019",
    Description: "Very shit event"
  },
  {
    title: "STLR 39",
    Date: "19/08/2019",
    Description: "cool event"
  },
  {
    title: "STLR 44",
    Date: "19/08/2019",
    Description: "Very cool"
  },
  {
    title: "STLR 59",
    Date: "19/08/2019",
    Description: "Very cool"
  }
];

const EventsScreen = () => {
  const {
    events,
    username,
    setUsername,
    getEvents,
    isAuthenticated
  } = useContext(StlrContext);
  const [active, setActive] = useState(false);
  const [current, setCurrent] = useState([]);

  useEffect(() => {
    getEvents();
    setUsername(username.toUpperCase());
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
      <Header
        message="Events"
        username={username}
        options={true}
        active={active}
        setActive={setActive}
      />
      {!isAuthenticated ? <Text>Nope</Text> : <TaggedEvents data={events[0]} />}
    </SafeAreaView>
  );
};

export default EventsScreen;
