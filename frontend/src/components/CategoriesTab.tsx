import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDisabledVisible } from "react-icons/md";
import { toast } from "react-toastify";
import api from "../axios/api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getCategories } from "../redux/actions/categoriesActions";
import { selectCategories } from "../redux/slices/categorySlice";
import axios from "axios";
function CategoriesTab() {
  const dispatch: AppDispatch = useDispatch();
  const token = localStorage.getItem("SkillStreamToken");
  const categories = useSelector(selectCategories).categories;
  const [inputCat, setInputCat] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("");
  const createCategory = async () => {
    if (inputCat) {
      try {
        await api.post("/category/create", { name: inputCat });
        toast("Created Category");
        setInputCat("");
        getCategoriesList();
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast(error?.response?.data?.message);
        } else {
          toast("An unexpected error occurred");
        }
      }
    }
  };
  const updateCategory = async () => {
    if (inputCat && selectedCat) {
      try {
        await api.patch("/category/update", {
          _id: selectedCat,
          name: inputCat,
        });
        toast("Updated Category");
        setInputCat("");
        setSelectedCat("");
        getCategoriesList();
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast(error?.response?.data?.message);
        } else {
          toast("An unexpected error occurred");
        }
      }
    }
  };
  const changeCategoryStatus = async (category: {
    _id: string;
    name: string;
    block: boolean;
  }) => {
    try {
      await api.patch("/category/update", {
        _id: category._id,
        name: category.name,
        block: !category.block,
      });
      toast("Updated Category Status");
      setInputCat("");
      setSelectedCat("");
      getCategoriesList();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error?.response?.data?.message);
      } else {
        toast("An unexpected error occurred");
      }
    }
  };
  const getCategoriesList = async () => {
    try {
      dispatch(getCategories(search));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error?.response?.data?.message);
      } else {
        toast("An unexpected error occurred");
      }
    }
  };
  useEffect(() => {
    try {
      dispatch(getCategories(""));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error?.response?.data?.message);
      } else {
        toast("An unexpected error occurred");
      }
    }
  }, [dispatch, token]);
  return (
    <div className="">
      <div className="flex  bg-slate-950 items-center justify-between px-10 sticky top-0 z-40 h-14">
        <div className="flex items-center text-2xl font-semibold">
          <p>Category Management</p>
        </div>
        <div className="relative w-[30vw] flex items-center">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round" // Updated
                strokeLinejoin="round" // Updated
                strokeWidth="2" // Updated
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full px-4 py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by student's email"
            value={search}
            onChange={
              (e: React.ChangeEvent<HTMLInputElement>) => {
                setSearch(e.target.value)
                if(search.length>2){
                  getCategoriesList()
                }
              }
            }
            required
          />
          <button
            type="button"
            onClick={() => getCategoriesList()}
            className="text-white absolute end-2.5 top-1/2 transform -translate-y-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 dark:bg-gray-600 dark:hover:bg-slate-950 dark:focus:ring-slate-950"
          >
            Search
          </button>
        </div>
      </div>
      <div className=" min-h-[80vh]  mx-12 mt-5 ">
        <div className="flex justify-start items-center">
          <div className="border-2 w-[40%] px-3 py-2">
            <div className="p-2 text-start ">
              <p className="text-xl mb-2">Update Categories:</p>
              <input
                type="text"
                className="lg:w-80  py-1 px-3 bg-transparent border outline-none"
                name=""
                id=""
                value={inputCat}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputCat(e.target.value)
                }
              />
              <br />
              <i className="text-xs">Add & Update Category of courses here.</i>
            </div>
            <div className="flex justify-end">
              <button
                type="reset"
                className="mx-2 my-1 border py-1 px-2 rounded-md  hover:bg-gradient-to-tr from-red-950 to-red-500 "
                onClick={() => {
                  setInputCat("");
                  setSelectedCat("");
                }}
              >
                Reset
              </button>
              {selectedCat ? (
                <button
                  type="button"
                  onClick={() => updateCategory()}
                  className="mx-2 my-1 border py-1 px-2 rounded-md  hover:bg-gradient-to-tr from-red-950 to-red-500 "
                >
                  Update
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => createCategory()}
                  className="mx-2 my-1 border py-1 px-2 rounded-md  hover:bg-gradient-to-tr from-red-950 to-red-500 "
                >
                  + Add
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 border p-3 mt-8 max-h-[60vh] overflow-y-auto overflow-x-hidden">
          {categories.map((category) => (
            <div className={`border p-4 h-max flex justify-between ${category.block?("border-red-400 text-gray-400 bg-neutral-900"):""}`}>
              <div className="text-start">
                <p className="flex font-medium">
                  Name: &nbsp; 
                </p>
                <b> {category.name.toUpperCase()}</b>
              </div>
              <div className="flex  gap-4">
                <div className="group flex relative">
                  <button
                    onClick={() => {
                      setSelectedCat(category._id);
                      setInputCat(category.name);
                    }}
                  >
                    <FaEdit size={18} color="blue" />
                  </button>
                  <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2   opacity-0  mx-auto">
                    Edit
                  </span>
                </div>
                <div className="group flex relative">
                  <button onClick={()=>changeCategoryStatus(category)}>
                    <MdDisabledVisible size={18} color="orange" />
                  </button>
                  <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2  opacity-0  mx-auto">
                    Disable
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesTab;
