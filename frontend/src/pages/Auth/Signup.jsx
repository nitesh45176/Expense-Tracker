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
      <div className="lg:w-[100%] h-auto md:h-full flex flex-col justify-center  mt-10 md:mt-0">
        <h3 className="text-black font-semibold text-xl">Create an Account</h3>
        <p className="text-slate-700 text-xs mt-2">
          Join us today by entering your details below
        </p>

        <form onSubmit={handleSignup}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="John"
              label="Full name"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />
           <div className="col-span-2">
  <Input
    label="Password"
    type="password"
    name="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    showToggle={true} // This one can toggle
  />
</div>

<div className="col-span-2">
  <Input
    label="Confirm Password"
    type="password"
    name="confirmPassword"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    showToggle={false} // This one has NO toggle
  />
</div>

          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="btn-primary">
            SIGN UP
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?
            <Link className="font-medium text-primary underline" to="/login">
              login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
