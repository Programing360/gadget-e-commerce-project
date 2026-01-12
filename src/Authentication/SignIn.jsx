import React from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail, MdPassword } from "react-icons/md";
import { Link } from "react-router";

const SignIn = () => {
  return (
    <div className="hero bg-base-200 min-h-screen md:py-30">
      <div className="card bg-base-100 w-full lg:max-w-3xl md:max-w-xl shrink-0 shadow-2xl">
        <div className="flex items-center flex-col-reverse md:flex-row-reverse">
          <div className="card-body w-full">
            <h1 className="text-center text-3xl font-bold">Registration</h1>
            <fieldset className="fieldset ">
              <div className="relative">
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input w-full outline-0 relative border-cyan-700"
                  placeholder="UserName"
                />
                <FaUser className="absolute right-4 top-8 "></FaUser>
              </div>
              <div className="relative">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input w-full outline-0 border-cyan-700"
                  placeholder="Email"
                />
                <MdEmail className="absolute right-4 top-8"></MdEmail>
              </div>

              <div className="relative">
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input w-full outline-0 border-cyan-700"
                  placeholder="Password"
                />
                <FaLock className="absolute right-4 top-8"></FaLock>
              </div>
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn bg-cyan-700 text-white mt-4">
                Register
              </button>
            </fieldset>
          </div>
          <div className="bg-cyan-700 md:rounded-r-[70px] md:py-40 login text-center text-white leading-14">
            <h1 className="lg:text-3xl text-2xl font-bold">Welcome Back!</h1>
            <p>Already have an account?</p>
            <Link to="/login">
              <button className="border px-8 rounded-xl border-blue-500 hover:bg-cyan-800 register-btn">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
