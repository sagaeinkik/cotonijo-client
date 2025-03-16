import { useAuth } from "../hooks/useAuth"
import { NavLink } from "react-router-dom"
import traveler from "../static/images/traveler.svg";
import { useState } from "react";
import { useMappedReviews } from "../hooks/useMappedReviews";
import Review from "../components/Review";

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
    <div className="content-wrapper">
      <img src={traveler} alt="Illustration of woman with a suitcase on wheels" />
      <h1>Profile for {user.username}</h1>
      <section className="userInfo">
        <h2>Your account</h2>
        <p>Full name: {user.fullName}</p>
        <p>@{user.username}</p>
        <p>Email: {user.email}</p>
        <p>Member since: {new Date(user.registered).toLocaleDateString()}</p>
      { deleteConfirm && <p>Are you sure you want to delete your account? This action cannot be undone!</p> }
      <button className="delete-review" onClick={handleDelete}>
            {deleteConfirm ? "Yes, I'm sure. Delete" : "Delete account"}
      </button>
      </section>
      <h2>Your reviews</h2>
      <NavLink to="/leave-review">Leave a review <i className="fa-solid fa-arrow-right"></i></NavLink>
      { userReviews && <p>Look at you! You've posted {userReviews.length} reviews. Thank you for contributing!</p>}
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
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => Math.max(prev -1, 1))}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          {/* Disable:a om man är på sista sidan; räkna ut vad förra sidan blir */}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} >Next</button>
        </div>
      )}
    </div>
  )
}

export default ProfilePage