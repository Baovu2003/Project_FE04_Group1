import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutDefault from "./LayoutDefault/LayoutDefaultClient/LayoutDefault";
import LayoutDefaultAdmin from "./LayoutDefault/LayoutDefaultAdmin/LayoutDefaultAdmin";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import Category from "./pages/admin/Category/Category";
import Product from "./pages/admin/Product/Product";
import RoleGroup from "./pages/admin/RoleGroup/RoleGroup";
import NotFoundClient from "./pages/client/404NotFound/NotFound";
import NotFoundAdmin from "./pages/admin/404NotFound/NotFound";
import Home from "./pages/client/Home/Home";
import About from "./pages/client/About/About";
import ListProduct from "./pages/client/listProduct/ListProduct";
import Contact from "./pages/client/Contact/Contact";
import Permisssions from "./pages/admin/Permissions/Permisssions";
import UpdateProduct from "./pages/admin/Product/UpdateProduct";
import AllProduct from "./pages/admin/Product/AllProduct";
import DetailProduct from "./pages/admin/Product/DetailProduct";
import Createproduct from "./pages/admin/Product/Createproduct";
import AllCategory from "./pages/admin/Category/AllCategory";
import CreateCategory from "./pages/admin/Category/CreateCategory";
import RolesList from "./pages/admin/RoleGroup/RoleList";
import CreateRole from "./pages/admin/RoleGroup/CreateRole";
import UpdateRole from "./pages/admin/RoleGroup/UpdateRole";
import AccountIndex from "./pages/admin/Accounts/AccountIndex";
import AccountList from "./pages/admin/Accounts/AccountList";
import AccountCreate from "./pages/admin/Accounts/AccountCreate";
import Login from "./pages/admin/Auth/Login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutDefault />}>
          <Route index element={<Home />} />
          <Route path="listProduct" element={<ListProduct />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFoundClient />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<LayoutDefaultAdmin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products-category" element={<AllCategory />}>
            <Route index element={<Category />} />
            <Route path="create" element={<CreateCategory />} />
          </Route>

          <Route path="products" element={<AllProduct />}>
            <Route index element={<Product />} />
            <Route path="create" element={<Createproduct />} />
            <Route path="detail/:id" element={<DetailProduct />} />
            <Route path="edit/:id" element={<UpdateProduct />} />{" "}
          </Route>

          <Route path="roles" element={<RoleGroup />}>
            <Route index element={<RolesList />} />
            <Route path="create" element={<CreateRole />} />
            <Route path="edit/:id" element={<UpdateRole />} />
          </Route>

          <Route path="accounts" element={<AccountIndex />}>
            <Route index element={<AccountList />} />
            <Route path="create" element={<AccountCreate />} />
            {/* <Route path="edit/:id" element={<UpdateRole />} /> */}
          </Route>

          <Route path="permissions" element={<Permisssions />} />
          <Route path="*" element={<NotFoundAdmin />} />
        </Route>
        <Route path="/admin/auth/login" element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
