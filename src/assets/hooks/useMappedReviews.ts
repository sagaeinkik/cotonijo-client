import { useReviews } from './useReview';
import { useCountries } from './useCountries';

//Para ihop ccn3 i reviews med countryname i countries
export const useMappedReviews = () => {
    const { reviews } = useReviews();
    const { countries } = useCountries();

    // Mappa varje review till rätt landsnamn
    const mappedReviews = reviews.map((review) => {
        const country = countries.find((c) => c.ccn3 === review.ccn3);
        return {
            ...review,
            countryName: country ? country.name.common : 'Unknown',
        };
    });

    return { mappedReviews };
};
