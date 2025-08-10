import { createContext, useContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ⬇ Load user from localStorage on app start
useEffect(() => {
  const storedUser = localStorage.getItem("user");
  try {
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser) setUser(parsedUser);
    }
  } catch (error) {
    console.error("Failed to parse stored user:", error);
    localStorage.removeItem("user"); // optional cleanup
  }
}, []);

  const updateUser = ({ userData }) => {
    localStorage.setItem("user", JSON.stringify(userData)); // persist
    setUser(userData);
  };

  const clearUser = () => {
    localStorage.removeItem("user"); // remove persisted
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
