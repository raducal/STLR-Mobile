import React, { useReducer } from "react";

// re-useable context function

// accepts your reducer function, your action functions which should be an object and you initial state
export default (reducer, actions, initialState) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // your other contexts need access to dispatch
    // loop through your actions object and call it with dispatch as a parameter
    // store this in a new object
    const boundActions = {};

    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
