import { motion } from "framer-motion";

const NetworkLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-linear-to-b from-indigo-500 to-purple-600 text-white">
      {/* 🔄 Spinner Animation */}
      <motion.div
        className="w-20 h-20 border-4 border-white border-t-transparent rounded-full mb-6"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      ></motion.div>

      {/* ⚡ Message */}
      <motion.h2
        className="text-2xl font-semibold mb-2 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Network Issue
      </motion.h2>

      <motion.p
        className="text-center text-gray-200 max-w-xs"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Please reload the page and try again.
      </motion.p>

      {/* 🔄 Reload Button */}
      <motion.button
        onClick={() => window.location.reload()}
        className="mt-6 px-6 py-2 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Reload Page
      </motion.button>
    </div>
  );
};

export default NetworkLoader;