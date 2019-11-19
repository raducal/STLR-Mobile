import React, { useEffect, useContext, useState } from "react";
import { SafeAreaView } from "react-navigation";

import Header from "../components/SigninScreenComponents/Header";
import TaggedEvents from "../components/EventsScreenComponents/TaggedEvents";
import { StlrContext } from "../context/StlrContext";

// fake data
const fakeevents = [
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
  const { events, username, setUsername } = useContext(StlrContext);
  const [active, setActive] = useState(false);

  useEffect(() => {
    (async () => {
      setUsername(username.toUpperCase());
      // await console.log(events);
    })();
  });

  return (
    <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
      <Header
        message="Events"
        username={username}
        options={true}
        active={active}
        setActive={setActive}
      />
      {active ? (
        <TaggedEvents data={fakeStudentEvents} />
      ) : (
        <TaggedEvents data={fakeevents} />
      )}
    </SafeAreaView>
  );
};

export default EventsScreen;
