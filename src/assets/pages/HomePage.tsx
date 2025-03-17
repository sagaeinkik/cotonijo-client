import "../static/scss/_HomePage.scss";
import CtaButton from "../components/CtaButton"
import HomepageReview from "../components/HomepageReview";
import { useMappedReviews } from "../hooks/useMappedReviews";
import darkDivider from "../static/images/divider.svg";
import lightDivider from "../static/images/divider2.svg";

const HomePage = () => {
  const { mappedReviews } = useMappedReviews(); 

  let reviewsToDisplay = mappedReviews; 

  if(reviewsToDisplay.length > 7) {
    reviewsToDisplay = reviewsToDisplay.slice(0, 7);
  }

  return (
    <>
      <section className="dark-bg first-block">
        <div className="content-wrapper">
          <h1>Check out your next travel destination</h1>
          <p>At Cotonijo you can easily search for countries and quickly learn about different nations &mdash; and insights from other travellers. Get an overview of each country's language, currencies, population, and whether it's the right destination for you; all in one place!</p>
          <CtaButton link="/countries" color="green" text="Search countries" />
        </div>
      </section>
      
      <section className="second-block light-bg">
        <div className="content-wrapper">
        <h2>Share your experience</h2>
        <p>Review the world and let your experience guide others! Share your best and worst trips, rate countries and learn from other travelers' experiences. Your reviews could help inspire, or deter, future globetrotters!</p>
        <CtaButton link="/leave-review" color="blue" text="Leave a review" />
        </div>
      </section>

      <div className="divider light-divider">
        <img src={lightDivider} alt="" />
      </div>
      
      <section className="third-block dark-bg">
        <div className="page-wrap">
          <h2>See what others have to say</h2>
          <div className="review-wrapper">
            
            { /* Loopa igenom reviews */
              reviewsToDisplay.map(review => (
                <HomepageReview key={review.id} author={review.author.fullName} country={review.countryName} content={review.content} />
              ))
            }

          </div>
            <p className="browse">Browse through {mappedReviews.length} reviews</p>
          <CtaButton link="/reviews" color="red" text="Read reviews" />
        </div>
      </section>

      <div className="divider dark-divider">
        <img src={darkDivider} alt="" />
      </div>

      <section className="light-bg last-block">
        <div className="content-wrapper">
          <h2>Where did you come from? </h2>
          <p>Where did you go? Where did you come from...</p>
          <p className="big-text">Cotonijo</p>
        </div>
      </section>
    </>
  )
}

export default HomePage