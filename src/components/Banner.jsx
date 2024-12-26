import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import bannerOne from "../assets/aden-1.jpg";
import bannerTwo from "../assets/aden-2.jpg";
import bannerThree from "../assets/aden-3.jpg";

const Banner = () => {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      className="mySwiper z-0"
      spaceBetween={10}
    >
      <SwiperSlide className="relative">
        <img
          src={bannerOne}
          alt="Service Banner 1"
          className="w-full h-64 md:h-80 lg:h-96 object-cover"
        />
        <div className="absolute top-1/3 md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-4 text-center">
          <h1 className="text-lg md:text-3xl font-bold">
            Find Trusted Services Near You
          </h1>
          <p className="text-sm md:text-base">
            Discover a variety of services tailored to your needs, from home
            repair to personal care.
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative">
        <img
          src={bannerTwo}
          alt="Service Banner 2"
          className="w-full h-64 md:h-80 lg:h-96 object-cover"
        />
        <div className="absolute top-1/3 md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-4 text-center">
          <h1 className="text-lg md:text-3xl font-bold">
            Share Your Own Services
          </h1>
          <p className="text-sm md:text-base">
            Easily share your services with others and help people in your
            community.
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative">
        <img
          src={bannerThree}
          alt="Service Banner 3"
          className="w-full h-64 md:h-80 lg:h-96 object-cover"
        />
        <div className="absolute top-1/3 md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-4 text-center">
          <h1 className="text-lg md:text-3xl font-bold">
            Book Your Services Effortlessly
          </h1>
          <p className="text-sm md:text-base">
            Schedule and book the services you need with just a few clicks,
            hassle-free.
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
