import cartIcon from "../assets/assets/shopping-bag.png";
import crossIcon from "../assets/assets/crossIcon.png";
import CartAdd from "../page/AddToCart/CartAdd";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
const CartDrawer = ({ cart, isLoading, setOpen,open, formatted }) => {

  const navigate = useNavigate()

  return (
    <motion.div 
      
    className="drawer drawer-end ">
      <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />

      {/* Trigger Button */}
      <div className="mr-3 md:mr-2 hidden md:block ml-3">
        <label htmlFor="my-drawer-5" className="relative cursor-pointer">
          <img className="w-10 bg-gray-200 rounded-full p-2" src={cartIcon} alt="cart icon" />

          <span className="absolute -top-2 right-2 text-white bg-[#ff2d08] rounded-full px-2 min-w-5.5 h-5.5 flex items-center justify-center">
            {isLoading ? (
              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              cart.length
            )}
          </span>
        </label>
      </div>
      {/* Drawer Content */}
      <motion.div 
      initial={{ x: "100%" }}
        animate={{ x: open ? "100%":  0}}
        transition={{ type: "tween", duration: 0.3 }}
      className="drawer-side">
        <label htmlFor="my-drawer-5" className="drawer-overlay"></label>

        <ul className="menu bg-base-200 min-h-full md:w-102.5 p-4">
          {/* তোমার আগের সব content */}
          <ul className="menu bg-base-200 min-h-full lg:w-100 w-87.5 p-4 dark:bg-white dark:text-black">
            {/* Sidebar content here */}

            <div
              className={
                cart.length === 0 ? "overflow-hidden" : " h-150 overflow-auto"
              }
            >
              <div className="flex justify-between items-center pb-3 bg-[#e9edf1] p-3 border-b border-gray-300 mb-6">
                <h1 className="text-2xl font-medium">Shopping Cart</h1>
                <label
                  className="flex justify-end"
                  htmlFor="my-drawer-5"
                  aria-label="close sidebar"
                >
                  <img className="w-5 cursor-pointer" src={crossIcon} alt="" />
                </label>
              </div>
              <CartAdd></CartAdd>
            </div>
            {cart.length === 0 ? (
              <div>
                <img className="w-8 mx-auto pb-2" src={cartIcon} alt="Empty cart icon" />
                <h1 className="text-center text-2xl font-bold">
                  Your Cart is empty
                </h1>
                <p className="text-center pt-3 text-gray-500">
                  Add some products to get started!
                </p>
              </div>
            ) : (
              <div className="bg-gray-200 leading-16 mt-10">
                <div className="flex justify-between items-center px-6">
                  <h2 className="text-xl text-gray-700">Subtitle:</h2>
                  <p className="">৳{formatted}</p>
                </div>
                <hr className="mx-6 text-gray-400" />
                <div className="flex justify-between items-center px-6">
                  <h1 className="text-2xl font-semibold">Total</h1>
                  <p className="text-sky-800 text-sm">৳{formatted}</p>
                </div>
                <div className="px-4">
                  <Link to="/onlinePayment">
                    <button className="btn w-full bg-linear-0 to-[#0f1624] from-violet-600 text-white">
                      Pay Online
                    </button>
                  </Link>

                  <button
                    onClick={() => navigate('/onlinePayment')}
                    className="btn w-full bg-linear-0 to-[#0f1624] from-cyan-800 text-white hover:bg-[#0f1624]"
                  >
                    Cash On Delivery
                  </button>
                </div>
                <Link to="/cartDetails">
                  <p className="underline text-center">View Cart</p>
                </Link>
              </div>
            )}
          </ul>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default CartDrawer;
