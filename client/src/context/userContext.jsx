import React, { createContext, useEffect, useState } from 'react';

import { lookInSession } from '../utils/sessions';

// Create the UserContext
export const UserContext = createContext();

// Create a provider component
const UserProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(null);

  useEffect(() => {
    const userInSession = lookInSession('user');
    const token = lookInSession('token');

    if (userInSession && token) {
      setUserAuth({ ...JSON.parse(userInSession), access_token: token });
    } else {
      setUserAuth({ access_token: null });
    }
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
