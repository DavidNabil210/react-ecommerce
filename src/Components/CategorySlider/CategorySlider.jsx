import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Loadingspinner/LoadingSpinner";

export default function CategorySlider() {
  // const [Categories, setCategories] = useState([]);
  // async function GetCategories() {
  //   const {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  //   // console.log(data.data);
  //   setCategories(data.data);
  // }
  // useEffect(() => {
  //   GetCategories();
  
    
  // }, [])
  const {data,isError,error,isLoading}= useQuery({
    queryKey: ['categories'],
    queryFn: ()=> axios.get("https://ecommerce.routemisr.com/api/v1/categories"),

  })
  const categories=data?.data?.data;
  if(isLoading){
    return <LoadingSpinner/>
  }
  if(isError){
    console.log(error.message);
  }
  
    const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots:true,
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 576,
        
        settings: {
          dots:true,
          slidesToScroll: 1,
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
   <div className="container mx-auto px-4 py-6">
    <h2 className="text-xl font-bold mb-4 text-indigo-600">Shop Popular Categories</h2>
    <Slider {...settings}>
      {categories.map((category)=>(
        <div key={category._id}>
          <div className="bg-white overflow-hidden shadow-md rounded-lg text-center">
            <img src={category.image} alt={category.name} className="object-cover h-40 w-full" />
            <p>{category.name}</p>
          </div>
        </div>
      ))

      }
    </Slider>
   </div>
  );
}
