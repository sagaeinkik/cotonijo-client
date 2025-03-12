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
            <p>Credits</p>
        </footer>
    </>
  )
}

export default Layout