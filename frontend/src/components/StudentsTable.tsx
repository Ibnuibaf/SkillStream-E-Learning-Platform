import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectStudents, setStudents } from "../redux/slices/studentsSlice";

function StudentsTable() {
  const token = localStorage.getItem("SkillStreamToken");
  const dispatch = useDispatch();
  const data = useSelector(selectStudents);
  const getUsersList = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/user?role=student",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res.data.users);
      dispatch(setStudents(res.data.users));
    } catch (error: any) {
      toast(error.response.data.message);
    }
  };
  useEffect(() => {
    getUsersList();
  }, [dispatch, token]);

  const changeUserStatus = async (id: string, status: boolean) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/user/status?_id=${id}&isBlock=${!status}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast("Changed users status");
      getUsersList();
    } catch (error: any) {
      toast(error.response.data.message);
    }
  };
  return (
    <div className="flex justify-center items-center  w-full">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-[70%] w-[70%]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3">
                Student Email
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Purchased Courses
              </th>
              <th scope="col" className="px-6 py-3">
                Certificates
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((student) => (
              <tr
                key={student._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {student.email}
                </td>
                <td className="px-6 py-4">{student.name}</td>
                <td className="px-6 py-4">{student._id.length}</td>
                <td className="px-6 py-4">{student.name.length}</td>
                <td className="px-6 py-4">{student.role.toUpperCase()}</td>
                <td className="flex items-center px-6 py-4">
                  <button
                    type="button"
                    onClick={() =>
                      changeUserStatus(student._id, student.isBlock)
                    }
                    className={`font-medium text-${
                      student.isBlock ? "red" : "blue"
                    }-600 dark:text-${
                      student.isBlock ? "red" : "blue"
                    }-500 hover:underline ms-3`}
                  >
                    {student.isBlock ? "UnBlock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentsTable;
