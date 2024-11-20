import React from 'react';

const Country = ({ country }) => {
  return (
    <div className="country-card">
      <img src={country.flag} alt={country.name} className="country-flag" />
      <h3>{country.name}</h3>
      <div className="details">
        <p><span>Capital:</span>{country.capital}</p>
        <p><span>Population:</span>{country.population}</p>
        <p><span>Area (mi²):</span>{country.area}</p>
        <p><span>Continent:</span>{country.continent}</p>
        <p><span>Subregion:</span>{country.subregion}</p>
      </div>
    </div>
  );
};

export default Country;
