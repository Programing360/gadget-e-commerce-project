import { Lock, Grid } from "lucide-react";
import { Link } from "react-router";

const DiscoverProducts = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="bg-slate-50 border rounded-2xl shadow-2xl px-6 md:px-16 py-14 text-center border-gray-300">
        {/* Icon */}
        <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
          <Lock size={22} />
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
          Discover Thousands More Products – Electronics & Green Energy
          Solutions
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm md:text-base max-w-4xl mx-auto leading-relaxed mb-8">
          You've explored our handpicked selection. Now discover our complete
          catalog featuring thousands of products including premium electronics,
          smart devices, and our specialized green energy collection. Shop solar
          panels, wind power systems, renewable energy solutions,
          energy-efficient appliances, and sustainable technology products.
          BDShop is your trusted partner for both cutting-edge electronics and
          eco-friendly energy solutions in Bangladesh!
        </p>

        {/* Button */}
        <Link to='/userAllProduct'>
          <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-7 py-3 rounded-lg font-medium hover:bg-blue-700 transition hover:-translate-y-1 hover:shadow-2xl">
            <Grid size={18} />
            View All Products
          </button>
        </Link>
      </div>
    </section>
  );
};

export default DiscoverProducts;
