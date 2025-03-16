import HeaderNav from "./HeaderNav";
import Typewriter from "./Typewriter";
import "../static/scss/_HomepageHero.scss";

const HomepageHero = () => {
  return (
    <div className="hero">
        <HeaderNav />
        <div className="hero-text">
          <span><i className="fa-solid fa-magnifying-glass"></i></span>
          <Typewriter words={["Sweden", "Barbados", "Estonia", "Hong Kong", "Cocos Islands" ,"French Polynesia", "Denmark", "Canada"]} />
        </div>
    </div>
  )
}

export default HomepageHero