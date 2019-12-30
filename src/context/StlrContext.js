import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

import { navigate } from "../navigationRef";

export const StlrContext = createContext();

const StlrContextProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState(false);
  const [qrData, setQrData] = useState("");

  useEffect(() => {
    console.log(qrData);
  });

  const getEvents = async () => {
    const response = await axios.get("http://0132f4c0.ngrok.io/scrape");
    const data = await response.json();

    console.log(data);
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
      axios
        .post("http://0132f4c0.ngrok.io/scrape", JSON.stringify(user), config)
        .then(response => {
          console.log(response.data.msg);
          if (response.data.msg === "Fail") {
            setLoading(false);
            setModal(true);
            setPassword("");
            setUsername("");
          } else {
            setLoading(false);
            setModal(false);
            navigate("EventsList");
          }
        })
        .catch(error => {
          console.log(error);
        });
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
    await login();
  };

  const checkQrCode = qr => {
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
      axios
        .post("http://0132f4c0.ngrok.io/qrcode", JSON.stringify(info), config)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
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
        checkQrCode
      }}
    >
      {children}
    </StlrContext.Provider>
  );
};

export default StlrContextProvider;
