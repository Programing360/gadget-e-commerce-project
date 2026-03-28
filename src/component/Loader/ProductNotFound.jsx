import logo from "../../assets/assets/zeroomiro.jpeg";

const ProductNotFound = () => {
  return (
    <div className="h-100 flex items-center justify-center bg-linear-to-br from-[#fdfbfb] to-[#ebedee]">
      
      <div className="backdrop-blur-xl bg-white/40 shadow-xl rounded-2xl p-10 flex flex-col items-center">
        
        {/* 🔥 Logo */}
        <img
          src={logo}
          alt="Zeroomiro Logo"
          className="w-20 h-20 rounded-full mb-4 animate-bounce"
        />

        {/* 🔥 Brand */}
        <h1 className="text-2xl font-bold text-[#FF6D1F]">
          Zeroo<span className="text-[#fdb529]">m</span>iro
        </h1>

        {/* 🔥 Animated Loader */}
        <div className="mt-5 flex gap-2">
          <span className="w-3 h-3 bg-[#FF6D1F] rounded-full animate-bounce"></span>
          <span className="w-3 h-3 bg-[#fdb529] rounded-full animate-bounce delay-150"></span>
          <span className="w-3 h-3 bg-black rounded-full animate-bounce delay-300"></span>
        </div>

        {/* 🔥 Text */}
        <h2 className="text-2xl font-semibold">No Products Found</h2>
        <p className="mt-2 text-[14px]">Try adjusting your filters or come back later.</p>
      </div>
    </div>
  );
};

export default ProductNotFound;