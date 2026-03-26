
import bannerImg2 from "../../assets/assets/bannerImg2.jpg";
import bannerImg3 from "../../assets/assets/bannerImage3.jpg";
import bannerImg4 from "../../assets/assets/bannerImg4.webp";
import bannerImg5 from "../../assets/assets/bannerImg5.jpg";
import logoIcon from "../../assets/assets/zeroomiro.jpeg";
import Bravery from "../../assets/assets/bravery.jpg";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../Hook/useAxiosSecure";
import { Carousel } from "react-responsive-carousel";
import AnimationBanner from "./AnimationBanner";


const Banner = () => {
  const axiosSecure = useAxiosSecure();

  // ✅ Optimized campaign fetch
  const { data, isLoading } = useQuery({
    queryKey: ["campaign"],
    queryFn: async () => {
      const res = await axiosSecure.get("/campaign");
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 🔥 5 min cache
    refetchOnWindowFocus: false, // ❌ unnecessary refetch বন্ধ
  });

  const [timeLeft, setTimeLeft] = useState(0);

  // ✅ Countdown (optimized)
  useEffect(() => {
    if (!data?.endTime) return;

    const timer = setInterval(() => {
      const diff = data.endTime - Date.now();

      if (diff <= 0) {
        setTimeLeft(0);
        clearInterval(timer);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [data]);

  // ✅ Time convert
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="container mx-auto px-4 mt-32 mb-10">
      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* 🔥 Carousel */}
        <div className="w-full lg:w-8/12 bg-[#e7e7e7] rounded-xl overflow-hidden">
          <AnimationBanner></AnimationBanner>
        </div>

        {/* 🔥 Campaign */}
        <div className="w-full lg:w-4/12 bg-gray-200 rounded-lg p-4">
          <h1 className="text-lg font-semibold mb-2 dark:text-black">
            Flash Sale
          </h1>

          <div className="flex items-center gap-3 py-2">
            <img
              className="w-10 h-10 rounded-full"
              src={logoIcon}
              loading="lazy"
              alt="Zeroomiro logo"
            />
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#FF6D1F] via-[#fdb529] to-[#ff8c42] bg-clip-text text-transparent">
              Zeroomiro
            </h1>
          </div>

          {/* 🔥 Status */}
          {isLoading ? (
            <div className="flex justify-center py-6">
              <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : timeLeft > 0 ? (
            <>
              <p className="text-red-500 mb-3 dark:text-black">
                Campaign ends in
              </p>

              {/* Countdown */}
              <div className="grid grid-flow-col gap-3 sm:gap-4 text-center auto-cols-max">
                {[
                  { label: "days", value: days },
                  { label: "hours", value: hours },
                  { label: "min", value: minutes },
                  { label: "sec", value: seconds },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content"
                  >
                    <span className="countdown font-mono text-3xl sm:text-4xl md:text-5xl">
                      <span style={{ "--value": item.value }}></span>
                    </span>
                    <span className="text-xs sm:text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-red-600 font-bold text-lg mt-3">
              ⛔ Campaign Ended
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;