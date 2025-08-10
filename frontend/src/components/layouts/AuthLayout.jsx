import React from "react";
import CARD_2 from "../../assets/images/card2.png";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] xl:px-12 p-6 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black"> <span className="text-purple-700 text-2xl">EXPENSE   </span> TRACKER</h2>
        {children}
      </div>

      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat relative">
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 left-10" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-400 absolute bottom-24 right-10" />
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 left-20" />

        <div className="grid grid-cols-1 z-20">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="₹430,000"
            color="bg-primary"
          />
        </div>

        <img
          src={CARD_2}
          className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/10"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
    return (
   <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-purple-400/10 z-99 mt-10 border border-gray-200">
      <div className={`w-12 h-12 flex items-center justify-center text-[26px] gap-4 p-4 rounded-full ${color} drop-shadow-2xl text-white`}>
        {icon}
    </div>
    <div className="flex flex-col ">
      <span className="text-xs text-gray-900 mb-1">{label}</span>
      <span className="text-[20px]  font-semibold">{value}</span>
    </div>
   </div>
    
  );
}