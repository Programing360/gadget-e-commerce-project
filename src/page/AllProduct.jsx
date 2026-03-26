import ProductCart from "./ProductCart";
import SEO from "../component/SEO/SEO";
import Loader from "../component/Loader/Loader";
import useAllProduct from "../Hook/useAllProduct";

const AllProduct = () => {
  const [allProduct, , , isPending] = useAllProduct()

  // ✅ Full page loader
  if (isPending) {
    return <Loader></Loader>;
  }

  return (
    <div className="mt-14 container lg:w-10/12 mx-auto lg:p-10 p-2">
      <SEO
        title="Zeroomiro - Trusted Place"
        description="Buy online products with trust"
      />

      <h1 className="text-center text-3xl text-[#111827] font-bold bg-gray-100 py-4">
        Premium Products
      </h1>

      <p className="text-center text-gray-500 mt-4">
        Welcome to our premium product collection where quality meets value.
      </p>

      {/* ❌ No Product */}
      {allProduct?.length === 0 ? (
        <Loader></Loader>
      ) : (
        /* ✅ Product Grid */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-10 gap-2 mt-14">
          {allProduct?.map((product) => (
            <ProductCart key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProduct;
