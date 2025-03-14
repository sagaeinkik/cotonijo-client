import { Country, CountryContextType } from "../types/country.type";
import React, { createContext, useState, useEffect, ReactNode } from "react";

// Skapa context
export const CountryContext = createContext<CountryContextType>({
    countries: [], 
    countryLoading: true, 
    countryError: null,
    getCountries: async () => {}
})

// API-url
const apiUrl = "https://restcountries.com/v3.1/all?fields=name,ccn3,independent,unMember,currencies,capital,languages,translations,area,flag,maps,population,car,continents,coatOfArms";

// Provider
export const CountryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    //States
    const [countries, setCountries] = useState<Country[]>([]);
    const [countryLoading, setCountryLoading] = useState<boolean>(true);
    const [countryError, setCountryError] = useState<string | null>(null);

    //Hämta länder
    const getCountries = async () => {
        try {
            //Laddar
            setCountryLoading(true);

            //Anrop
            const response = await fetch(apiUrl); 
            const data = await response.json();

            if(!response.ok) {
                setCountryError(data.message || "Failed to fetch countries...");
                return;
            }

            //Sätt länder i state
            setCountries(data);

        } catch (error) {
            setCountryError(error instanceof Error ? error.message : "An unknown error has occurred...");
        } finally {
            setCountryLoading(false);
        }
    }

    //Ladda in vid mount
    useEffect(() => {
        getCountries();
    }, []);

    //Return
    return (<CountryContext.Provider value={{countries, countryLoading, countryError, getCountries}}>
        {children}
    </CountryContext.Provider>)
}