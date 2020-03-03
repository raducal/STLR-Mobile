import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { AsyncStorage } from "react-native";

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

  useEffect(() => {
    console.log(qrData);
  }, []);

  const getEvents = async () => {
    const store = JSON.parse(await AsyncStorage.getItem("login"));
    try {
      console.log("starting");
      if (store && store.isAuthenticated) {
        const response = await axios.get("http://bcd5e2a0.ngrok.io/scrape", {
          headers: { Authorization: `Bearer ${store.token}` }
        });

        setToken(store.token);
        const events = response.data.event;

        let currentEvents = [];

        events.map(event => {
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

        setEvents(prev => [...prev, currentEvents]);
      } else {
        console.log(store);
        console.log("nope");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    let user = {
      username,
      password
    };
    try {
      let res = await axios.post(
        "http://bcd5e2a0.ngrok.io/scrape",
        JSON.stringify(user),
        config
      );
      let token = res.data.token;
      await AsyncStorage.setItem(
        "login",
        JSON.stringify({
          token: res.data.token,
          isAuthenticated: true
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

  const checkQrCode = async qr => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    let info = {
      qr,
      username
    };
    try {
      await axios.put(
        "http://bcd5e2a0.ngrok.io/qrcode",
        JSON.stringify(info),
        config
      );

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
        message
      }}
    >
      {children}
    </StlrContext.Provider>
  );
};

export default StlrContextProvider;
