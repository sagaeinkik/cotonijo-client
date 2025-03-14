import { ReviewContext } from '../context/ReviewContext';
import { useContext } from 'react';

export const useReviews = () => {
    return useContext(ReviewContext);
};
