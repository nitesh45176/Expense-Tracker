import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({
  value,
  onChange,
  placeholder,
  label,
  type,
  name,
  showToggle = true,
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  const inputType =
    type === "password" ? (isShowPassword ? "text" : "password") : type;

  return (
    <div>
      {label && <label className="text-[13px] text-slate-800">{label}</label>}

      <div className="input-box">
        <input
          name={name}
          type={inputType}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={onChange}
        />

        {/* Only show toggle if type is password AND showToggle is true */}
        {type === "password" &&
          showToggle === true &&
          (isShowPassword ? (
            <FaRegEye
              size={22}
              className="text-primary cursor-pointer"
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEyeSlash
              size={22}
              className="text-slate-400 cursor-pointer"
              onClick={toggleShowPassword}
            />
          ))}
      </div>
    </div>
  );
};

export default Input;
