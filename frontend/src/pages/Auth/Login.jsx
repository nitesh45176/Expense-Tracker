import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/inputs/Input";
import { validEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstanse";
import { API_PATHS } from "../../utils/apiPaths";
import { useUser } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { updateUser } = useUser(); 

  const handleLogin = async(e) => {
    e.preventDefault();
    
    if(!validEmail(email)){
      setError("Please enter a valid email");
      return;
    }
    if(!password){
      setError("Password is required");
      return;
    }

    setError("");

    //login api call
   
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
       
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
         updateUser({ userData: user });
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center p-7">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-sm text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="*********"
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary ">
            LOGIN
          </button>

          <p className="text-[13px] text-slate-800 mt-3">Don't have an account?
             <Link to="/signup" className="text-primary font-semibold"> Sign Up</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
