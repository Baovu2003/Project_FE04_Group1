import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import './Layout.css'; 
import { loginActions } from "../../actions/Login";
import { userActions } from "../../actions/UserActions";
import { get } from "../../Helpers/API.helper";
import { useDispatch } from "react-redux";
import { getCookie } from "../../Helpers/Cookie.helper";
function LayoutDefault() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const token = getCookie("token");

  console.log(token);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const accountByToken = await get(
          `http://localhost:5000/user/${token}`
        );
        console.log(accountByToken.user);
        if (accountByToken) {
          dispatch(loginActions(true));
          dispatch(userActions(accountByToken));
          navigate("/");
        }
      } catch (error) {
        navigate("/user/login");
      }
    };

    if (token) {
      fetchApi();
    } else {
      navigate("/user/login");
    }
  }, [token]);

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
