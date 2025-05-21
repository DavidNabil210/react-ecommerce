import React, { useContext, useState } from "react";
import { CounterContext } from "../../Context/CounterContext";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const value=useContext(CounterContext);
   const{token,settoken}= useContext(UserContext);
function logout(){
settoken(null);
navigate('/login');
}
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left Side: Logo and Navigation Links */}
          <div className="flex items-center">
            {/* Logo */}
            <a href="/" className="text-xl font-bold text-indigo-600">
              MyLogo
            </a>

            {/* Navigation Links (Desktop) */}
          {token &&
              <div className="hidden md:flex space-x-4 ml-8">
              <a
                href="/"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </a>
              <a
                href="/about"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </a>
              <a
                href="/services"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Services
              </a>
              <a
                href="/contact"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </a>
            </div>
          }
          </div>

          {/* Right Side: Register and Login Buttons */}
         {!token && 
          <div className="hidden md:flex items-center space-x-4">
          <a
            href="/Signup"
            className="text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md text-sm font-medium"
          >
            Register
          </a>
          <a
            href="/login"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
          >
            Login
          </a>
        </div>
         }
         {token && 
          <div className="hidden md:flex items-center space-x-4">
          
          <button  className="text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md text-sm font-medium" onClick={logout}> 
            Logout
          </button>
        </div>
         }

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
            <a
              href="/"
              className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </a>
            <a
              href="/about"
              className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </a>
            <a
              href="/services"
              className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
            >
              Services
            </a>
            <a
              href="/contact"
              className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </a>
            <a
              href="/Signup"
              className="block text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-base font-medium"
            >
              Register
            </a>
            <a
              href="/login"
              className="block bg-indigo-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700"
            >
              Login
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;