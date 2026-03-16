import React, { useContext, useEffect, useState } from "react";
import styles from "./Categories.module.css";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { User } from "../../contexts/UserContext.jsx";

let schema = z.object({
  name: z.string().min(3, "Minumun character 3").max(30, "max character 30"),
  image: z.any().optional(),
});
export default function Categories() {
  const [ categoriesData, setCategoriesData ] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    getAllCategories();
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({});
  let { register, handleSubmit, formState, setValue } = useForm({
    defaultValues: {
      name: "",
      image: "",
    },
    resolver: zodResolver(schema),
  });

  function openModal(category = null) {
    setIsModalOpen(true);

    if (category) {
      setIsEdit(true);
      setValue("name", category.name);
    } else setIsEdit(false);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function getAllCategories() {
    axios
      .get("https://nti-ecommerce.vercel.app/api/v1/categories", {
        headers: {
          token: localStorage.getItem("dbToken"),
        },
      })
      .then((res) => {
        console.log(res);
        setCategoriesData(res.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function submitCategories(data) {
    console.log(currentCategory, "line 57");

    console.log(data);
    let formData = new FormData();
    formData.append("name", data.name);
    console.log(formData, "line 35");

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
    console.log("======================");
    if (isEdit == true) {
      axios
        .put(
          `https://nti-ecommerce.vercel.app/api/v1/categories/${currentCategory._id}`,
          formData,
          {
            headers: {
              token: localStorage.getItem("dbToken"),
            },
          },
        )
        .then((res) => {
          console.log(res, "line 93");
          getAllCategories();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsEdit(false);
          closeModal();
        });
    } else {
      axios
        .post("https://nti-ecommerce.vercel.app/api/v1/categories", formData, {
          headers: {
            token: localStorage.getItem("dbToken"),
          },
        })
        .then((res) => {
          console.log(res);
          getAllCategories();
        })
        .catch((err) =>
          console.error("Error:", err.response?.data || err.message),
        )
        .finally(() => {
          closeModal();
          setIsEdit(false);
        });
    }
  }
  function deleteCategory(id) {
    console.log(id);
    axios
      .delete(`https://nti-ecommerce.vercel.app/api/v1/categories/${id}`, {
        headers: {
          token: localStorage.getItem("dbToken"),
        },
      })
      .then((res) => {
        console.log(res);
        getAllCategories();
      })
      .catch((err) => {
        console.error("Status:", err.response?.status); // 401 = Unauthorized, 404 = Not Found
        console.error("Message:", err.response?.data?.message || err.message);
      });
    console.log("mndavhjasdvhuvsahuvsdhauvhuadsvhudsav");
  }
  function editCategory(el) {
    openModal(el);
    setCurrentCategory(el);
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
          Add category
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
                Category Name
              </th>
              <th scope="col" className="px-6 py-3 font-semibold">
                Image
              </th>
              <th scope="col" className="px-6 py-3 font-semibold text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categoriesData.map((el) => {
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
                    {el.name}
                  </th>

                  {/* Photo Column - Large & Rounded */}
                  <td className="px-6 py-5">
                    <div className="w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-2xl  shadow-sm">
                      <img
                        className="w-full h-full object-cover"
                        src={el.image}
                        alt={el.name}
                      />
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
                          editCategory(el);
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
                          deleteCategory(el._id);
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
                  {isEdit ? "Edit Category" : "Add New Category"}
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
                onSubmit={handleSubmit(submitCategories)}
                className="pt-4 md:pt-6"
              >
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block mb-2.5 text-sm font-medium text-heading"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    required=""
                    {...register("name")}
                  />
                  {formState.errors.name && (
                    <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                      {formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className="block mb-2.5 text-sm font-medium text-heading"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    {...register("image")}
                  />
                  {formState.errors.image && (
                    <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                      {formState.errors.image.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="text-white my-7 bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none w-full mb-3"
                >
                  {isEdit ? "Update Category" : "Add Category"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
