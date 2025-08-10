import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstanse";

const SignUp = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleSignup = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your full name");
      return;
    }

    if (!validEmail(email)) {
      setError("Please enter valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter password.");
      return;
    }
    if (!confirmPassword) {
      setError("Please confirm the password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        console.log("📷 Uploaded Image URL:", profileImageUrl);

        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      console.log({ fullName, email, password, profileImageUrl });

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;
      console.log("🚀 Registered user from backend:", user);

      if (token) {
        localStorage.setItem("token", token);
        updateUser({ userData: user });
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        const { message, msg } = error.response.data;
        setError(message || msg || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full flex flex-col justify-center  md:mt-0 px-4 sm:px-0 mb-10">
        <h3 className="text-black font-semibold text-xl mt-40">Create an Account</h3>
        <p className="text-slate-700 text-xs mt-2">
          Join us today by entering your details below
        </p>

        <form onSubmit={handleSignup} className="w-full">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          
          {/* Updated grid layout for better mobile experience */}
          <div className="flex flex-col gap-4 mt-6">
            {/* Full Name - Full width on mobile for better usability */}
            <div className="w-full">
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                placeholder="Enter your full name"
                label="Full name"
                className="w-full min-h-[48px] text-base" // Ensure minimum touch target size
              />
            </div>

            {/* Email - Full width on mobile */}
            <div className="w-full">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                placeholder="john@example.com"
                type="email"
                className="w-full min-h-[48px] text-base"
              />
            </div>

            {/* Password fields - Full width for better mobile experience */}
            <div className="w-full">
              <Input
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showToggle={true}
                className="w-full min-h-[48px] text-base"
                placeholder="Enter your password"
              />
            </div>

            <div className="w-full">
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                showToggle={false}
                className="w-full min-h-[48px] text-base"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          <button 
            type="submit" 
            className="btn-primary w-full mt-6 min-h-[48px] text-base font-medium"
          >
            SIGN UP
          </button>

          <p className="text-[13px] text-slate-800 mt-3 text-center mb-10">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline ml-1" to="/login">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;