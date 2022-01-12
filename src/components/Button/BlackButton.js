import React from "react";
import { Link } from "react-router-dom";

export const BlackButton = ({ text, link, submit }) => {
  return (
    <Link to={link}>
      <button className={`${submit}`} style={{ color: "white" }}>
        {text}
      </button>
    </Link>
  );
};
