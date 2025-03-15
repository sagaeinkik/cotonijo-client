import { useCountries } from "../hooks/useCountries";
import worldMap from "../static/images/world.svg";
import Country from "../components/Country";
import { useState } from "react";

const CountriesPage = () => {
  const { countries } = useCountries();

  //State
  const [searchString, setSearchString] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1); //Paginering

  const countriesPerPage = 10; 

  //Filtreringsfunktion för sökrutan
  const filteredCountries = countries.filter((country) => {
    //Slå om till lowercase
    const searchLower = searchString.toLowerCase();
  
    //Leta i officiella namnet först (engelska)
    if (country.name.official.toLowerCase().includes(searchLower)) {
      //Behåll
      return true;
    }
  
    //Leta i alla översättningar (okända nycklar)
    if (country.translations) {
      return Object.values(country.translations).some(
        (translation) =>
          translation.official.toLowerCase().includes(searchLower) ||
          translation.common.toLowerCase().includes(searchLower)
      );
    }
  
    //Om inget hittades
    return false;
  });

  //Paginering
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);
  const startIndex = (currentPage - 1) * countriesPerPage;
  const paginatedCountries = filteredCountries.slice(startIndex, startIndex + countriesPerPage);

  return (
    <div className="content-wrapper">
      <img src={worldMap} alt="Illustration of world map with connected dots on different continents" />
      <h1>Search Countries</h1>
      <div className="form-group">
        <label htmlFor="searchCountry">Search country by country name (in any language!)</label>
        <input type="search" name="searchCountry" id="searchCountry" placeholder="Sverige, Sweden, Schweden" value={searchString} onChange={(e) => { setSearchString(e.target.value); setCurrentPage(1) }} />
      </div>
      {/* Loopa igenom countries */
      paginatedCountries.length > 0 ? (
      paginatedCountries.map(country => (
        <Country key={country.ccn3} country={country} />
      )))
    : (
      <p>No countries matched your search...</p>
    )}
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
    </div> /* Slut på content-wrapper */
  )
}

export default CountriesPage