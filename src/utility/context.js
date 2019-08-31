import React, { useState } from 'react';
import store from 'store';
import axios from 'axios';

export const Context = React.createContext({});

let contextHandler = () => null;
let clearContext = () => null;

export function withContext(Component) {
  return function WrapperComponent(props) {
    return (
      <Context.Consumer>
        {state => (
          <Component
            {...props}
            context={state}
            contextHandler={contextHandler}
            clearContext={clearContext}
          />
        )}
      </Context.Consumer>
    );
  };
}

export const Provider = ({ children }) => {
  const initialContext = {
    token: '',
    user: {},
  };
  const newContext = store.get('app') || initialContext;
  const [contextValue, setContextValue] = useState(newContext);
  contextHandler = change => {
    setContextValue(prevState => {
      if (change.token) {
        axios.defaults.headers.common.Authorization = `Bearer ${change.token}`;
      }

      const updatedContext = {
        ...prevState,
        ...change,
      };
      store.set('app', updatedContext);
      return updatedContext;
    });
  };
  clearContext = () => {
    setContextValue(initialContext);
  };
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default Context;
