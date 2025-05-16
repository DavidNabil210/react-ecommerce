import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

const Signup = () => {
  const [Errmsg, setErrmsg] = useState('')
 const [isloading, setisloading] = useState(false)
 const navigate = useNavigate();
const{settoken}=useContext(UserContext);
  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: '',
      // lastName: '',
      email: '',
      password: '',
      rePassword: '',
      phone:'',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3,'must be 3 charachters or more')
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      // lastName: Yup.string()
      // .min(3,'must be 3 charachters or more')
      //   .max(20, 'Must be 20 characters or less')
      //   .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required'),
      rePassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
      phone:Yup.string().required('required'),

    }),
    onSubmit: HandleSubmit
    
  });
  async function HandleSubmit(values) {
    setisloading(true); //start loading
  
    try {
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
      console.log(response.data);
      setErrmsg('');
      if(response.data.message=='success'){
        navigate('/');
        settoken(response.data.token);
        console.log(response.data.token);
      }
    } catch (error) {
      setErrmsg(error.response?.data?.message || "Something went wrong");
      console.error(error);
    } finally {
      setisloading(false); // Stop Loading
    }
  }
  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-sm">{formik.errors.name}</div>
        ) : null}
      </div>

      {/* <div className="mb-4">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
        ) : null}
      </div> */}

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          id="rePassword"
          name="rePassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.rePassword}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {formik.touched.rePassword && formik.errors.rePassword ? (
          <div className="text-red-500 text-sm">{formik.errors.rePassword}</div>
        ) : null}
      </div>
        {/* phone */}
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          phone
        </label>
        <input
          id="phone"
          name="phone"
          type="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className="text-red-500 text-sm">{formik.errors.phone}</div>
        ) : null}
      </div>

      <button
      disabled={isloading}
        type="submit"
        className="w-full bg-indigo-600 text-white disabled:bg-indigo-400 py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {isloading?<FontAwesomeIcon icon={faSpinner} spin size="1x" />:"Sign Up"}
        
        
      </button>
    
      {Errmsg && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded">
          {Errmsg}
        </div>
      )}
    </form>
  );
};

export default Signup;