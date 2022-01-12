import React from "react";
import { Link } from "react-router-dom";
import "../../css/Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="socialMedia">
        <a href="https://github.com/Archer-ecommerce/archer">
          <img
            src="https://img.icons8.com/color/48/000000/github--v3.png"
            alt="github"
          />
        </a>
        <img
          src="https://img.icons8.com/color/54/000000/facebook.png"
          alt="facebook"
        />
        <img
          src="https://img.icons8.com/color/54/000000/instagram-new--v2.png"
          alt="instagram"
        />
        <img
          src="https://img.icons8.com/color/48/000000/twitter--v2.png"
          alt="twitter"
        />
      </div>
      <div className="links">
        <Link to={"/category/all"}>
          <span>All</span>
        </Link>
        <Link to={"/category/Shoes"}>
          <span>Shoes</span>
        </Link>
        <Link to={"/category/Clothes"}>
          <span>Clothes</span>
        </Link>
        <Link to={"/category/Equipments"}>
          <span>Equipments</span>
        </Link>
      </div>

      <div className="copyRights">
        <h5>
          All rights reserved by
          <a
            style={{ textDecoration: "none" }}
            href="https://github.com/Archer-ecommerce/archer"
          >
            {" "}
            Archer Sports Team
          </a>
        </h5>
      </div>
    </div>
  );
}
