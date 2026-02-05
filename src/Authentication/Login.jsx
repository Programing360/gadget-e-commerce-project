import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { UseContext } from "../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signInUser,googleLogin } = useContext(UseContext);
  const navigate = useNavigate();

  const notify = () => toast("Wow so easy!");

  const handleLoginForm = (data) => {
    signInUser(data.email, data.password)
      .then((res) => {
        if (res.user) {
          navigate("/");
          notify();
        }
      })
      .catch((err) => {
        if (err) {
          toast("User invalid");
        }
      });
  };
  const handleSocialLogin = () => {
    googleLogin().then((res) => {
      if (res.user) {
        navigate("/");
      }
    });
  };
  return (
    <div className="hero bg-base-200 min-h-screen md:py-30 px-3">
      <div className="card bg-base-100 w-full lg:max-w-3xl md:max-w-xl shrink-0 shadow-2xl">
        <div className="flex items-center flex-col-reverse md:flex-row ">
          <div className="card-body w-full">
            <h1 className="text-center text-3xl font-bold">Login</h1>
            <form onSubmit={handleSubmit(handleLoginForm)}>
              <fieldset className="fieldset">
                <div className="relative">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="input w-full outline-0 border-cyan-700"
                    placeholder="Email"
                  />
                  <MdEmail className="absolute right-4 top-8"></MdEmail>
                </div>

                <div className="relative">
                  <label className="label">Password</label>
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    className="input w-full outline-0 border-cyan-700"
                    placeholder="Password"
                  />
                  <FaLock className="absolute right-4 top-8"></FaLock>
                </div>
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn bg-cyan-700 text-white mt-4">
                  Login
                </button>
              </fieldset>
            </form>
            <div className="text-center mt-4">
              <p>or register with social platforms</p>
              <button 
                onClick={handleSocialLogin}
              className="btn bg-white text-black border-[#e5e5e5] mt-4">
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>
            </div>
          </div>
          <div className="bg-cyan-700 md:rounded-l-[70px] md:py-40 login text-center text-white leading-14">
            <h1 className="lg:text-3xl text-2xl font-bold">Welcome Back!</h1>
            <p>Don't have an account?</p>
            <Link to="/register">
              <button className="border px-8 rounded-xl border-blue-500 hover:bg-cyan-800 register-btn">
                Register
              </button>
              <ToastContainer></ToastContainer>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
