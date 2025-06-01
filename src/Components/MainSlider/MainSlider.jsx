import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slider1 from '../../assets/imgs/slider1.jpg';
import slider2 from '../../assets/imgs/slider2.jpg';
import staticImage1 from '../../assets/imgs/staticimage1.jpg';
import staticImage2 from '../../assets/imgs/staticimage2.jpg';
const MainSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };


  return (
<div className="main-slider overflow-hidden my-10">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-12 ">
      
      <div className="col-span-12 md:col-span-4 flex flex-col ">
        <img 
          src={staticImage1} 
          alt="Static 1" 
          className="w-full h-[200px] md:h-[250px] object-cover  "
        />
        <img 
          src={staticImage2} 
          alt="Static 2" 
          className="w-full h-[200px] md:h-[250px] object-cover "
        />
      </div>

     
      <div className="col-span-12 md:col-span-8">
        <Slider {...settings}>
          <div className="relative h-[400px] md:h-[500px]">
            <img 
              src={slider1} 
              alt="Slide 1" 
              className="w-full h-full object-cover object-center "
            />
          </div>
          <div className="relative h-[400px] md:h-[500px]">
            <img 
              src={slider2} 
              alt="Slide 2" 
              className="w-full h-full object-cover object-center "
            />
          </div>
        </Slider>
      </div>

    </div>
  </div>
</div>


  );
};

export default MainSlider;