import { Carousel } from "react-responsive-carousel";
import bannerImg2 from "../../assets/assets/bannerImg2.jpg";
import bannerImg3 from "../../assets/assets/bannerImage3.jpg";
import bannerImg4 from "../../assets/assets/bannerImg4.webp";
import bannerImg5 from "../../assets/assets/bannerImg5.jpg";
import logoIcon from "../../assets/assets/logo.jpg";
import Bravery from "../../assets/assets/bravery.jpg";
import { useEffect, useState } from "react";

const Banner = () => {

  // get end time from localStorage
  const getCampaignEnd = () => {
    let end = localStorage.getItem("campaignEnd");

    if (!end) {
      end = new Date().getTime() + 2 * 24 * 60 * 60 * 1000; // 2 days
      localStorage.setItem("campaignEnd", end);
    }

    return parseInt(end);
  };

  const [timeLeft, setTimeLeft] = useState(getCampaignEnd() - new Date().getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      const end = getCampaignEnd();
      const difference = end - new Date().getTime();

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft(0);
      } else {
        setTimeLeft(difference);
      }

    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="container mx-auto px-4 mt-32 mb-10">
      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* Carousel */}
        <div className="w-full lg:w-8/12 bg-[#e7e7e7] rounded-xl overflow-hidden">
          <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay>
            {[bannerImg2, bannerImg3, bannerImg4, bannerImg5, Bravery].map((img, idx) => (
              <div key={idx}>
                <img
                  src={img}
                  className="h-[200px] sm:h-[300px] md:h-[380px] lg:h-[420px] w-full object-cover"
                  alt="banner"
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Campaign */}
        <div className="w-full lg:w-4/12 bg-gray-200 rounded-lg p-4">
          <h1 className="text-lg font-semibold mb-2 dark:text-black">
            Upcoming Campaigns
          </h1>

          <div className="flex items-center gap-3 py-2">
            <img className="w-10 h-10 rounded-full" src={logoIcon} alt="" />
            <h1 className="text-xl md:text-2xl font-bold text-[#FF6D1F]">
                Zeroo<span className="text-[#fdb529]">m</span>
                <span className="text-[#FF6D1F]">iro</span>
              </h1>
          </div>

          <p className="text-red-500 mb-3 dark:text-black">
            Campaign starts in
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

        </div>
      </div>
    </div>
  );
};

export default Banner;