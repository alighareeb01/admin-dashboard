import React, { useEffect } from "react";
import styles from "./BlankLayout.module.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import ToggleMode from "../ToggleMode/ToggleMode.jsx";
import { initFlowbite } from "flowbite";
export default function BlankLayout() {
  useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-neutral-primary-soft border-b border-default">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="top-bar-sidebar"
                data-drawer-toggle="top-bar-sidebar"
                aria-controls="top-bar-sidebar"
                type="button"
                className="sm:hidden text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm p-2 focus:outline-none"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth={2}
                    d="M5 7h14M5 12h14M5 17h10"
                  />
                </svg>
              </button>
              <Link to="/categories" className="flex ms-2 md:me-24">
                <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
                  Admin DashBoard
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <ToggleMode />
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className="z-50 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44"
                  id="dropdown-user"
                >
                  <div
                    className="px-4 py-3 border-b border-default-medium"
                    role="none"
                  >
                    <p className="text-sm font-medium text-heading" role="none">
                      Neil Sims
                    </p>
                    <p className="text-sm text-body truncate" role="none">
                      neil.sims@flowbite.com
                    </p>
                  </div>
                  <ul className="p-2 text-sm text-body font-medium" role="none">
                    <li>
                      <Link
                        to="#"
                        className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                        role="menuitem"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                        role="menuitem"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                        role="menuitem"
                      >
                        Earnings
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                        role="menuitem"
                      >
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="top-bar-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-neutral-primary-soft border-e border-default">
          <Link
            to="https://flowbite.com/"
            className="flex items-center ps-2.5 mb-5"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 me-3"
              alt="Flowbite Logo"
            />
            <span className="self-center text-lg text-heading font-semibold whitespace-nowrap">
              Flowbite
            </span>
          </Link>
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="/categories"
                className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
              >
                <svg
                  className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Zm0 9H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm10-9h-4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Zm0 9h-4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth={2}
                    d="M6.5 7.5h1m9 0h1M6.5 16.5h1m9 0h1"
                  />
                </svg>
                <span className="ms-3">Categories</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/subcategories"
                className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
              >
                <svg
                  className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6v7a3 3 0 0 0 3 3h5M3 6V5a2 2 0 0 1 2-2h3.172a2 2 0 0 1 1.414.586l1.828 1.828A2 2 0 0 0 12.828 6H18a2 2 0 0 1 2 2v1M3 6h18"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4.172a2 2 0 0 1-1.414-.586L11.586 10.414A2 2 0 0 0 10.172 10H11a2 2 0 0 0-2 2v1Z"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  SubCategories
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
              >
                <svg
                  className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/brands"
                className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
              >
                <svg
                  className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 20h18v-2a6 6 0 0 0-6-6H9a6 6 0 0 0-6 6v2Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 12v2"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Brands</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/coupons"
                className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
              >
                <svg
                  className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9h18v2a2 2 0 0 1-2 2 2 2 0 0 1 2 2v2H3v-2a2 2 0 0 1 2-2 2 2 0 0 1-2-2V9Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 9v8m6-8v8"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Coupons</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/orders"
                className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
              >
                <svg
                  className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Orders</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64 mt-14">
        <Outlet></Outlet>
      </div>
    </>
  );
}
