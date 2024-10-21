import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import './Layout.css'; 
function LayoutDefault() {
  return (
    <>
      <div id="app">
        <header>
           <Header/>
        </header>


        <main>
            <Outlet/>         
        </main>

        <footer>
          <Footer/>
        </footer>
      </div>
    </>
  );
}

export default LayoutDefault;
