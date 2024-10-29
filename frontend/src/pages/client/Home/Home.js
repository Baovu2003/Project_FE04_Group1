import React from "react";
import "./Home.css";
import Slider from "./Slider/Slider";
import Story from "./Story/Story";
import MoreProducts from "./MoreProduct/MoreProducts";
import NewProduct from "./NewProduct/NewProduct";

function Home() {
  return (
    <>
      <Slider/>
      <Story />
      <MoreProducts />
      <NewProduct/>
      <div className="full-width-section"></div>
    </>
  );
}

export default Home;
