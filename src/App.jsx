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
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import GuestRoute from "./components/GuestRoute/GuestRoute.jsx";
import { Toaster } from "react-hot-toast";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
let routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/register",
        element: (
          <GuestRoute>
            <Register />
          </GuestRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/",
    element: <BlankLayout />,
    children: [
      {
        // path: "/",
        index: true,
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "/subcategories",
        element: (
          <ProtectedRoute>
            <SubCategories />
          </ProtectedRoute>
        ),
      },
      {
        path: "/brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "/products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "/productdetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },

      {
        path: "/coupons",
        element: (
          <ProtectedRoute>
            <Coupons />
          </ProtectedRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
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
        <Toaster />
      </UserProvider>
    </>
  );
}

export default App;
