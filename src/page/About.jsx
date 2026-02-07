import React from "react";

const About = () => {
  return (
    <div className="bg-indigo-500 pt-30 text-center">
      <h1 className=" md:text-5xl text-white font-bold pb-4">
        ABOUT
        Zeroo<span className="text-[#ff4e5c]">m</span>
        <span className="text-[#fdb529]">iro</span>
      </h1>
      <p className="text-lg font-bold text-white w-150 text-center mx-auto">
        Bangladesh's Trusted E-commerce Platform for Original Electronics &
        Content Creator Gear Since 2026
      </p>
      <div className="flex gap-4 justify-center py-20">
        <h1 className="md:w-60 py-3 rounded-2xl bg-indigo-400 text-white font-semibold">
          <span>BD</span> Made in Bangladesh
        </h1>
        <h1 className="md:w-60 py-3 rounded-2xl bg-indigo-400 text-white font-semibold">
          <span>BD</span> Made in Bangladesh
        </h1>
        <h1 className="md:w-60 py-3 rounded-2xl bg-indigo-400 text-white font-semibold">
          <span>BD</span> Made in Bangladesh
        </h1>
      </div>
    </div>
  );
};

export default About;
