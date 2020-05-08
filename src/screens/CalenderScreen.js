import React, { useContext, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Header from "../components/SigninScreenComponents/Header";
import { StlrContext } from "../context/StlrContext";
import CalendarModal from "../components/CalendarModal";

export default function CalenderScreen() {
  const { username, events } = useContext(StlrContext);
  const [modalActive, setModalActive] = useState(false);
  const [marked, setMarked] = useState([]);

  const markEvents = () => {
    let marked = {};
    events[0].map((event) => {
      if (event.due) {
        let date;
        if (
          `${new Date(event.due).getMonth()}`.length < 2 &&
          `${new Date(event.due).getDate()}`.length < 2
        ) {
          date = `${new Date(event.due).getFullYear()}-0${
            new Date(event.due).getMonth() + 1
          }-0${new Date(event.due).getDate()}`;
        } else if (`${new Date(event.due).getMonth()}`.length < 2) {
          date = `${new Date(event.due).getFullYear()}-0${
            new Date(event.due).getMonth() + 1
          }-${new Date(event.due).getDate()}`;
        } else if (`${new Date(event.due).getDate()}`.length < 2) {
          date = `${new Date(event.due).getFullYear()}-${
            new Date(event.due).getMonth() + 1
          }-0${new Date(event.due).getDate()}`;
        } else {
          date = `${new Date(event.due).getFullYear()}-${
            new Date(event.due).getMonth() + 1
          }-${new Date(event.due).getDate()}`;
        }

        marked[date] = {
          customStyles: {
            container: {
              backgroundColor: "green",
            },
            text: {
              color: "#fff",
            },
          },
        };
      }
    });

    return marked;
  };

  return (
    <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
      <Header message="Calendar" options={false} username={username} />
      {modalActive ? (
        <CalendarModal
          modalActive={modalActive}
          setModalActive={setModalActive}
          marked={marked}
        />
      ) : (
        <></>
      )}
      <CalendarList
        // Callback which gets executed when visible months change in scroll view. Default = undefined
        // onVisibleMonthsChange={(months) => {
        //   console.log("now these months are visible", months);
        // }}
        current={Date()}
        markingType={"custom"}
        markedDates={markEvents()}
        onDayPress={(day) => {
          let tempMarked = events[0];
          let currentMarked = [];

          tempMarked.forEach((event) => {
            if (
              new Date(event.due).getDate() === day.day &&
              new Date(event.due).getMonth() + 1 === day.month &&
              new Date(event.due).getFullYear() === day.year
            ) {
              currentMarked.push(event.title);
            }
          });

          if (currentMarked.length > 0) {
            setMarked(currentMarked);
            setModalActive(true);
          }
        }}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={50}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={50}
        // Enable or disable scrolling of calendar list
        scrollEnabled={true}
        // Enable or disable vertical scroll indicator. Default = false
        showScrollIndicator={true}
      />

      {/* <Calendar
        // Initially visible month. Default = Date()
        current={Date()}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={"2019-01-01"}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
        markingType={"custom"}
        markedDates={markEvents()}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          console.log("selected day", day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"MM yyyy"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          console.log("month changed", month);
        }}
        // Hide month navigation arrows. Default = false
        hideArrows={false}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        renderArrow={(direction) => {
          if (direction === "left") {
            return <Text>l</Text>;
          }

          return <Text>r</Text>;
        }}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={false}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        firstDay={1}
        // Hide day names. Default = false
        hideDayNames={false}
        // Show week numbers to the left. Default = false
        showWeekNumbers={false}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(substractMonth) => substractMonth()}
        // Handler which gets executed when press arrow icon left. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
      /> */}
    </SafeAreaView>
  );
}
