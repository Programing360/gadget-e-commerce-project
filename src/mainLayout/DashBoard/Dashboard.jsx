import cancelIcon from "../../assets/assets/crossIcon.png";
import revenueIcon from "../../assets/assets/profit-up.png";
import pendingIcon from "../../assets/assets/pending.png";
import approvalIcon from "../../assets/assets/approval.png";
import poductIcon from "../../assets/assets/online-shopping.png";
import ChartComponent from "../GraphChart/ChartComponent";
import useOrderList from "../../Hook/useOrderList";
import useOrderCancelList from "../../Hook/useOrderCancelList";
const Dashboard = () => {
  const [orders] = useOrderList();
  const [orderCancel] = useOrderCancelList()
  return (
    <main className="p-6">
      <div className="hidden lg:block">
        <div>
          <h1 className="text-3xl font-bold bg-linear-0 from-fuchsia-600 to-pink-700 pl-4 py-4 text-white">
            Dashboard
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="lg:col-span-2 bg-[#170f21] rounded-2xl shadow p-6">
          <h2 className="font-semibold text-amber-700 mb-5">Sales Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-gray-400 gap-4">
            <div className="border p-4 rounded-lg ">
              <div className="flex gap-3 ">
                <img className="w-8 pb-2" src={poductIcon} alt="" />
                <h1 className="text-xl font-bold">Total Percel</h1>
              </div>
              <div className="flex justify-around items-center gap-3 pt-4">
                <p className="text-3xl font-bold">500</p>
                <p className="text-3xl font-bold">10000</p>
              </div>
            </div>
            <div className="border p-4 rounded-lg">
              <div className="flex gap-3">
                <img className="w-8 pb-2" src={revenueIcon} alt="" />
                <h1 className="text-xl font-bold">Total Delivered</h1>
              </div>
              <div className="flex justify-around items-center gap-3 pt-4">
                <p className="text-3xl font-bold">500</p>
                <p className="text-3xl font-bold">10000</p>
              </div>
            </div>
            <div className="border p-4 rounded-lg">
              <div>
                <div className="flex gap-3">
                  <img className="w-8 pb-2" src={poductIcon} alt="" />
                  <h1 className="text-xl font-bold">New Order</h1>
                </div>
              </div>
              <div className="flex justify-around items-center gap-3 pt-4">
                <p className="text-3xl font-bold">{orders?.length}</p>
                <p className="text-3xl font-bold">10000</p>
              </div>
            </div>
            <div className="border p-4 rounded-lg">
              <div className="flex gap-3">
                <img className="w-8 pb-2" src={approvalIcon} alt="" />
                <h1 className="text-xl font-bold">Approval Status</h1>
              </div>
              <div className="flex justify-around items-center gap-3 pt-4">
                <p className="text-3xl font-bold">500</p>
                <p className="text-3xl font-bold">10000</p>
              </div>
            </div>
            <div className="border p-4 rounded-lg">
              <div className="flex gap-3">
                <img className="w-8 pb-2" src={pendingIcon} alt="" />
                <h1 className="text-xl font-bold">Pending Orders</h1>
              </div>
              <div className="flex justify-around items-center gap-3 pt-4">
                <p className="text-3xl font-bold">500</p>
                <p className="text-3xl font-bold">10000</p>
              </div>
            </div>
            <div className="border p-4 rounded-lg">
              <div className="flex gap-3">
                <img className="w-8 pb-2" src={cancelIcon} alt="" />
                <h1 className="text-xl font-bold">Cancel</h1>
              </div>
              <div className="flex justify-around items-center gap-3 pt-4">
                <p className="text-3xl font-bold">{orderCancel?.length || 0}</p>
                <p className="text-3xl font-bold">10000</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold mb-2">Recent Orders</h2>
          <div className="h-full flex items-center justify-center text-gray-400">
            <ChartComponent></ChartComponent>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
