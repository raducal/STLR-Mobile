import React, { createContext, useState, useEffect } from "react";

import { navigate } from "../navigationRef";

export const StlrContext = createContext();

const StlrContextProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState(false);

  const getInfo = async () => {
    try {
      const response = await fetch(
        `http://2916cb04.ngrok.io/scrape?username=${username}&password=${password}`
      );
      const data = await response.json();
      if (response.status !== 200) {
        setLoading(false);
        setModal(true);
        setPassword("");
        setUsername("");
      } else {
        setLoading(false);
        setModal(false);
        setEvents([...events, data.info[0]]);
        navigate("EventsList");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (username === "" && password === "") {
      setModal(true);
      setLoading(false);
      return console.log("try again");
    }

    if (!username.toUpperCase().includes("B000")) {
      setUsername("");
      setPassword("");
      setLoading(false);
      setModal(true);
      return console.log("invalid username");
    }

    await getInfo();
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
        setModal
      }}
    >
      {children}
    </StlrContext.Provider>
  );
};

export default StlrContextProvider;
