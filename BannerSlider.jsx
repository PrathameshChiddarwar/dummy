import React from "react";
import Slider from "react-slick";
import banner1 from "../assets/banner.png";
import banner2 from "../assets/stationary banner.jpg";
import banner3 from "../assets/cosmetics.png";
const BannerSlider = () => {
  const banners = [
    {
      id: 1,
      image:banner1,
      title: "Big Sale on Gift Items& Stationary",
      subtitle: "Up to 50% Off on Top Brands",
    },
    {
      id: 2,
      image: banner2,
      title: "New Arrivals in New Season Of College",
      subtitle: "Trendy Styles for Everyone",
    },
    {
      id: 3,
      image: banner3,
      title: "Exclsive deals on Beauty Products ",
      subtitle: "Cosmetics and Beauty Products",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    fade: true,
  };

  return (
    <div className="relative w-full max-w-[1400px] mx-auto mt-20">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id}>
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-2xl">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
             <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-purple-900/40 to-black/70 flex flex-col justify-center items-center text-center text-white px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-2">
                  {banner.title}
                </h2>
                <p className="text-lg md:text-xl">{banner.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
