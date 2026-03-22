import axios from "axios";
import React, { useContext } from "react";
import { User } from "../contexts/UserContext";

export async function categoriesFetch() {
  const { setCategoriesAllData } = useContext(User);
  let allCategories = [];
  let page = 1;
  console.log("jnnbshbs");
  let flag = true;
  while (flag) {
    await axios
      .get(`https://nti-ecommerce.vercel.app/api/v1/categories?page=${page}`, {
        headers: {
          token: localStorage.getItem("dbToken"),
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.categories);
        console.log("page = ", page);
        allCategories.push(res.data.categories);
        console.log(allCategories, "line 21");

        if (res.data.categories.length <= 4) {
          flag = false;
        } else {
          page++;
        }
      })
      .catch((err) => {
        console.log(err);
        flag = false;
      });
  }
  console.log(allCategories, "line 26");
  setCategoriesAllData(allCategories);
}
