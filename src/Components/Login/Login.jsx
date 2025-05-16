import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../Context/UserContext";

const Login = () => {
  const [Errmsg, setErrmsg] = useState("");
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();
const{settoken}=useContext(UserContext);

  async function handleSubmit(values) {
    setisloading(true);

    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      console.log(response.data);
      setErrmsg("");
      if (response.data.message === "success") {
        navigate("/");
        // settoken(data.token);
        settoken(response.data.token);
        console.log(response.data.token);
        
      }
    } catch (error) {
      setErrmsg(error.response?.data?.message || "Something went wrong");
      console.error(error);
    } finally {
      setisloading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          <button
            disabled={isloading}
            type="submit"
            className="w-full bg-indigo-600 text-white disabled:bg-indigo-400 py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isloading ? (
              <FontAwesomeIcon icon={faSpinner} spin size="1x" />
            ) : (
              "Login"
            )}
          </button>

          {Errmsg && (
            <div className="mt-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded">
              {Errmsg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
