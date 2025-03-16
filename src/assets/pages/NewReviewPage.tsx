import { useReviews } from "../hooks/useReview";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useCountries } from "../hooks/useCountries";
import world2 from "../static/images/world2.svg"
import { NavLink } from "react-router-dom";

const NewReviewPage = () => {
  const { reviewLoading, reviewError, createReview } = useReviews();
  const { user } = useAuth();
  const { countries } = useCountries();

  //States
  const [ccn3, setCcn3] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [rating, setRating] = useState<number | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [localSuccess, setLocalSuccess] = useState<string | null>(null);

  //Submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLocalError(null);
    setLocalSuccess(null);

    //Kolla om alla fält är ifyllda
    if (ccn3.trim() === "" || content.trim() === "" || rating === null) {
      setLocalError("Please fill out all fields.");
      return;
    }
    //Kolla om rating är mellan 1 och 5
    if (rating < 1 || rating > 5) {
      setLocalError("Rating must be between 1 and 5.");
      return;
    }

    //Kolla så användarId finns (oinloggad ska omdirigeras men bra att ha extra)
    if (!user?.id) {
      setLocalError("You must be logged in to leave a review.");
      return;
    }

    //Skapa review
    await createReview({
      content,
      rating,
      ccn3,
      userId: user.id,
    });


    //Nollställ formulär
    setCcn3("");
    setContent("");
    setRating(null);
    setLocalError(null);

    //Sätt success-meddelande
    setLocalSuccess("Your review has been submitted! Thank you for your contribution.");
  }

  return (
    <div className="content-wrapper">
      <NavLink to="/reviews"><i className="fa-solid fa-arrow-left"></i> Back to reviews</NavLink>
      <img src={world2} alt="Illustration of a woman with a globe" />
      <h1>Leave a review</h1>
      <form onSubmit={handleSubmit}>
        {localError && <div className="error-message">{localError}</div>}
        {reviewError && <div className="error-message">{reviewError}</div>}
        {localSuccess && <div className="success-message">{localSuccess}</div>}
      <div className="form-group">
        {/* Loopa igenom alla countries, skriv ut i select-lista */}
        <label htmlFor="ccn3">Country:</label>
        <select name="ccn3" id="ccn3" value={ccn3} onChange={(e) => setCcn3(e.target.value)}>
          <option value="" disabled>Choose from list</option>
          {countries.map((country) => (
            <option key={country.ccn3} value={country.ccn3}>
              {country.name.common}
            </option>
          ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="content">Text content of review:</label>
          <textarea name="content" id="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <select name="rating" id="rating" value={rating ?? ""} onChange={(e) => setRating(parseInt(e.target.value))}>
            <option value="" disabled>Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <input type="submit" className="button" value={reviewLoading ? "Submitting..." : "Submit"} />
      </form>
    </div>
  )
}

export default NewReviewPage