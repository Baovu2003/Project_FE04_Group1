import React, { useEffect } from "react";
import Header from "./Header/Header";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./LayoutDefaultAdmin.css";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../Helpers/Cookie.helper";
import { loginActions } from "../../actions/Login";
import { accountActions } from "../../actions/AccountActions";
import { get } from "../../Helpers/API.helper";

function LayoutDefaultAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.AccountReducer);
  console.log(account);

  const token = getCookie("token");

  console.log(token);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const accountByToken = await get(
          `http://localhost:5000/admin/auth/${token}`
        );
        console.log(accountByToken);
        if (accountByToken) {
          dispatch(loginActions(true));
          dispatch(accountActions(accountByToken));
        }
      } catch (error) {
        navigate("/admin/auth/login");
      }
    };

    if (token) {
      fetchApi();
    } else {
      navigate("/admin/auth/login");
    }
  }, [token]);
  return (
    <div id="app">
      {account && account.role && account.role.permission?.length > 0 ? (
        <>
          <header>
            <Header />
          </header>

          <main className="admin-layout">
            <div className="sidebar">
              {/* Kiểm tra nếu account và account.role tồn tại trước khi truy cập */}

              <>
                <ul>
                  <li>
                    <NavLink to={`dashboard`} activeClassName="active">
                      Tổng quan
                    </NavLink>
                  </li>
                  {account.role.permission.includes(
                    "products-category_view"
                  ) && (
                    <li>
                      <NavLink
                        to={`products-category`}
                        activeClassName="active"
                      >
                        Danh mục sản Phẩm
                      </NavLink>
                    </li>
                  )}

                  {account.role.permission.includes("products_view") && (
                    <li>
                      <NavLink to="products" activeClassName="active">
                        Sản Phẩm
                      </NavLink>
                    </li>
                  )}

                  {account.role.permission.includes("roles_view") && (
                    <li>
                      <NavLink to="roles" activeClassName="active">
                        Nhóm quyền
                      </NavLink>
                    </li>
                  )}

                  {account.role.permission.includes("permissions_view") && (
                    <li>
                      <NavLink to="permissions" activeClassName="active">
                        Phân quyền
                      </NavLink>
                    </li>
                  )}

                  {account.role.permission.includes("accounts_view") && (
                    <li>
                      <NavLink to="accounts" activeClassName="active">
                        Danh sách tài khoản
                      </NavLink>
                    </li>
                  )}
                </ul>
              </>
            </div>
            <div className="content">
              <Outlet />
            </div>
          </main>
        </>
      ) : (
        <>Không có quyền</>
      )}
    </div>
  );
}

export default LayoutDefaultAdmin;
