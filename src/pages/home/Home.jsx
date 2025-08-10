import React from "react";

import {  useNavigation } from "react-router";
import FoodSharingGuide from "../../Components/FoodSharingGuide";
import FoodHandlingEssentials from "../../Components/FoodHandlingEssentials";
import FeaturedFoods from "../../Components/FeaturedFoods";
import HomePageHero from "../../Components/HomePageHero";
import Carousel from "../../Components/carousel/Carousel";
import Reviews from "../../Components/Reviews";

const Home = () => {
  const navigation = useNavigation();

  return (
    <div>
      {navigation.state === "loading" ? (
        <span className="loading loading-spinner text-success"></span>
      ) : (
        <div>
          <div className="flex flex-col items-center justify-center ">
            <Carousel></Carousel>
           <HomePageHero></HomePageHero>
            <FeaturedFoods></FeaturedFoods>
            <FoodSharingGuide></FoodSharingGuide>
            <Reviews></Reviews>
            <FoodHandlingEssentials></FoodHandlingEssentials>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
