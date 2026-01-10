import bannerImg1 from "../../assets/slider-1-img.png";
import bannerImg2 from "../../assets/slider-2-img.png";

const Banner = () => {
  return (
    <div className="carousel w-full relative group">

      {/* -------- Slide 1 -------- */}
      <div id="slide1" className="carousel-item relative w-full">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content w-full flex-col md:flex-row-reverse">
            <img src={bannerImg1} className="max-w-sm rounded-lg shadow-2xl" />
            <div>
              <h1 className="text-5xl font-bold">Box Office News!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in.
              </p>
              <button className="btn bg-[#ff7004] text-white hover:bg-black hover:text-[#ff7004]">Shop Now</button>
            </div>
          </div>
        </div>

        {/* Right Button */}
        <div
          className="
            fixed right-5 top-1/2 -translate-y-1/2
            flex md:hidden md:group-hover:flex
          "
        >
          <a href="#slide2" className="btn btn-circle bg-amber-500 text-white">
            ❯
          </a>
        </div>
      </div>

      {/* -------- Slide 2 -------- */}
      <div id="slide2" className="carousel-item relative w-full">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content w-full flex-col md:flex-row-reverse">
            <img src={bannerImg2} className="max-w-sm rounded-lg shadow-2xl" />
            <div>
              <h1 className="text-5xl font-bold">Box Office News!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in.
              </p>
              <button className="btn translate-2  hover:bg-black hover:text-[#ff7004] bg-[#ff7004] text-white">Shop Now</button>
            </div>
          </div>
        </div>

        {/* Left Button */}
        <div
          className="
            absolute left-5 top-1/2 -translate-y-1/2
            flex md:hidden md:group-hover:flex
          "
        >
          <a href="#slide1" className="btn btn-circle bg-amber-500 text-white">
            ❮
          </a>
        </div>
      </div>

    </div>
  );
};

export default Banner;
