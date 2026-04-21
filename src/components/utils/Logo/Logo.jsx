import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to={"/"} className="text-2xl font-semibold text-amber-600">
      UrbanRest
    </Link>
  );
};

export default Logo;
