import { useState } from "react";
import { NavLink } from 'react-router-dom'
import useBreakpoint from "../hooks/useBreakpoint";
import "../static/scss/_HeaderNav.scss";
import logo from "../static/images/logowhite.svg";

const HeaderNav = () => {
    const isDesktop = useBreakpoint(768);

    const [isActive, setIsActive] = useState(false);

  return (
    <div className="nav-flex"> 
        <NavLink to="/">
            <img src={logo} alt="Cotonijo Logotyp" />
        </NavLink>
        {/* Visa bara knapp på små skärmar */}
        { !isDesktop && <button className={`burger ${isActive ? "active" : ""}`} onClick={() => setIsActive(!isActive)}>
            <span className="burger-bar"></span>
            <span className="burger-bar"></span>
            <span className="burger-bar"></span>
        </button>}
        <nav className={`${isDesktop ? "nav-desktop" : "nav-mobile"} ${isActive ? "active" : ""}`}>
            <ul>

              <li>
                  <NavLink to="/reviews">Reviews</NavLink>
              </li>
              <li>
                  <a href="#">Underpage 1</a>
              </li>
              <li>
                  <a href="#">Underpage 2</a>
              </li>
              <li>
                  <a href="#">Underpage 3</a>
              </li>
            </ul>
        </nav>
        </div>
  )
}

export default HeaderNav