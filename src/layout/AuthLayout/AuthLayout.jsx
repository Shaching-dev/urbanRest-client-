import React from "react";
import { NavLink, Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-0 py-0 md:px-10 md:py-15 ">
        {/* Title */}
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome to UrbanRest
        </h3>

        {/* Nav Links */}
        <div className="flex justify-center gap-6 mb-6">
          <NavLink
            to="/auth/register"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-200"
              }`
            }
          >
            Register
          </NavLink>

          <NavLink
            to="/auth/login"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-200"
              }`
            }
          >
            Login
          </NavLink>
        </div>

        {/* Divider */}
        <div className="border-t mb-6"></div>

        {/* Form Content */}
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
