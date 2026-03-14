import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./components/AuthLayout/AuthLayout.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import BlankLayout from "./components/BlankLayout/BlankLayout.jsx";
import Categories from "./components/Categories/Categories.jsx";
import SubCategories from "./components/SubCategories/SubCategories.jsx";
import Brands from "./components/Brands/Brands.jsx";
import Products from "./components/Products/Products.jsx";
import Coupons from "./components/Coupons/Coupons.jsx";
import Orders from "./components/Orders/Orders.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import UserProvider from "./contexts/UserContext";
let routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/",
    element: <BlankLayout />,
    children: [
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/subcategories",
        element: <SubCategories />,
      },
      {
        path: "/brands",
        element: <Brands />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/coupons",
        element: <Coupons />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
function App() {
  return (
    <>
      <UserProvider>
        <RouterProvider router={routes}></RouterProvider>
      </UserProvider>
    </>
  );
}

export default App;
