import React, { useState } from 'react';
import store from 'store';

const defaultContext = {
  isAuthenticated: Boolean(store.get('token')),
};
export const Context = React.createContext(defaultContext);

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
  const [contextValue, setContextValue] = useState(defaultContext);
  contextHandler = change => {
    setContextValue(prevState => ({
      ...prevState,
      ...change,
    }));
  };
  clearContext = () => {
    setContextValue(defaultContext);
  };
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default Context;
