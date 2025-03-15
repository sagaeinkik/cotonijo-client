import { useParams } from "react-router-dom";
import { useCountries } from "../hooks/useCountries";
import { useMappedReviews } from "../hooks/useMappedReviews";
import { NavLink } from "react-router-dom";
import airplane from "../static/images/airplane.svg";
import Review from "../components/Review"

const CountryPage = () => {
  //Hämta ccn3 ur params
  const { ccn3 } = useParams<{ ccn3: string }>();

  const { countries } = useCountries();
  const { mappedReviews } = useMappedReviews();

  //Hitta land
  const country = countries.find((country) => country.ccn3 === ccn3);

  //Hitta recensioner för landet
  const reviews = mappedReviews.filter((review) => review.countryName === country?.name.common);

  if (!country) {
    return (
      <div className="content-wrapper">
        <img src={airplane} alt="Illustration of an airplane seen from the front" />
        <h1>Country not found :(</h1>
      </div>)
  }

  return (
    <div className="content-wrapper">
      <NavLink to="/countries"><i className="fa-solid fa-arrow-left"></i> Back to countries</NavLink>
      <img src={airplane} alt="Illustration of an airplane seen from the front" />
      <h1>{country.name.official}</h1>
      { country.name.official !== country.name.common && <h2>Commonly known as {country.name.common}</h2> }
      <p>{country.flag}</p>

      <h2>Information</h2>
      <h3>Names and translations</h3>
      {/* Native name */}
      {country.name.nativeName && (() => {
        const names = Object.entries(country.name.nativeName).map(([langCode, native]) => `${native.official} (commonly ${native.common})`);

        // Om det bara finns ett namn, returnera det direkt
        if (names.length === 1) {
        return <p>The residents of {country.name.common} call it {names[0]}.</p>;
        }

        //Sätt "or" framför sista namnet
          const lastName = names.pop(); 
          return <p>The residents of {country.name.common} call it {names.join(", ")} or {lastName}.</p>;
        })()}

        {/* Översättningar */}
        {country.translations && (() => {
          const languages = ["fin", "ita", "swe", "fra", "deu", "pol"]; // Lista på önskade språk

          // Filtrera och mappa om med språkkod
          const availableTranslations = languages
         .map(langCode => {
          const translation = country.translations?.[langCode]; // Hämta översättning
          return translation ? [langCode, translation] : null; // Om undefined, returnera null
          })
          .filter((entry): entry is [string, { official: string; common: string }] => entry !== null) 
          .map(([langCode, translation]) => (
            <li key={langCode} className="language">
              <span>{langCode}:</span>{" "}
              {translation.official !== translation.common
              ? `${translation.official} (or just ${translation.common})`
              : translation.official}
            </li>
          ));

          return availableTranslations.length > 0 ? (
          <>
          <p>Some translations of the country's name in different languages include</p>
          <ul>{availableTranslations}</ul>
          </>
        ) : null;
        })()}

      <h3>About</h3>
      <p>The population is {country.population} and it has an area of {country.area}&#13217;.</p>
      <span>{country.name.common} is {country.independent ? "" : "not"} an independent country and {country.unMember ? "" : "not" } a member of the United Nations. </span>

      {/* Kontinenter */}
      {country.continents && (() => {
      if (country.continents.length === 0) return null;
  
      if (country.continents.length === 1) {
       return <span>It's located in {country.continents[0]}. </span>;
      } else {
        const continentsCopy = [...country.continents];
        const lastContinent = continentsCopy.pop();
        return <span>It's located in {continentsCopy.join(', ')} and {lastContinent}. </span>;
      }
      })()}

      {/* Huvudstäder */}
      {country.capital && country.capital.length > 1 ? (
        <p>
          The capitals are{" "}
          {country.capital.slice(0, -1).join(", ")}{" "}
          and {country.capital[country.capital.length - 1]}. 
          </p>
        ) : (
          <p>The capital is {country.capital![0]}. </p>
        )}

      {/* Språk */}
      {country.languages && (() => {
        const languageEntries = Object.entries(country.languages);
  
        if (languageEntries.length === 0) return null; // Om inga språk finns, returnera ingenting

        if (languageEntries.length === 1) {
        // Ett språk
        const [code, language] = languageEntries[0];
        return <span>In {country.name.common} they speak {language}. </span>;
        } else {
        // Flera språk
        const languageValues = languageEntries.map(([code, language]) => language);
        const lastLanguage = languageValues.pop();
        return <span>In {country.name.common} they speak {languageValues.join(', ')} and {lastLanguage}. </span>;
      }
      })()}
    
      
      {/* Valutor */}

      {country.currencies && (() => {
        const currencyEntries = Object.entries(country.currencies);

        if (currencyEntries.length === 0) return null; // Om inga valutor finns, returnera ingenting

         // Formatera valutanamn och symboler
          const formattedCurrencies = currencyEntries.map(
            ([code, currency]) => `${currency.name} (${currency.symbol})`
          );

        return (
          <span>
           The currency used is{" "}
            {formattedCurrencies.length > 1
            ? formattedCurrencies.slice(0, -1).join(", ") + " and " + formattedCurrencies[formattedCurrencies.length - 1]
            : formattedCurrencies[0]
            }. 
          </span>
        );
      })()}

      {/* Bilar */}
      {country.car && <p>Cars drive on the {country.car.side} side of the road{country.car.signs && `, and the license plates are marked with ${country.car.signs}`}. </p>}
      
      {/* Landsvapen */}
      { country.coatOfArms?.svg && <><p>They have a coat of arms:</p><img src={country.coatOfArms.svg} alt={`Coat of arms of ${country.name.official}`} /></> }

      <NavLink to={country.maps.googleMaps} target="_blank">See on Google Maps</NavLink>

      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => <Review key={review.id} review={review} />)
        ) : (
        <p>No reviews for this country yet.</p>
        )}
    </div>
  )
}

export default CountryPage