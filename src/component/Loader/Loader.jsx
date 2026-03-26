import logo from "../../assets/assets/zeroomiro.jpeg";

const Loader = () => {
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
        <p className="text-gray-600 mt-4 text-sm">
          Preparing your experience...
        </p>
      </div>
    </div>
  );
};

export default Loader;