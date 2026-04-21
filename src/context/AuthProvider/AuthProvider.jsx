import React, { useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

export default AuthProvider;
