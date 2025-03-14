const HomepageReview = ({ author, country, content}: { author: string, country: string, content: string}) => {
  return (
    <div className="hp-review">
        <h3>{author}</h3>
        <p className="country">{country}</p>
        <p className="review-text">{content}</p>
        <i className="fa-solid fa-quote-right"></i>
    </div>
  )
}

export default HomepageReview