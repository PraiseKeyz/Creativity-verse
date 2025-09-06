import React from "react";
import Slider from "react-slick";

type DiscountItem = {
  title: string;
  subtitle: string;
  action: string;
};

const discountData: DiscountItem[] = [
  {
    title: "20% Discount on Ebooks",
    subtitle: "Exclusive for CV Pro Members.",
    action: "Explore Deals",
  },
  {
    title: "50% Off Design Templates",
    subtitle: "Premium resources for your creative journey.",
    action: "View Templates",
  },
  {
    title: "10% Off Upcoming Workshop",
    subtitle: "Join our premium design workshop.",
    action: "Register Now",
  },
];

const DiscountSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    appendDots: (dots: React.ReactNode) => (
      <div style={{ bottom: "35px" }}>
        <ul className="slick-dots ">{dots}</ul>
      </div>
    ),
  };

  return (
    <Slider {...settings}>
      {discountData.map((item, index) => (
        <div key={index} className="p-4">
          <div className="bg-gradient-to-r from-[#ff9f43] to-[#ff6f00] p-6 rounded-xl text-white shadow flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm opacity-90">{item.subtitle}</p>
            </div>
            <button className="bg-black px-4 py-2 rounded-md text-sm hover:bg-white hover:text-black transition-colors">
              {item.action}
            </button>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default DiscountSlider;