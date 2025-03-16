import React from "react"; 
import { NavLink } from "react-router-dom";

//Interface för props
interface CountryProps {
    country: {
        ccn3: string; 
        flag: string; 
        name: {
            official: string; 
        }
        continents?: string[];
    }
}

const Country: React.FC<CountryProps> = ({country}) => {
  return (
    <div className="country-card">
        <div className="info">
          <h3><span>{country.flag}</span>{country.name.official}</h3>
          {country.continents && country.continents.map(continent => (
            <p key={continent}>{continent}</p>
          ))}
          </div>
          <NavLink to={`/countries/${country.ccn3}`}><i className="fa-solid fa-arrow-right"></i></NavLink>
        </div> 
  )
}

export default Country