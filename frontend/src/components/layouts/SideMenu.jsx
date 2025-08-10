import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import CharAvatar from "../Cards/CharAvatar";


const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
   console.log("👤 User profileImageUrl:", user?.profileImageUrl);

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64  h-[calc(100vh-61px)] bg-white p-5 border-r border-gray-200/50 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3">
        
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover mb-2"
          />
        ) : (
          <CharAvatar 
           fullName={user?.fullName}
           width="w-20"
           height="h-20"
           style="text-xl"/>
        )}
        
        <h5 className="text-sm font-semibold mb-6">{user?.fullName || ""}</h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] cursor-pointer ${
            activeMenu === item.label ? "text-white bg-primary" : "text-gray-700"
          } py-3 px-6 rounded-lg mb-3 hover:bg-gray-200 transition`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
