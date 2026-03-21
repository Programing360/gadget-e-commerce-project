import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { UseContext } from "../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { sendEmailVerification } from "firebase/auth";
import SEO from "../component/SEO/SEO";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { createUser, googleLogin, UserLogout } = useContext(UseContext);
  const navigate = useNavigate();

  const password = watch("password");

  // const notify = () => toast("Registration successful!");

  const handleRegisterForm = (data) => {
    createUser(data.email, data.password).then(async (res) => {
      const user = res.user;

      if (user) {
        await sendEmailVerification(user);

        toast("Verification email sent. Please check your email.");

        await UserLogout(); // 🔥 logout

        navigate("/login");
      }
    });
  };

  const handleSocialLogin = () => {
    googleLogin().then((res) => {
      if (res.user) {
        toast("Google Login Successful!");
        navigate("/");
      }
    });
  };

  return (
    <div className="hero bg-base-200 min-h-screen md:py-30 p-3">
      <SEO
        title="Sign_In - Zeroomiro"
        description="no account found gmail"
      />
      <div className="card bg-base-100 w-full lg:max-w-3xl md:max-w-xl shadow-2xl">
        <div className="flex flex-col-reverse md:flex-row-reverse">
          {/* FORM SECTION */}
          <div className="card-body w-full">
            <h1 className="text-center text-3xl font-bold">Registration</h1>

            <form onSubmit={handleSubmit(handleRegisterForm)}>
              {/* NAME */}
              <div className="relative mt-3">
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                  className="input w-full border-cyan-700"
                  placeholder="User Name"
                />
                <FaUser className="absolute right-4 top-9" />

                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* EMAIL */}
              <div className="relative mt-3">
                <label className="label">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="input w-full border-cyan-700"
                  placeholder="Email"
                />
                <MdEmail className="absolute right-4 top-9" />

                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* PASSWORD */}
              <div className="relative mt-3">
                <label className="label">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="input w-full border-cyan-700"
                  placeholder="Password"
                />
                <FaLock className="absolute right-4 top-9" />

                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="mt-3">
                <label className="label">Confirm Password</label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirm password required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="input w-full border-cyan-700"
                  placeholder="Confirm Password"
                />

                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button className="btn bg-cyan-700 text-white mt-5 w-full">
                Register
              </button>
            </form>

            {/* SOCIAL LOGIN */}

            <div className="text-center mt-5">
              <p>or register with social platforms</p>

              <button
                onClick={handleSocialLogin}
                className="btn bg-white text-black border mt-4 active:scale-95"
              >
                Login with Google
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="bg-cyan-700 md:rounded-r-[70px] md:py-40 text-center text-white p-6">
            <h1 className="text-3xl font-bold">Welcome Back!</h1>

           

            <Link to="/login">
              <button className="active:scale-95 border px-8 rounded-xl border-blue-500 hover:bg-cyan-800 btn register-btn mt-4">
                Login
              </button>
            </Link>
             <p className="mt-3">Already have an account?</p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SignIn;
