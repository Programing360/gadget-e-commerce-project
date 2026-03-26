import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import bannerImg2 from "../../assets/assets/bannerImg2.jpg";
import bannerImg3 from "../../assets/assets/bannerImage3.jpg";
import bannerImg4 from "../../assets/assets/bannerImg4.webp";
import bannerImg5 from "../../assets/assets/bannerImg5.jpg";
import Bravery from "../../assets/assets/bravery.jpg";
import { NavLink } from "react-router";

const slides = [
  {
    image: bannerImg2,
    title: "Elevate Your Experience",
    subtitle: "Premium products curated for modern life",
  },
  {
    image: bannerImg3,
    title: "Innovation Meets Style",
    subtitle: "Discover the future of shopping",
  },
  {
    image: bannerImg4,
    title: "Minimal. Powerful. Yours.",
    subtitle: "Designed with precision & passion",
  },
  {
    image: bannerImg5,
    title: "Minimal. Powerful. Yours.",
    subtitle: "Designed with precision & passion",
  },
  {
    image: Bravery,
    title: "Minimal. Powerful. Yours.",
    subtitle: "Designed with precision & passion",
  },
];
const AnimationBanner = () => {
  const [index, setIndex] = useState(0);

  // 🔥 Auto Slide
  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [index, slides]);

  // 🔥 Swipe Support
  const handleDragEnd = (e, info) => {
    if (info.offset.x > 100) {
      prevSlide();
    } else if (info.offset.x < -100) {
      nextSlide();
    }
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // 🔥 Typing Effect
  const [displayText, setDisplayText] = useState("");
  useEffect(() => {
    if (!slides[index]?.title) return;

    let i = 0;
    const text = slides[index].title;

    const typing = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(typing);
    }, 40);

    return () => clearInterval(typing);
  }, [index, slides]);

  //   if (isLoading) {
  //     return (
  //       <div className="h-[300px] flex items-center justify-center">
  //         Loading...
  //       </div>
  //     );
  //   }

  return (
    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* 🔥 PARALLAX IMAGE */}
          <motion.img
            src={slides[index]?.image}
            alt="banner"
            className="w-full h-full object-cover"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6 }}
          />

          {/* 🔥 Gradient */}
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent"></div>

          {/* 🔥 TEXT */}
          <div className="absolute bottom-10 left-5 md:left-12 text-white max-w-md">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold">
              {displayText}
            </h1>

            <p className="mt-2 text-sm md:text-lg text-gray-200">
              {slides[index]?.subtitle}
            </p>

            <button className="mt-4 px-5 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition">
              <NavLink to="/userAllProduct">Shop Now</NavLink>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 🔥 Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur px-3 py-2 rounded-full text-white hidden hover:block"
      >
        ←
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur px-3 py-2 rounded-full text-white hidden hover:block"
      >
        →
      </button>

      {/* 🔥 Indicators */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
              index === i ? "bg-white scale-125" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimationBanner;
