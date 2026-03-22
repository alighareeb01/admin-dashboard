import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { categoriesFetch } from "../../api/categories.Fetch";
import { User } from "../../contexts/UserContext";

export default function Pagination() {
  categoriesFetch();
  const {
    categoriesAllData,
    setCategoriesPageData,
    setCategoriesPage,
    categoriesPage,
  } = useContext(User);
  console.log(categoriesAllData.length, "line 8");
  function changePage(numberPage) {
    categoriesFetch();
    setCategoriesPageData(categoriesAllData[numberPage - 1]);
    setCategoriesPage(numberPage);
  }
  function goBack() {
    if (categoriesPage != 1) {
      categoriesFetch();
      setCategoriesPageData(categoriesAllData[categoriesPage - 2]);
      setCategoriesPage(categoriesPage - 1);
    }
  }
  function goNext() {
    if (categoriesPage != categoriesAllData.length) {
      categoriesFetch();
      setCategoriesPageData(categoriesAllData[categoriesPage]);
      setCategoriesPage(categoriesPage + 1);
    }
  }
  let [numberPage, setNumberPage] = useState(0);
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="flex -space-x-px text-sm">
          {categoriesPage != 1 && (
            <li>
              <NavLink
                onClick={() => {
                  goBack();
                }}
                className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-s-base text-sm w-10 h-10 focus:outline-none"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-4 h-4 rtl:rotate-180"
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
                    d="m15 19-7-7 7-7"
                  />
                </svg>
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              onClick={() => {
                goBack();
              }}
              className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-s-base text-sm w-10 h-10 focus:outline-none"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-4 h-4 rtl:rotate-180"
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
                  d="m15 19-7-7 7-7"
                />
              </svg>
            </NavLink>
          </li>

          {categoriesAllData.map((page) => {
            setNumberPage(numberPage + 1);
            return (
              <li>
                <NavLink
                  onClick={() => {
                    changePage(numberPage);
                  }}
                  className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium text-sm w-10 h-10 focus:outline-none"
                >
                  {numberPage}
                </NavLink>
              </li>
            );
          })}
          {/* <li>
            <NavLink
              to="#"
              className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium text-sm w-10 h-10 focus:outline-none"
            >
              1
            </NavLink>
          </li>

          <li>
            <NavLink
              to="#"
              aria-current="page"
              className="flex items-center justify-center text-fg-brand bg-neutral-tertiary-medium box-border border border-default-medium hover:text-fg-brand font-medium text-sm w-10 h-10 focus:outline-none"
            >
              3
            </NavLink>
          </li> */}
          {categoriesPage != categoriesAllData.length && (
            <li>
              <NavLink
                onClick={() => {
                  goNext();
                }}
                className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-e-base text-sm w-10 h-10 focus:outline-none"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-4 h-4 rtl:rotate-180"
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
                    d="m9 5 7 7-7 7"
                  />
                </svg>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
