import React from "react";
import "./Home.css";
import Slider from "./Slider/Slider";
import Story from "./Story/Story";
import MoreProducts from "./MoreProduct/MoreProducts";

function Home() {
  return (
    <>
      <Slider/>
      <Story />
      <MoreProducts />
      <div className="full-width-section"></div>
    </>
  );
}

export default Home;
