import { Outlet, useLocation } from 'react-router-dom';
import HomepageHero from "../components/HomepageHero";
import HeaderNav from "../components/HeaderNav";

const Layout = () => {
    const location = useLocation();

    //Ta reda på om vi är på startsidan
    const isHomepage = location.pathname === "/";

  return (
    <>
        <header className={isHomepage ? "homepage-header" : "subpage-header"}>
            {isHomepage ? <HomepageHero /> : <HeaderNav />}
        </header>
        <main>
            <Outlet />
        </main>
        <footer>
            <div className="credits">
                <a href="https://github.com/sagaeinkik" target="_blank"><i className="fa-brands fa-github"></i></a>
                <a href="www.linkedin.com/in/saga-einarsdotter-kikajon-7b0470307" target="_blank"><i className="fa-brands fa-linkedin-in"></i></a>
                <i className="fa-brands fa-react"></i>
            </div>
            <p>Made by Saga Einarsdotter Kikajon for Mid-Sweden University in 2025.</p>
        </footer>
    </>
  )
}

export default Layout