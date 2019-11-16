import React from "react";
import createDataContext from "./createDataContext";
import index from "../../../backend/index";

// create a reducer function
// const authReducer = async (state, action) => {
//   switch (action.type) {
//     case "signin":
//       return data;
//     default:
//       return state;
//   }
// };

// action type
// must return a function so dispatch can be called
const signin = dispatch => {
  dispatch({
    type: "signin"
  });
};
// get user info and send to scraper
// handle errors

export const { Context, Provider } = createDataContext(
  authReducer,
  { signin },
  []
);
