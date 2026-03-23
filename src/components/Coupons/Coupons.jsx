import React, { useContext, useEffect, useState } from "react";
import styles from "./Coupons.module.css";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { initFlowbite } from "flowbite";

let schema = z.object({
  code: z.string().min(3, "Minumun character 3").max(30, "max character 30"),
  expires: z.string(),
  discount: z.string().min(0).max(3),
});
export default function Coupons() {
  const [couponsData, setCouponsData] = useState([]);
  const [currentCoupon, setCurrentCoupon] = useState({});
  const [dateNow, setDateNow] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    initFlowbite();
  }, []);
  useEffect(() => {
    getAllCoupons();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  let { register, handleSubmit, formState, setValue } = useForm({
    defaultValues: {
      code: "",
      expires: "",
      discount: "",
    },
    resolver: zodResolver(schema),
  });
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }

  function openModal(coupon = null) {
    const timestamp = Date.now();
    setDateNow(formatTimestamp(timestamp));
    setIsModalOpen(true);

    if (coupon) {
      setIsEdit(true);
      setValue("code", coupon.code);
    } else setIsEdit(false);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function getAllCoupons() {
    axios
      .get("https://nti-ecommerce.vercel.app/api/v1/Coupons", {
        headers: {
          token: localStorage.getItem("dbToken"),
        },
      })
      .then((res) => {
        setCouponsData(res.data.coupons);
      })
      .catch((err) => {});
  }

  function deleteCoupon(id) {
    axios
      .delete(`https://nti-ecommerce.vercel.app/api/v1/Coupons/${id}`, {
        headers: {
          token: localStorage.getItem("dbToken"),
        },
      })
      .then((res) => {
        getAllCoupons();
      })
      .catch((err) => {});
  }

  function editCoupon(el) {
    openModal(el);
    setCurrentCoupon(el);
  }

  function submitCoupons(data) {
    const [month, day, year] = data.expires.split("/");
    const date = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 0));
    const iso = date.toISOString();
    data.expires = iso;
    if (isEdit == true) {
      axios
        .put(
          `https://nti-ecommerce.vercel.app/api/v1/Coupons/${currentCoupon._id}`,
          data,
          {
            headers: {
              token: localStorage.getItem("dbToken"),
            },
          },
        )
        .then((res) => {
          getAllCoupons();
        })
        .catch((err) => {})
        .finally(() => {
          setIsEdit(false);
          closeModal();
        });
    } else {
      axios
        .post("https://nti-ecommerce.vercel.app/api/v1/Coupons", data, {
          headers: {
            token: localStorage.getItem("dbToken"),
          },
        })
        .then((res) => {
          getAllCoupons();
        })
        .catch((err) => {})
        .finally(() => {
          closeModal();
          setIsEdit(false);
        });
    }
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
          Add Coupon
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
                Coupon Code
              </th>
              <th scope="col" className="px-6 py-3 font-semibold">
                Date Expired
              </th>
              <th scope="col" className="px-6 py-3 font-semibold text-right">
                Discount
              </th>
              <th scope="col" className="px-6 py-3 font-semibold text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {couponsData?.map((el) => {
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
                    {el.code}
                  </th>

                  {/* Photo Column - Large & Rounded */}
                  <td className="px-6 py-5">{el.expires}</td>

                  <td className="px-6 py-5">{el.discount}</td>

                  {/* Actions Column - Rounded Right Edge */}
                  <td className="px-6 py-5 rounded-e-xl text-right">
                    <div className="flex justify-end gap-3">
                      {/* Warning Edit Button */}
                      <button
                        type="button"
                        title="Edit"
                        className="text-white bg-warning hover:bg-warning-strong focus:ring-4 focus:ring-warning-medium font-medium rounded-full text-lg w-12 h-12 flex items-center justify-center transition-all active:scale-90"
                        onClick={() => {
                          editCoupon(el);
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
                          deleteCoupon(el._id);
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
                  {isEdit ? "Edit Coupon" : "Add New Coupon"}
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
                onSubmit={handleSubmit(submitCoupons)}
                className="pt-4 md:pt-6"
              >
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block mb-2.5 text-sm font-medium text-heading"
                  >
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    required=""
                    {...register("code")}
                  />
                  {formState.errors.code && (
                    <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                      {formState.errors.code.message}
                    </p>
                  )}
                </div>
                <div className="relative max-w-sm">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-body"
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
                        d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                      />
                    </svg>
                  </div>
                  <input
                    id="datepicker-format"
                    datepicker=""
                    datepicker-min-date={dateNow}
                    // datepicker-max-date="05/05/2025"
                    type="text"
                    className="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 py-2.5 shadow-xs placeholder:text-body"
                    placeholder="Select date"
                    {...register("expires")}
                  />
                  {formState.errors.expires && (
                    <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                      {formState.errors.expires.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="discount"
                    className="block mb-2.5 text-sm font-medium text-heading"
                  >
                    Coupon discount
                  </label>
                  <input
                    type="text"
                    id="discount"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    required=""
                    {...register("discount")}
                  />
                  {formState.errors.discount && (
                    <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                      {formState.errors.discount.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="text-white my-7 bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none w-full mb-3"
                >
                  {isEdit ? "Update Coupon" : "Add Coupon"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
