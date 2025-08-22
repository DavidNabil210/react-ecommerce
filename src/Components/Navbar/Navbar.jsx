import React, { useContext, useState } from "react";
import { CounterContext } from "../../Context/CounterContext";
import { UserContext } from "../../Context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi"; // or any other icon
import { CiShoppingCart } from "react-icons/ci";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const value = useContext(CounterContext);
  const { token, settoken } = useContext(UserContext);

  function logout() {
    settoken(null);
    navigate("/login");
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left Side: Logo and Navigation Links */}
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-indigo-600">
            <CiShoppingCart className=" text-3xl" />
              FreshCart
            </Link>

            {/* Navigation Links (Desktop) */}
            {token && (
              <div className="hidden md:flex space-x-4 ml-8">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Products
                </Link>
                <Link
                  to="/services"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Services
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact
                </Link>
                 <Link
                  to="/cart"
                  className=" flex text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <HiOutlineShoppingCart className=" text-lg" />
                  Cart
                </Link>
              </div>
            )}
          </div>

          {/* Right Side: Register and Login Buttons */}
          {!token && (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/signup"
                className="text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md text-sm font-medium"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Login
              </Link>
            </div>
          )}
          {token && (
            <div className="hidden md:flex items-center space-x-4">
              <button
                className="text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md text-sm font-medium"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Collapsible) */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
            >
              Products
            </Link>
            <Link
              to="/services"
              className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </Link>
            {!token && (
              <>
                <Link
                  to="/signup"
                  className="block text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-base font-medium"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="block bg-indigo-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700"
                >
                  Login
                </Link>
              </>
            )}
            {token && (
              <button
                onClick={logout}
                className="w-full text-left text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
