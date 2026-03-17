import React, { useContext, useEffect, useState } from "react";
import styles from "./Products.module.css";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z, { ZodError } from "zod";
import { User } from "../../contexts/UserContext.jsx";

const schema = z.object({
  title: z.string().min(2, "Minimum character 2").max(50, "Max character 50"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  description: z.string().min(5, "Minimum character 5"),
  stock: z.number().min(0, "Stock must be a positive number"),
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().min(1, "SubCategory is required"),
  brand: z.string().min(1, "Brand is required"),
  imageCover: z.any().optional(),
  images: z.any().optional(),
});

const arr = [{
  title: "asd",
  price: 10,
  description :"asdasd",
  stock :"asdasd",
  category:"asdasdasd",
  subCategory :"asdasd",
  brand :"asdasd"
},{
  title: "asd",
  price: 10,
  description :"asdasd",
  stock :"asdasd",
  category:"asdasdasd",
  subCategory :"asdasd",
  brand :"asdasd"
},{
  title: "asd",
  price: 10,
  description :"asdasd",
  stock :"asdasd",
  category:"asdasdasd",
  subCategory :"asdasd",
  brand :"asdasd"
}]
export default function Products() {
  const [productsData, setProductsData] = useState([]);
  let [currentProduct, setCurrentProduct] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  let [categortData, setCategoryData] = useState([]);
  let [subCategoryData, setSubCategoryData] = useState([]);
  let [brandData, setBrandData] = useState([]);
  useEffect(() => {
    getAllProducts();
    getAllCategories();
    getAllBrands();
    getAllSubCategories();
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);


  function getAllCategories() {
    axios
      .get("https://nti-ecommerce.vercel.app/api/v1/categories", {
        headers: {
          token: localStorage.getItem("dbToken"),
        },
      })
      .then((res) => {
        console.log(res);
        setCategoryData(res.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }

    function getAllBrands() {
    axios
      .get("https://nti-ecommerce.vercel.app/api/v1/brands", {
        headers: {
          token: localStorage.getItem("dbToken"),
        },
      })
      .then((res) => {
        setBrandData(res.data.brands);
      })
      .catch((err) => {
        console.error("Error fetching brands:", err);
      });
  }

    function getAllSubCategories() {
    axios
      .get("https://nti-ecommerce.vercel.app/api/v1/subCategories", {
        headers: {
          token: localStorage.getItem("dbToken"),
        },
      })
      .then((res) => {
        // console.log(res);
        setSubCategoryData(res.data.categories);
      })
      .catch((err) => {
        // console.log(err);
      });
  }


  let { register, handleSubmit, formState, setValue } = useForm({
    defaultValues: {
      title: "",
      price: "",
      description: "",
      stock: "",
      category: "",
      subCategory: "",
      brand: "",
      imageCover: "",
      images :""
    },
    resolver: zodResolver(schema),
  });
  function openModal(product = null) {
    setIsModalOpen(true);

    if (product) {
      setIsEdit(true);
      setValue("name", product.name);
   
    } else setIsEdit(false);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function getAllProducts() {
    axios
      .get("https://nti-ecommerce.vercel.app/api/v1/products", {
        headers: {
          token: localStorage.getItem("dbToken"),
        },
      })
      .then((res) => {
        // console.log(res.data.Products,"lin");

        setProductsData(res.data.Products);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function submitProducts(data) {
    console.log(data);
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("stock", data.stock);
    formData.append("category", data.category);
    formData.append("subCategory", data.subCategory);
    
   
    
    if (data.imageCover && data.imageCover[0]) {
      formData.append("imageCover", data.imageCover[0]);
    }
    // ✅ CORRECT way to debug FormData
    console.log("=== FormData Contents ===");
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}:`, {
          name: value.name,
          size: value.size,
          type: value.type,
        });
      } else {
        console.log(`${key}:`, value);
      }
    }
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }
    // ✅ CORRECT way to debug FormData
    console.log("=== FormData Contents ===");
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}:`, {
          name: value.name,
          size: value.size,
          type: value.type,
        });
      } else {
        console.log(`${key}:`, value);
      }
    }

    console.log(formData);
    
    console.log("======================");

    if (isEdit) 
    {
    axios
      .put(`https://nti-ecommerce.vercel.app/api/v1/products/${currentProduct._id}`, {
        headers: {
          token: localStorage.getItem("dbToken"),
        },
      })
      .then((res) => {
        console.log(res);
        getAllProducts();
      })
      .catch((err) => {
        console.log(err);
      }).finally(() =>{
        closeModal();
      });
    }
    else
  {  axios
      .post("https://nti-ecommerce.vercel.app/api/v1/products", formData, {
        headers: {
          token: localStorage.getItem("dbToken"),
        },
      })
      .then((res) => {
        console.log(res);
        getAllProducts();
      })
      .catch((err) =>
        console.error("Error:", err.response?.data || err.message),
      )
      .finally(() => {
        closeModal();
      });}
  }
  function deleteProduct(id) {
    console.log(id);
    axios
      .delete(`https://nti-ecommerce.vercel.app/api/v1/products/${id}`, {
        headers: {
          token: localStorage.getItem("dbToken"),
        },
      })
      .then((res) => {
        console.log(res);
        getAllProducts();
      })
      .catch((err) => {
        console.error("Status:", err.response?.status); // 401 = Unauthorized, 404 = Not Found
        console.error("Message:", err.response?.data?.message || err.message);
      });
    console.log("mndavhjasdvhuvsahuvsdhauvhuadsvhudsav");
  }
  function editProduct(el) {
    openModal(el);
       setCurrentProduct(el);
    
  }
  return (
    <>
      <div className="flex justify-end my-4">
        <button
          type="button"
          className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          onClick={() => {
            openModal(null);
          }}
        >
          <i className="fa-solid fa-plus fa-xl me-3"></i>
          Add Product
        </button>
      </div>

      <div className="relative overflow-x-auto p-4 bg-neutral-secondary-medium rounded-base">
        <table
          className="w-full text-sm text-left rtl:text-right text-body border-separate space-y-3"
          style={{ borderSpacing: "0 12px" }}
        >
          <thead className="text-sm text-body">
            <tr>
              <th scope="col" className="px-6 py-3 font-semibold">
                Product Title
              </th>
              <th scope="col" className="px-6 py-3 font-semibold">
                imageCover
              </th>
              <th scope="col" className="px-6 py-3 font-semibold">
                images
              </th>
              <th scope="col" className="px-6 py-3 font-semibold">
                category
              </th>
              <th scope="col" className="px-6 py-3 font-semibold">
                subCategory
              </th>
              <th scope="col" className="px-6 py-3 font-semibold">
                brand
              </th>
              <th scope="col" className="px-6 py-3 font-semibold">
                price
              </th>
              <th scope="col" className="px-6 py-3 font-semibold">
                stock
              </th>
              <th scope="col" className="px-6 py-3 font-semibold">
                description
              </th>
              
              
              <th scope="col" className="px-6 py-3 font-semibold text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {productsData?.map((el) => {
              return (
                <tr
                  key={el._id}
                  className="bg-neutral-primary shadow-sm rounded-xl border border-default-light hover:shadow-md transition-shadow"
                >
                  {/* Name Column - Rounded Left Edge */}
                  <th
                    scope="row"
                    className="px-6 py-5 text-xl font-bold text-heading whitespace-nowrap rounded-s-xl"
                  >
                    {el.title}
                  </th>

                  {/* Photo Column - Large & Rounded */}
                  <td className="px-6 py-5">
                    <div className="w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-2xl  shadow-sm">
                      <img
                        className="w-full h-full object-cover"
                        src={el.imageCover}
                        alt={el.imageCover}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-2xl  shadow-sm">
                      <img
                        className="w-full h-full object-cover"
                        src={el.images}
                        alt={el.images}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-2xl  shadow-sm">
                      {
                        categortData.find((x) => {
                          x._id = el.category;
                        })?.name
                      }
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-2xl  shadow-sm">
                      {
                        subCategoryData.find((x) => {
                          x._id = el.subCategory;
                        })?.name
                      }
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-2xl  shadow-sm">
                       {
                        brandData.find((x) => {
                          x._id = el.brand;
                        })?.name
                      }
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-2xl  shadow-sm">
                      {el.price}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-2xl  shadow-sm">
                      {el.stock}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-2xl  shadow-sm">
                      {el.description}
                    </div>
                  </td>

                  {/* Actions Column - Rounded Right Edge */}
                  <td className="px-6 py-5 rounded-e-xl text-right">
                    <div className="flex justify-end gap-3">
                      {/* Warning Edit Button */}
                      <button
                        type="button"
                        title="Edit"
                        className="text-white bg-warning hover:bg-warning-strong focus:ring-4 focus:ring-warning-medium font-medium rounded-full text-lg w-12 h-12 flex items-center justify-center transition-all active:scale-90"
                        onClick={() => {
                          editProduct(el);
                        }}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>

                      {/* Red Delete Button */}
                      <button
                        type="button"
                        title="Delete"
                        className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-lg w-12 h-12 flex items-center justify-center transition-all active:scale-90"
                        onClick={() => {
                          deleteProduct(el._id);
                        }}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          // aria-hidden="true"
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
              <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                <h3 className="text-lg font-medium text-heading">
                  {isEdit ? "Edit prodcut" : "Add New product"}
                </h3>
                <button
                  type="button"
                  className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
                  data-modal-hide="authentication-modal"
                  onClick={closeModal}
                >
                  <svg
                    className="w-5 h-5"
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
                      d="M6 18 17.94 6M18 18 6.06 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <form
                action=""
                onSubmit={handleSubmit(submitProducts)}
                className="pt-4 md:pt-6"
              >
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block mb-2.5 text-sm font-medium text-heading"
                  >
                   product title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    required=""
                    {...register("title")}
                  />
                  {formState.errors.title && (
                    <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                      {formState.errors.title.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="imageCover"
                    className="block mb-2.5 text-sm font-medium text-heading"
                  >
                    imageCover
                  </label>
                  <input
                    type="file"
                    id="imageCover"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    {...register("imageCover")}
                  />
                  {formState.errors.imageCover && (
                    <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                      {formState.errors.imageCover.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="images"
                    className="block mb-2.5 text-sm font-medium text-heading"
                  >
                    images
                  </label>
                  <input
                    type="file"
                    id="images"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    {...register("images")}
                  />
                  {formState.errors.images && (
                    <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                      {formState.errors.images.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block mb-2.5 text-sm font-medium text-heading"
                  >
                   product price
                  </label>
                  <input
                    type="text"
                    id="price"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    required=""
                    {...register("price")}
                  />
                  {formState.errors.price && (
                    <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                      {formState.errors.price.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block mb-2.5 text-sm font-medium text-heading"
                  >
                   product description
                  </label>
                  <input
                    type="text"
                    id="description"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    required=""
                    {...register("description")}
                  />
                  {formState.errors.description && (
                    <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                      {formState.errors.description.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="stock"
                    className="block mb-2.5 text-sm font-medium text-heading"
                  >
                   product stock
                  </label>
                  <input
                    type="text"
                    id="stock"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    required=""
                    {...register("stock")}
                  />
                  {formState.errors.stock && (
                    <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                      {formState.errors.stock.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block mb-2.5 text-sm font-medium text-heading"
                  >
                   product category
                  </label>
                  <input
                    type="text"
                    id="category"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    required=""
                    {...register("category")}
                  />
                  {formState.errors.category && (
                    <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                      {formState.errors.category.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="subCategory"
                    className="block mb-2.5 text-sm font-medium text-heading"
                  >
                   product subCategory
                  </label>
                  <input
                    type="text"
                    id="subCategory"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    required=""
                    {...register("subCategory")}
                  />
                  {formState.errors.subCategory && (
                    <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                      {formState.errors.subCategory.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="brand"
                    className="block mb-2.5 text-sm font-medium text-heading"
                  >
                   product brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    required=""
                    {...register("brand")}
                  />
                  {formState.errors.brand && (
                    <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                      {formState.errors.brand.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="text-white my-7 bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none w-full mb-3"
                >
                  {isEdit ? "Update product" : "Add product"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
