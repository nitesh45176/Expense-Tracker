import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  console.log("DashboardLayout user:", user);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          {/* SideMenu only for desktop */}
          <div className="hidden lg:block w-64 ">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Main content area */}
          <div className="flex-grow p-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
