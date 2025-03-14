import "../static/scss/_HomePage.scss";
import CtaButton from "../components/CtaButton"
import HomepageReview from "../components/HomepageReview";

const HomePage = () => {
  return (
    <>
      <section className="dark-bg first-block">
        <div className="content-wrapper">
          <h1>Check out your next travel destination</h1>
          <p>At Cotonijo you can easily search for countries and quickly learn about different nations &mdash; and insights from other travellers. Get an overview of each country's language, currencies, population, and whether it's the right destination for you; all in one place!</p>
          <CtaButton link="/countries" color="green" text="Search countries" />
        </div>
      </section>
      <section className="light-bg">
        <div className="content-wrapper">
        <h2>Share your experience</h2>
        <p>Review the world and let your experience guide others! Share your best and worst trips, rate countries and learn from other travelers' experiences. Your reviews could help inspire, or deter, future globetrotters!</p>
        <CtaButton link="/leave-review" color="blue" text="Leave a review" />
        </div>
      </section>
      <section className="dark-bg">
        <div className="content-wrapper">
          <h2>See what others have to say</h2>
          <p>Browse through (number) reviews</p>
          <div className="review-wrapper">
            <HomepageReview author="John Doe" country="France" content="I had a great time in France! The food was amazing and the people were so friendly. I can't wait to go back!" />
            <HomepageReview author="Emily Smith" country="Italy" content="Italy was absolutely breathtaking! The history, the culture, and the food made it an unforgettable experience. Walking through the streets of Rome felt like stepping back in time. I can't wait to explore more of this beautiful country!" />
            <HomepageReview author="Michael Johnson" country="Japan" content="I loved my trip to Japan! The temples, the cherry blossoms, and the incredible sushi made it a dream destination. Every city had its own unique charm, from the neon lights of Tokyo to the peaceful gardens of Kyoto. The hospitality of the people made it even more special." />
            <HomepageReview author="Sophia Martinez" country="Australia" content="Australia was amazing! The beaches were stunning, and I had the best time exploring the Great Barrier Reef." />
            <HomepageReview author="David Lee" country="Canada" content="Canada's nature is beyond beautiful. The mountains, lakes, and friendly people made my trip truly special. Banff National Park was a highlight, with breathtaking views around every corner. If you love outdoor adventures, Canada is the place to be!" />
          </div>
          <CtaButton link="/reviews" color="green" text="Read reviews" />
        </div>
      </section>
      <section className="light-bg">
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