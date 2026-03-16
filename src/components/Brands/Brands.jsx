import React, { useEffect, useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { initFlowbite } from "flowbite";

const schema = z.object({
  name: z.string().min(3, "Minimum character 3").max(30, "Max character 30"),
});

export default function Brands() {
  const { register, handleSubmit, formState, setValue, reset } = useForm({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(schema),
  });

  const [brands, setBrands] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentBrandId, setCurrentBrandId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    initFlowbite();
    getAllBrands();
  }, []);

  function openModal(brand = null) {
    setIsModalOpen(true);
    if (brand) {
      setIsEdit(true);
      setCurrentBrandId(brand._id);
      setValue("name", brand.name);
    } else {
      setIsEdit(false);
      setCurrentBrandId(null);
      reset({ name: "" });
    }
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function getAllBrands() {
    axios
      .get("https://nti-ecommerce.vercel.app/api/v1/brands", {
        headers: {
          token: localStorage.getItem("dbToken"),
        },
      })
      .then((res) => {
        setBrands(res.data.data || res.data.brands || res.data.categories || []);
      })
      .catch((err) => {
        console.error("Error fetching brands:", err);
      });
  }

  function submitBrands(data) {
    const url = isEdit 
      ? `https://nti-ecommerce.vercel.app/api/v1/brands/${currentBrandId}`
      : "https://nti-ecommerce.vercel.app/api/v1/brands";
    
    const method = isEdit ? "put" : "post";

    axios[method](url, data, {
      headers: {
        token: localStorage.getItem("dbToken"),
      },
    })
      .then(() => {
        getAllBrands();
        closeModal();
      })
      .catch((err) => {
        console.error("Error submitting brand:", err.response?.data || err.message);
      });
  }

  function deleteBrand(id) {
    axios
      .delete(`https://nti-ecommerce.vercel.app/api/v1/brands/${id}`, {
        headers: {
          token: localStorage.getItem("dbToken"),
        },
      })
      .then(() => {
        getAllBrands();
      })
      .catch((err) => {
        console.error("Error deleting brand:", err);
      });
  }

  return (
    <>
      <div className="flex justify-end my-4">
        <button
          type="button"
          className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          onClick={() => openModal(null)}
        >
          <i className="fa-solid fa-plus fa-xl me-3"></i>
          Add Brand
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
                Brand Name
              </th>
              <th scope="col" className="px-6 py-3 font-semibold text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {brands?.map((brand) => (
              <tr
                key={brand._id}
                className="bg-neutral-primary shadow-sm rounded-xl border border-default-light hover:shadow-md transition-shadow"
              >
                <th
                  scope="row"
                  className="px-6 py-5 text-xl font-bold text-heading whitespace-nowrap rounded-s-xl"
                >
                  {brand.name}
                </th>

                <td className="px-6 py-5 rounded-e-xl text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      title="Edit"
                      className="text-white bg-warning hover:bg-warning-strong focus:ring-4 focus:ring-warning-medium font-medium rounded-full text-lg w-12 h-12 flex items-center justify-center transition-all active:scale-90"
                      onClick={() => openModal(brand)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>

                    <button
                      type="button"
                      title="Delete"
                      className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-lg w-12 h-12 flex items-center justify-center transition-all active:scale-90"
                      onClick={() => deleteBrand(brand._id)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
              <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                <h3 className="text-lg font-medium text-heading">
                  {isEdit ? "Edit Brand" : "Add New Brand"}
                </h3>
                <button
                  type="button"
                  className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
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
                onSubmit={handleSubmit(submitBrands)}
                className="pt-4 md:pt-6"
              >
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block mb-2.5 text-sm font-medium text-heading"
                  >
                    Brand Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    {...register("name")}
                  />
                  {formState.errors.name && (
                    <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                      {formState.errors.name.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="text-white my-7 bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none w-full mb-3"
                >
                  {isEdit ? "Update Brand" : "Add Brand"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
