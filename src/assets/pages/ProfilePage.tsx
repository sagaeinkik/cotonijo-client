import { useAuth } from "../hooks/useAuth"
import { NavLink } from "react-router-dom"
import traveler from "../static/images/traveler.svg";

const ProfilePage = () => {
  const { username } = useAuth();
  return (
    <div className="content-wrapper">
      <img src={traveler} alt="Illustration of woman with a suitcase on wheels" />
      <h1>Profile for {username}</h1>
      <p>Lite info om användaren. Funktionalitet för att ändra användare?
      </p>
      <p>Skriv ut alla recensioner med länkar till edit</p>
      <NavLink to="/leave-review">Leave a review <i className="fa-solid fa-arrow-right"></i></NavLink>
      <p>Knapp för att radera konto? </p>
    </div>
  )
}

export default ProfilePage