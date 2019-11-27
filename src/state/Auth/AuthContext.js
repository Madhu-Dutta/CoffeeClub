import { createContext } from "react";

const authContextDefault = {
  userId: 0,
  setUserId: userId => {}
};

export const AuthContext = createContext(authContextDefault);
export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;
