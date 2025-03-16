import { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom'

//Egna hooks
import useBreakpoint from "../hooks/useBreakpoint";
import { useAuth } from "../hooks/useAuth";

//Grafik
import "../static/scss/_HeaderNav.scss";
import logo from "../static/images/logowhite.svg";

const HeaderNav = () => {
    const isDesktop = useBreakpoint(768);
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const [isActive, setIsActive] = useState<boolean>(false);

    //Logga ut
    const handleLogout = async () => {
        await logout(); 
        navigate("/");
    }

    //Funktion för att stänga menyn
    const closeMenu = () => {
        setIsActive(false); 
    }

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
              <NavLink to="/countries" onClick={closeMenu}>Countries</NavLink>
              </li>
              <li>
                  <NavLink to="/reviews" onClick={closeMenu}>Reviews</NavLink>
              </li>
              { isAuthenticated ? <><li><NavLink to="/profile" onClick={closeMenu}>Profile</NavLink></li><li><button onClick={handleLogout}>Sign out</button></li></>  : <li><NavLink to="/login">Sign in</NavLink></li>}
            </ul>
        </nav>
        </div>
  )
}

export default HeaderNav