import { useReviews } from "../hooks/useReview";
import { useCountries } from "../hooks/useCountries";
import { NavLink, useParams } from "react-router-dom";
import { useState } from "react";
import { UpdateReview } from "../types/review.type";
import world2 from "../static/images/world2.svg"

const EditReviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const reviewId = id ? parseInt(id) : null;
  const { reviews, reviewError, reviewLoading, updateReview } = useReviews();
  const { countries } = useCountries();

  //States
  const [updatedFields, setUpdatedFields] = useState<UpdateReview>({});
  const [localError, setLocalError] = useState<string | null>(null);
  const [localSuccess, setLocalSuccess] = useState<string | null>(null);

  //Hitta review som ska redigeras
  const review = reviewId ? reviews.find((review) => review.id === reviewId) : null;

  //Hantera ändringar av fält
  const handleChange = (field: keyof UpdateReview, value: string | number) => {
    setUpdatedFields((prev) => {
      if (review && review[field] === value) {
        //Ta bort fält om det är samma som förut
        const {[field]: _, ...rest} = prev;
        return rest;
      }
      return { ...prev, [field]: value };
    })
  }

  //Submit 
  const handleSubmit = async (e: any) => {
    e.preventDefault(); 
    setLocalError(null);
    setLocalSuccess(null);

    if (reviewId === null) {
      setLocalError("Invalid review ID.");
      return;
    }

    //Kolla om något ändrats
    if(Object.keys(updatedFields).length === 0) {
      setLocalError("No changes made.");
      return;
    }

    //Uppdatera
    await updateReview(reviewId, updatedFields);
    
    
    //Töm fält
    setUpdatedFields({});
    setLocalSuccess("Review updated successfully!");

  }


  //Review saknas
  if(!review) {
    return <div className="content-wrapper"><h1>Review not found... :(</h1></div>
  }

  return (
    <div className="content-wrapper">
      <NavLink to="/reviews"><i className="fa-solid fa-arrow-left"></i> Back to all reviews</NavLink>
      <img src={world2} alt="Illustration of woman standing with globe" />
      <h1>Edit your review</h1>
      <form onSubmit={handleSubmit}>
        {localError && <div className="error-message">{localError}</div>}
        {reviewError && <div className="error-message">{reviewError}</div>}
        {localSuccess && <div className="success-message">{localSuccess}</div>}
      <div className="form-group">
        {/* Loopa igenom alla countries, skriv ut i select-lista */}
        <label htmlFor="ccn3">Country:</label>
        <select name="ccn3" id="ccn3" defaultValue={review.ccn3} onChange={(e) => handleChange("ccn3", e.target.value)}>
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
          <textarea name="content" id="content" defaultValue={review.content} onChange={(e) => handleChange("content", e.target.value)}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <select name="rating" id="rating" defaultValue={review.rating} onChange={(e) => handleChange("rating", parseInt(e.target.value))}>
            <option value="" disabled>Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <input type="submit" className="button" value={reviewLoading ? "Saving..." : "Save"} />
      </form>
    </div>
  )
}

export default EditReviewPage