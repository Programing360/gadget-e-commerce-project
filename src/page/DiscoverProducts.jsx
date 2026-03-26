import { Lock, Grid } from "lucide-react";
import { Link } from "react-router";
import { motion, useScroll, useTransform } from "framer-motion";

const productsData = [
  {
    title: "Electronics & Smart Devices",
    description: "Explore premium electronics and smart devices for your daily needs."
  },
  
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const DiscoverProducts = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -20]);
  const y2 = useTransform(scrollY, [0, 500], [0, -10]);
  const y3 = useTransform(scrollY, [0, 500], [0, -5]);

  const yTransforms = [y1, y2, y3];

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="space-y-12"
      >
        {productsData.map((product, index) => (
          <motion.div
            key={index}
            style={{ y: yTransforms[index] || 0 }}
            variants={cardVariants}
            className="bg-gradient-to-tr from-blue-50 via-white to-green-50 border border-gray-200 rounded-3xl shadow-xl px-8 md:px-16 py-16 text-center
                       transform transition-transform duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
          >
            {/* Icon */}
            <motion.div
              className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-md"
              whileHover={{ rotate: 12, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Lock size={24} />
            </motion.div>

            {/* Title */}
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight"
              whileHover={{ color: "#2563eb" }}
              transition={{ duration: 0.3 }}
            >
              {product.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-10"
              whileHover={{ opacity: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {product.description}
            </motion.p>

            {/* Button */}
            <Link to="/userAllProduct">
              <motion.button
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-medium text-lg"
                whileHover={{ scale: 1.05, y: -3, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Grid size={20} />
                View All Products
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default DiscoverProducts;