import React, { useContext } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Header from "../components/SigninScreenComponents/Header";
import { StlrContext } from "../context/StlrContext";

export default function CalenderScreen() {
  const { username } = useContext(StlrContext);
  return (
    <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
      <Header message="Calendar" options={false} username={username} />
      <Calendar
        // Initially visible month. Default = Date()
        current={Date()}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={"2019-09-10"}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={day => {
          console.log("selected day", day);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={day => {
          console.log("selected day", day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"MM yyyy"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={month => {
          console.log("month changed", month);
        }}
        // Hide month navigation arrows. Default = false
        hideArrows={true}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        renderArrow={direction => <Arrow />}
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
        onPressArrowLeft={substractMonth => substractMonth()}
        // Handler which gets executed when press arrow icon left. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}
      />
    </SafeAreaView>
  );
}
