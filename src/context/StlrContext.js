import React, { createContext, useState, useEffect } from "react";
import { AsyncStorage, Dimensions } from "react-native";
import * as Device from "expo-device";

import stlrApi from "../api/axios";

import { navigate } from "../navigationRef";

export const StlrContext = createContext();

const StlrContextProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState(false);
  const [qrData, setQrData] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);
  const [isAuthenticated, setAuthentication] = useState(null);
  const [screen, setScreen] = useState({
    width: "",
    height: "",
    brand: "",
    model: "",
  });

  const getEvents = async () => {
    const store = JSON.parse(await AsyncStorage.getItem("login"));
    try {
      console.log("starting");
      if (store && store.isAuthenticated) {
        const response = await stlrApi.get("/stlr/events", {
          headers: { Authorization: `Bearer ${store.token}` },
        });

        setToken(store.token);
        const events = response.data.event;

        let currentEvents = [];

        events.map((event) => {
          if (event.due !== undefined) {
            const index = event.due.indexOf("+");
            const str = event.due.slice(0, index - 4);
            const colon = str.indexOf(":");
            const time = str.slice(colon - 2, colon + 3);
            const date = str.slice(0, colon - 3);
            event.time = time;
            event.due = date;
          } else {
            event.time = "N/A";
          }

          if (event.status === "current") {
            currentEvents.push(event);
          }
        });

        setEvents((prev) => [...prev, currentEvents]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getScreenSize = () => {
    const screenWidth = Math.round(Dimensions.get("window").width);
    const screenHeight = Math.round(Dimensions.get("window").height);
    setScreen({
      width: screenWidth,
      height: screenHeight,
      brand: Device.brand,
      model: Device.modelName,
    });
  };

  const login = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let user = {
      username: username.toLowerCase(),
      password,
      width: screen.width.toString(),
      height: screen.height.toString(),
      brand: screen.brand,
      model: screen.model,
    };

    try {
      let res = await stlrApi.post("/stlr/users", JSON.stringify(user), config);
      await getEvents();
      let token = res.data.token;
      await AsyncStorage.setItem(
        "login",
        JSON.stringify({
          token: res.data.token,
          isAuthenticated: true,
        })
      );
      setToken(token);
      setAuthentication(true);
      setLoading(false);
      setModal(false);
      navigate("EventsList");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setModal(true);
      setPassword("");
      setUsername("");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (username === "" && password === "") {
      setModal(true);
      setLoading(false);
      return console.log("try again");
    }
    await login();
  };

  const checkQrCode = async (qr) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let info = {
      qr,
      username,
    };
    try {
      await stlrApi.put("/stlr/events", JSON.stringify(info), config);

      setMessage("Successfully Enrolled");
    } catch (error) {
      console.log(error);
      setMessage("Please Try Again");
    }
  };

  return (
    <StlrContext.Provider
      value={{
        loading,
        username,
        password,
        setPassword,
        setUsername,
        setLoading,
        handleSubmit,
        events,
        modal,
        setModal,
        setQrData,
        checkQrCode,
        getEvents,
        isAuthenticated,
        message,
        getScreenSize,
      }}
    >
      {children}
    </StlrContext.Provider>
  );
};

export default StlrContextProvider;
