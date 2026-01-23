import React from "react";
import NavBar from "../../component/NavBar/NavBar";
import ordericon from '../../assets/assets/checklist.png'
import revenueIcon from '../../assets/assets/profit-up.png'
import pendingIcon from '../../assets/assets/pending.png'
import custormerIcon from '../../assets/assets/customer.png'
import poductIcon from '../../assets/assets/online-shopping.png'
const Dashboard = () => {
  return (
    <main className="p-6">
        <div className="hidden lg:block">
            <div>
                <h1 className="text-3xl font-bold bg-linear-0 from-fuchsia-600 to-pink-700 pl-4 py-4 text-white">Dashboard</h1>
            </div>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-[#170f21] rounded-2xl shadow p-6">
          <h2 className="font-semibold text-amber-700 mb-5">Sales Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-gray-400 gap-4">
            <div className="border p-4 ">
                <img className="w-8 pb-2" src={ordericon} alt="" />
                <h1 className="text-xl font-bold">Total Order: 100</h1>
            </div>
            <div className="border p-4 ">
                <img className="w-8 pb-2" src={revenueIcon} alt="" />
                <h1 className="text-xl font-bold">Total Revenue: 100</h1>
            </div>
            <div className="border p-4 ">
                <img className="w-8 pb-2" src={poductIcon} alt="" />
                <h1 className="text-xl font-bold">Total Product: 100</h1>
            </div>
            <div className="border p-4 ">
                <img className="w-8 pb-2" src={custormerIcon} alt="" />
                <h1 className="text-xl font-bold">Total Customers: 100</h1>
            </div>
            <div className="border p-4 ">
                <img className="w-8 pb-2" src={pendingIcon} alt="" />
                <h1 className="text-xl font-bold">Pending Orders: 100</h1>
            </div>
            
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 h-64">
          <h2 className="font-semibold mb-2">Recent Orders</h2>
          <div className="h-full flex items-center justify-center text-gray-400">
            Table Here
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
