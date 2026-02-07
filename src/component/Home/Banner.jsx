import { Carousel } from "react-responsive-carousel";
import bannerImg1 from "../../assets/assets/unnamed.jpg";
import bannerImg2 from "../../assets/assets/bannerImg2.jpg";
import bannerImg3 from "../../assets/assets/bannerImage3.jpg";
import bannerImg4 from "../../assets/assets/bannerImg4.webp";
import bannerImg5 from "../../assets/assets/bannerImg5.jpg";
import logoIcon from "../../assets/assets/logo.jpg";
import { Link } from "react-router";
import { useEffect, useState } from "react";

const Banner = () => {
  const [time, setTime] = useState({
    days: 1,
    hours: 2,
    minutes: 10,
    seconds: 59,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 mt-16">
      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* ===== Carousel Section ===== */}
        <div className="w-full lg:w-8/12 bg-[#e7e7e7] rounded-xl overflow-hidden">
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
          >
            {[bannerImg1, bannerImg2, bannerImg3, bannerImg4, bannerImg5].map(
              (img, idx) => (
                <div key={idx}>
                  <img
                    src={img}
                    className="h-[200px] sm:h-[300px] md:h-[380px] lg:h-[420px] w-full object-cover"
                    alt="banner"
                  />
                </div>
              )
            )}
          </Carousel>
        </div>

        {/* ===== Campaign Section ===== */}
        <div className="w-full lg:w-4/12 bg-gray-200 rounded-lg p-4">
          <h1 className="text-lg font-semibold mb-2">
            Upcoming Campaigns
          </h1>

          <div className="flex items-center gap-3 py-2">
            <img className="w-10 h-10 rounded-full" src={logoIcon} alt="" />
            <h1 className="text-xl font-bold">
              Zeroo<span className="text-[#ff4e5c]">m</span>
              <span className="text-[#fdb529]">iro</span>
            </h1>
          </div>

          <p className="text-red-500 mb-3">Campaign starts in</p>

          {/* ===== Countdown ===== */}
          <div className="grid grid-flow-col gap-3 sm:gap-4 text-center auto-cols-max">
            {[
              { label: "days", value: time.days },
              { label: "hours", value: time.hours },
              { label: "min", value: time.minutes },
              { label: "sec", value: time.seconds },
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
        </div>
      </div>
    </div>
  );
};

export default Banner;
