import { Link } from "react-router";
import useCart from "../../Hook/useCart";
import editIcon from "../../assets/assets/editIcon.png";
import crossIcon from "../../assets/assets/crossIcon.png";
import { useAxiosSecure } from "../../Hook/useAxiosSecure";
import { toast } from "react-toastify";
import useWishList from "../../Hook/useWishList";
import SEO from "../../component/SEO/SEO";

const AddToWishlist = () => {
  const [ ,refetch] = useCart();
  const axiosSecure = useAxiosSecure();
  const [wishlist,reload ] = useWishList()

const handleAddToCart = (item) => {
    
    axiosSecure.post("/cartData", item).then((res) => {
    if (res.data.insertedId) {
      toast.success("Product added to cart 🛒");
      refetch();
    }
  });
}

  const handleWishListDelete = (id) => {
    axiosSecure.delete(`/wishListDelete/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        reload();
        toast.success("Item removed from cart");
        localStorage.removeItem("cartItem");
      }
    });
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[100vh] flex flex-col justify-center items-center text-center">
        <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" alt="Empty Cart" className="w-64 mb-6" />
        <h2 className="text-3xl font-bold mb-2">There are no products in your wishlist!</h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven’t added anything to your Wish List yet
        </p>
        <Link to="/">
          <button className="bg-[#f56e06] text-white px-6 py-3 rounded hover:bg-[#2f333a]">
            Go to Shop
          </button>
        </Link>
      </div>
    );
  }

  // 🟢 CART WITH PRODUCTS
  return (
    <div className="dark:bg-white dark:text-black my-10 ">
      <SEO
        title="Your Wishlist - Zeroomiro"
        description="Review your wishlist items and Add to cart"
      />
      <div className="bg-linear-to-l from-cyan-600 to-cyan-800 py-10 text-white">
        <h1 className="text-4xl text-center font-bold">WISHLIST</h1>
        <p className="text-center pt-4">
          <Link to="/">Home</Link> {">"} WishList
        </p>
      </div>

      <div className="overflow-x-auto lg:w-8/12 mx-auto mt-10">
        <table className="table">
          <thead>
            <tr className="bg-cyan-900 text-white text-center">
              <th>IMAGE</th>
              <th>PRODUCT NAME</th>
              <th>UNIT PRICE</th>
              <th>ADD TO CART</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {wishlist.map((item) => (
              <tr key={item._id} className="border bg-gray-200 text-center">
                <td>
                  <img
                    className="md:h-20 md:w-20 w mx-auto"
                    src={item.image}
                    alt={item.name}
                  />
                </td>

                <td className="font-bold">{item.name}</td>

                <td>{item.price} TK</td>

                <td>
                  <div className="flex justify-center items-center py-1">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="btn bg-linear-0 from-cyan-700 to-cyan-400 text-white"
                    >
                      Add To Cart
                    </button>
                  </div>
                </td>

                {/* <td>{item.price * item.quantity} TK</td> */}

                <td>
                  <div className="flex justify-center gap-4">
                    <Link to={`/productDetails/${item._id}`}>
                      <img
                        className="w-5 cursor-pointer"
                        src={editIcon}
                        alt="edit"
                      />
                    </Link>
                    <img
                      onClick={() => handleWishListDelete(item._id)}
                      className="w-5 cursor-pointer"
                      src={crossIcon}
                      alt="delete"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AddToWishlist;
