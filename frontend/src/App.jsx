import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Auth/Login";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import Signup from "./pages/Auth/Signup";
import { UserProvider } from "../src/context/userContext";
import { Toaster } from "react-hot-toast";


const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/income" exact element={<Income />} />
          <Route path="/expense" exact element={<Expense />} />
        </Routes>
      </Router>

      <Toaster 
       toastOptions={{
        className:"",
        style :{
          fontSize: '13px'
        }
       }}
       
        />
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  
  return isAuthenticated?(
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
}
