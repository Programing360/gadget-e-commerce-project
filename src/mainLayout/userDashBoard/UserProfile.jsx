import React, { useContext } from "react";
import editIcon from "../../assets/assets/edit.png";
import { UseContext } from "../../Context/AuthContext";
const UserProfile = () => {
  const { user } = useContext(UseContext);

  return (
    <div className="container md:w-8/12 mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold antialiased">Profile</h1>
      <div className="border border-gray-200 rounded-2xl mt-7 p-6">
        <div className="flex items-center gap-3 pb-4">
          <h1 className="font-semibold">Name</h1>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="cursor-pointer"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            <img className="w-4" src={editIcon} alt="" />
          </button>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">
                Press ESC key or click the button below to close
              </p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
        <div>
          <h1 className="text-[#827070]">Email</h1>
          <p>{user?.email}</p>
        </div>
      </div>
      <div className="border border-gray-200 rounded-2xl mt-7 p-4">
        <div className="flex items-center gap-3 pb-4 pl-2">
          <h1 className="font-semibold">Address</h1>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="cursor-pointer"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            <p className="text-[#fdb529]">+Add</p>
          </button>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">
                Press ESC key or click the button below to close
              </p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
        {/* TO Do : User Address Edit to backend and ui update */}
        <div className="flex items-center gap-3 pb-4 hover:bg-gray-100 w-50 rounded-lg p-2">
          <h1 className="font-semibold text-[#827070]">Default Address</h1>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="cursor-pointer"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            <img className="w-4" src={editIcon} alt="" />
          </button>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">
                Press ESC key or click the button below to close
              </p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
