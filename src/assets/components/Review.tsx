import React, { useState } from "react"; 
import { useAuth } from "../hooks/useAuth"
import { NavLink } from "react-router-dom";
import { useReviews } from "../hooks/useReview";

//Interface för props
interface ReviewProps {
    review: {
        id: number; 
        author: {
            id: number;
            fullName: string; 
            username: string;
        }
        rating: number;
        flag: string; 
        countryName: string; 
        content: string; 
        posted: string;
    }
}

const Review: React.FC<ReviewProps> = ({ review }) => {
  const { user } = useAuth();
  const { deleteReview } = useReviews();

  //Håller koll på delete Confirm
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);

    //Funktion som loopar igenom review-rating och omvandlar till stjärnor
  const getRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={`filled-${i}`} className="star"><i className="fa-solid fa-star"></i></span>);
    }

    //Lägg till tomma stjärnor
    if(rating < 5) {
      for (let i = 0; i < 5 - rating; i++) {
        stars.push(<span key={`empty-${i}`} className="star"><i className="fa-regular fa-star"></i></span>);
      }
    }

    return stars;
    
  }

  const handleDelete = async () => {
    if(deleteConfirm) {
      await deleteReview(review.id);
    } else {
      setDeleteConfirm(true);
    }
  }

  //Om användare inloggad, visa kontroller för att hantera recensioner
  const reviewControls = () => {
    if (!user || review.author.id !== user.id) {
      return null; // Om ingen användare är inloggad eller inte är författaren, returnera null
  }

    
    if (review.author.id === user!.id) {
      return (
        <div className="review-controls">
          {deleteConfirm && (
            <p className="confirm-message">Are you sure you want to delete this review?</p>
          )}
          <NavLink to={`/edit-review/${review.id}`} className="edit-review button">Edit</NavLink>
          <button className="delete-review button" onClick={handleDelete}>
            {deleteConfirm ? "Yes, I'm sure. Delete" : "Delete"}
          </button>
        </div>
      )
    } else {
      return;
    }
  }



  return (
    <div className="review">
        <h3>{review.author.fullName}</h3>
        <p className="username">@{review.author.username}</p>
        <p className="country">
            <span className="country-flag">{review.flag}</span>
            {review.countryName}
        </p>
        <p className="rating">Rating: {getRatingStars(review.rating)}</p>
        <p className="review-content">{review.content}</p>
        <p className="published">
            Published {new Date(String(review.posted)).toLocaleDateString()}
        </p>
        {reviewControls()}
    </div>
  )
}

export default Review