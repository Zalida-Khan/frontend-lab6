import React from 'react';

const Country = ({ country, formatNumber}) => {
  return (
    <div className="country-card">
      <img src={country.flag} alt={country.name} className="country-flag" />
      <h3>{country.name}</h3>
      <div className="details">
        <p><span>Capital:</span>{country.capital}</p>
        <p><span>Population:</span>{formatNumber(country.population)}</p>
        <p><span>Area (mi²):</span>{formatNumber(country.area)}</p>
        <p><span>Continent:</span>{country.continent}</p>
        <p><span>Subregion:</span>{country.subregion}</p>
      </div>
    </div>
  );
};

export default Country;
