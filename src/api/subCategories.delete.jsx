import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

export async function subCategoriesCascadeDelete(subCategoriesData) {
  console.log(subCategoriesData, "line 6");

  for (let i = 0; i < subCategoriesData.length; i++) {
    try {
      await axios.get(
        `https://nti-ecommerce.vercel.app/api/v1/categories/${subCategoriesData[i].category}`,
      );
    } catch (err) {
      try {
        if (err.response?.data?.err === "Category Not Found.") {
          await axios.delete(
            `https://nti-ecommerce.vercel.app/api/v1/subCategories/${subCategoriesData[i]._id}`,
          );
        } else {
          deleteType();
        }
      } catch (err) {
        deleteType(err);
      }
    }
  }
}

function deleteType(err) {
  // Handle different error types
  if (!err.response) {
    // Network error - no internet connection
    toast.error("Network error! Please check your internet connection.");
  } else if (err.response?.status >= 500) {
    // Server error (500+)
    toast.error("Server error! Please try again later.");
  } else {
    // Other errors (400, 401, 403, 404, etc.)
    toast.error(
      "Error: " + (err.response?.data?.message || "Something went wrong"),
    );
  }
}
