import { CountryContext } from '../context/CountryContext';
import { useContext } from 'react';

export const useCountries = () => {
    return useContext(CountryContext);
};
