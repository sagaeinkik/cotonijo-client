import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMappedReviews } from "../hooks/useMappedReviews"
import ReviewImg from "../static/images/reviews.svg"
import Review from "../components/Review"
import "../static/scss/ReviewPage.scss";

const ReviewPage = () => {
  const { mappedReviews } = useMappedReviews();

  //States
  const [searchString, setSearchString] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1); //Paginering

  //Variabler
  const reviewsPerPage = 7; 

  // Filtreringsfunktion för sökrutan
  const filteredReviews = mappedReviews.filter((review) =>
    review.author.fullName.toLowerCase().includes(searchString.toLowerCase())
  );

  //Paginering
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage; 
  const paginatedReviews = filteredReviews.slice(startIndex, startIndex + reviewsPerPage);

  return (
    <div className="content-wrapper">
      <img src={ReviewImg} alt="Generic illustration of a woman in front of reviews" className="subpage-image" />
      <p className="review-cta-text">Been abroad lately? <NavLink to="/leave-review" className="review-page button">Leave a review! <i className="fa-solid fa-arrow-right"></i></NavLink></p>
      <h1>Reviews</h1>
      {/* Sökruta */}
      <div className="form-group search-group">
        <label htmlFor="reviewSearch">Search review by user's name:</label>
        <div className="search-container">

        <i className="fa-solid fa-magnifying-glass"></i><input type="search" name="reviewSearch" id="reviewSearch" placeholder="Jane Doe" value={searchString} onChange={(e) => {setSearchString(e.target.value); setCurrentPage(1)}} />
        </div>
      </div>
      <h2>Results</h2>
      {/* loopa igenom de filtrerade och paginerade recensionerna */}
      {paginatedReviews.length > 0 ? (
        paginatedReviews.map((review) => (
          /* Skriv ut till skärmen */
          <Review key={review.id} review={review} />
        ))
      ) : (
        <p>No reviews here!</p>
      )}
      {/* Paginering */}
      {totalPages > 1 && (
        <div className="pagination">
          {/* Disable:a knapp baserat på om man är på första sidan, räkna ut vad nästa sida blir */}
          <button className="button" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => Math.max(prev -1, 1))}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          {/* Disable:a om man är på sista sidan; räkna ut vad förra sidan blir */}
          <button className="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} >Next</button>
        </div>
      )}
    </div>
  )
}

export default ReviewPage