import { NavLink } from "react-router-dom"

const CtaButton = ({ link, color, text }: { link: string, color: string, text: string}) => {
  return (
    <NavLink to={link} className={color}>{text} <i className="fa-solid fa-arrow-right"></i></NavLink>
  )
}

export default CtaButton