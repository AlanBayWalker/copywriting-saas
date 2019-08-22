import React, { useState } from 'react';

const defaultContext = {
  isAuthenticated: true,
};
const Context = React.createContext(defaultContext);

let contextHandler = () => null;

export function withContext(Component) {
  return function WrapperComponent(props) {
    return (
      <Context.Consumer>
        {state => (
          <Component
            {...props}
            context={state}
            contextHandler={contextHandler}
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
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
export default Context;
