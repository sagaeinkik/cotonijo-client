import { useAuth } from "../hooks/useAuth"
import { NavLink } from "react-router-dom"
import traveler from "../static/images/traveler.svg";
import { useState } from "react";
import { useMappedReviews } from "../hooks/useMappedReviews";
import Review from "../components/Review";
import "../static/scss/ProfilePage.scss"

const ProfilePage = () => {
  const { user, deleteAccount } = useAuth();
  const { mappedReviews } = useMappedReviews();


  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const reviewsPerPage = 5;

  if(!user) {
    return <div className="content-wrapper">Restricted access.</div>
  }

  //Hitta användarens recensioner
  const userReviews = mappedReviews.filter(review => review.author.id === user?.id);

  const handleDelete = async () => {

    if(deleteConfirm) {
      await deleteAccount(user!.id);

    } else {
      setDeleteConfirm(true); 
    }
  }
  
  //Paginering!
  const totalPages = Math.ceil(userReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const paginatedReviews = userReviews.slice(startIndex, startIndex + reviewsPerPage);

  return (
    <div className="content-wrapper profile-page">
      <img src={traveler} alt="Illustration of woman with a suitcase on wheels" />
      <h1>Profile for {user.username}</h1>

      {/* Info om användaren */}
      <section className="userInfo">
        <h2>Your account</h2>
        <div className="userInfo-text">

        <p className="full-name"><span className="bold-text">Full name:</span> {user.fullName}</p>
        <p className="username">@{user.username}</p>
        <p className="email"><span className="bold-text">Email:</span> {user.email}</p>
        <p className="registered"><span className="bold-text">Member since:</span> {new Date(user.registered).toLocaleDateString()}</p>
      { deleteConfirm && <p className="confirm-message">Are you sure you want to delete your account? This action cannot be undone!</p> }
      <button className="button red" onClick={handleDelete}>
            {deleteConfirm ? "Yes, I'm sure. Delete" : "Delete account"}
      </button>
        </div>
      </section>

      {/* Recensioner */}

      <h2>Your reviews</h2>
      <div className="center">
      <NavLink to="/leave-review" className="button green">Leave a review <i className="fa-solid fa-arrow-right"></i></NavLink>
      { userReviews && userReviews.length > 0 ? <p className="review-stats">Look at you! You've posted {userReviews.length} reviews. Thank you for contributing!</p> : ""}
      </div>
      { paginatedReviews && paginatedReviews.length > 0 ? (
        paginatedReviews.map(review => (
          <Review key={review.id} review={review} />
        ))
      ): (
        <p>No reviews here!</p>
      )
    }


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

export default ProfilePage