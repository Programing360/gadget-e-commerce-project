import React, { useContext } from "react";
import { MdLockOutline } from "react-icons/md";
import { UseContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
const UserSettion = () => {
    const {UserLogout} = useContext(UseContext)

    const navigate = useNavigate()

    const handleSignOut = () =>{
        UserLogout()
        navigate('/')
    }

  return (
    <div className="container md:w-8/12 mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="flex flex-col md:flex-row gap-4 items-center mt-10">
        <div className="max-w-100">
          <h1 className="flex items-center gap-2 font-bold text-lg font-mono">
            <MdLockOutline /> Sign out everywhere
          </h1>
          <p className="text-gray-400 mt-3">
            If you've lost a device or have security concerns, log out
            everywhere to ensure the security of your account.
          </p>
        </div>
        <div className="border rounded-lg border-gray-200 p-5 flex flex-col md:flex-row items-center gap-3 w-full">
          <button onClick={handleSignOut} className="border rounded-lg border-gray-200 text-[#fdb529] hover:text-[#f1a60f] cursor-pointer p-2">
            Sign out everywhere
          </button>
          <p>You'll also be signed out on this device.</p>
        </div>
      </div>
    </div>
  );
};

export default UserSettion;
