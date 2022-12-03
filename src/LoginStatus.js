import { createContext, useState } from "react";
export const LoginContext = createContext({});

function LoginStatus({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginStatus;
