import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";

const Home = () => {
  useUserAuth();
  
  const [testData, setTestData] = useState("Loading...");

  useEffect(() => {
    // Simple test to see if component is working
    setTimeout(() => {
      setTestData(`Dashboard loaded at ${new Date().toLocaleTimeString()}`);
    }, 1000);
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard Test</h1>
        <p className="text-lg">{testData}</p>
        <p className="text-sm text-gray-500 mt-2">
          Build timestamp: {Date.now()}
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Home;