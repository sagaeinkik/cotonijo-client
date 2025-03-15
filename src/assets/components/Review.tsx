import React from "react"; 

//Interface för props
interface ReviewProps {
    review: {
        id: number; 
        author: {
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
    //Funktion som loopar igenom review-rating och omvandlar till stjärnor
  const getRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i} className="star"><i className="fa-solid fa-star"></i></span>);
    }

    //Lägg till tomma stjärnor
    if(rating < 5) {
      for (let i = 0; i < 5 - rating; i++) {
        stars.push(<span key={i} className="star"><i className="fa-regular fa-star"></i></span>);
      }
    }

    return stars;
    
  }


  return (
    <div className="review">
        <h3>{review.author.fullName}</h3>
        <p className="username">@{review.author.username}</p>
        <p className="rating">Rating: {getRatingStars(review.rating)}</p>
        <p className="country">
            <span className="country-flag">{review.flag}</span>
        </p>
        <p className="review-content">{review.content}</p>
        <p className="published">
            Published {new Date(String(review.posted)).toLocaleDateString()}
        </p>
    </div>
  )
}

export default Review