import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../../css/Nav.css";
import CartWidget from "./CartWidget";
import Menu from "../../images/bars-solid.svg";
import Close from "../../images/times-solid.svg";
import Logo from '../../images/logos/archer_logo.jpeg'
import { useAuth } from "../../context/AuthContext";
import LoginPage from '../auth/LoginPage.js'

export default function Nav() {
  const [state, setState] = useState({ toggle: false });
  const { currentUser, logout } = useAuth();
  
  function menuToggle() {
    setState({ toggle: !state.toggle });
  }

  const { toggle } = state;

  return (
    <div className="productLinks">
      <div className="logo logoDesktop" alt="icon FlatIcon">
        <Link to="/">
          <img src={Logo} alt="LOGO" />
        </Link>
      </div>
      <header>
        <div className="menu" onClick={menuToggle}>
          <img src={Menu} width="25" alt="menu" />
        </div>
        <div className="logo logoMobile" alt="icon FlatIcon">
          <Link to="/">
            <img src={Logo} alt="LOGO" />
          </Link>
        </div>
        <nav>
          <ul className={toggle ? "toggle" : ""}>
            <li>
              <NavLink
                to="/category/all"
                className="buttonNavBar"
                activeStyle={{ color: "#0147bf" }}
              >
                All
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/category/Nike"
                className="buttonNavBar"
                activeStyle={{ color: "#0147bf" }}
              >
                Nike
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/category/Jordan"
                className="buttonNavBar"
                activeStyle={{ color: "#0147bf" }}
              >
                Jordan
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/category/Yeezy"
                className="buttonNavBar"
                activeStyle={{ color: "#0147bf" }}
              >
                Yeezy
              </NavLink>
            </li>
            <li className="close">
              <img
                src={Close}
                width="20"
                onClick={menuToggle}
                alt="menu"
              />
            </li>
          </ul>
          <div className="widgetMobile">
            <NavLink to="/cart">
              <CartWidget />
            </NavLink>
          </div>
        </nav>
      </header>
      <div className="widgetDesktop">
        <NavLink to="/cart">
          <CartWidget />
        </NavLink>
        {
          currentUser? (
          <Link to="/login">
            <img 
            style={{marginLeft:25}}
            src="https://img.icons8.com/doodle/50/000000/group.png" alt="auth"
            />
        </Link>
          ) : (
            <Link to="/login">
            <img 
              style={{marginLeft:25}}
              src="https://img.icons8.com/doodle/50/000000/group.png" alt="auth"
            />
            </Link>
          )
        }


      </div>
  
    </div>
  );
}
 