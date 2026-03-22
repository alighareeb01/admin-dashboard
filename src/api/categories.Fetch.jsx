import axios from "axios";

export async function categoriesFetch(setCategoriesAllData) {
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

        console.log(allCategories, "line 21");

        if (res.data.categories.length <= 4 && res.data.categories.length > 0) {
          flag = false;
          allCategories.push(res.data.categories);
        } else if (res.data.categories.length == 0) {
          flag = false;
        } else {
          allCategories.push(res.data.categories);
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
