import React from "react";
import Header from "./Header/Header";
import { NavLink, Outlet } from "react-router-dom";
import './LayoutDefaultAdmin.css';

function LayoutDefaultAdmin() {
  return (
    <div id="app">
      <header>
        <Header />
      </header>

      <main className="admin-layout">
        <div className="sidebar">
          <ul>
            <li>
              <NavLink to={`dashboard`} activeClassName="active">Tổng quan</NavLink>
            </li>
            <li>
              <NavLink to={`products-category`} activeClassName="active">Danh mục sản Phẩm</NavLink>
            </li>
            <li>
              <NavLink to={`products`} activeClassName="active">Sản Phẩm</NavLink>
            </li>
            <li>
              <NavLink to={`roles`} activeClassName="active">Nhóm quyền</NavLink>
            </li>
            <li>
              <NavLink to="permissions" activeClassName="active">Phân quyền</NavLink>
            </li>
          </ul>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </main>

    </div>
  );
}

export default LayoutDefaultAdmin;
