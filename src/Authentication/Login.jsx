import React, { useContext} from "react";
import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router";
import { UseContext } from "../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useAxiosSecure } from "../Hook/useAxiosSecure";
import SEO from "../component/SEO/SEO";





const Login = () => {
  const { register, handleSubmit, watch } = useForm();
  const { signInUser, googleLogin, forgetPassword, UserLogout } =
    useContext(UseContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const email = watch("email");
  const notify = () => toast("Wow so easy!");
  const axiosSecure = useAxiosSecure();
  // MergeCart

  const mergeCart = async (userEmail) => {
    const guestId = localStorage.getItem("guestCart");

    if (!guestId) return;

    await axiosSecure.post("/merge-cart", {
      guestId,
      userEmail,
    });

    localStorage.removeItem("guestCart");
  };

  const handleLoginForm = async (data) => {
    try {
      const res = await signInUser(data.email, data.password);
      const user = res?.user;

      if (!user.emailVerified) {
        toast("Please verify your email first");
        UserLogout();
        return;
      }

      if (user) {
        navigate(from, { replace: true });
        await mergeCart(user?.email);
        notify();
      }
    } catch (err) {
      if (err) {
        toast("User invalid");
      }
    }
  };

  // handleSocialLogin
  const handleSocialLogin = async () => {
    try {
      const res = await googleLogin();
      const user = res?.user;

      if (user) {
        navigate(from, { replace: true });
        await mergeCart(user?.email);
      }
    } catch (err) {
      if (err) {
        toast.error("Google login failed");
      }
    }
  };

  const handleForgetPassword = () => {
    if (!email) {
      toast.error("Please enter your email first");
      return;
    }

    forgetPassword(email)
      .then(() => {
        toast("Password reset email sent!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen md:py-30 px-3">
      <SEO
        title="Login Page - Zeroomiro"
        description="Already have an account found gmail"
      />
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
                    // onChange={(e) => setEmail(e.target.value)}
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
                  <button
                    type="button"
                    className="link link-hover"
                    onClick={handleForgetPassword}
                  >
                    Forgot password?
                  </button>
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
                className="btn bg-white text-black border-[#e5e5e5] mt-4 active:scale-95"
              >
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
              <button className="active:scale-95 border px-8 rounded-xl border-blue-500 hover:bg-cyan-800 btn register-btn">
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
