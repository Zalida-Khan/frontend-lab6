import React, { useState, useEffect } from 'react';
import Countries from './Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [continent, setContinent] = useState('');
  const [subregion, setSubregion] = useState('');
  const [sortAlphabetically, setSortAlphabetically] = useState(false);
  const [topTen, setTopTen] = useState(false);
  const [topCriteria, setTopCriteria] = useState('population');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((country) => ({
          name: country.name.common,
          flag: country.flags.svg,
          capital: country.capital ? country.capital[0] : 'N/A',
          population: country.population,
          area: country.area,
          continent: country.region,
          subregion: country.subregion || 'Unknown',
        }));
        setCountries(formattedData);
      });
  }, []);

  const formatNumber = (num) => {
    if (!num) return 'N/A';
    return num.toLocaleString();
  };

  const filteredCountries = countries
    .filter((c) => {
      if (continent) return c.continent === continent;
      if (subregion) return c.subregion === subregion;
      return true;
    })
    .sort((a, b) => (sortAlphabetically ? a.name.localeCompare(b.name) : 0))
    .sort((a, b) => (topTen ? b[topCriteria] - a[topCriteria] : 0))
    .slice(0, topTen ? 10 : countries.length);

  return (
    <div className="container">
      <h1>Countries</h1>
      <select onChange={(e) => { setContinent(e.target.value); setSubregion(''); }} value={continent}>
        <option value="">Select Continent</option>
        <option value="Africa">Africa</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
      <select onChange={(e) => { setSubregion(e.target.value); setContinent(''); }} value={subregion}>
        <option value="">Select Subregion</option>
        <option value="Eastern Africa">Eastern Africa</option>
        <option value="Northern Europe">Northern Europe</option>
        <option value="Southern Europe">Southern Europe</option>
        <option value="South-Eastern Asia">South-Eastern Asia</option>
      </select>
      <div>
        <input 
          type="checkbox" 
          id="sortAlphabetically" 
          checked={sortAlphabetically} 
          onChange={() => setSortAlphabetically(!sortAlphabetically)} 
        />
        <label htmlFor="sortAlphabetically">Sort Alphabetically</label>
      </div>
      <div>
        <input 
          type="checkbox" 
          id="topTen" 
          checked={topTen} 
          onChange={() => setTopTen(!topTen)} 
        />
        <label htmlFor="topTen">Top 10 by {topCriteria}</label>
      </div>
      {topTen && (
        <select onChange={(e) => setTopCriteria(e.target.value)} value={topCriteria}>
          <option value="population">Population</option>
          <option value="area">Area</option>
        </select>
      )}
      <Countries countries={filteredCountries} formatNumber={formatNumber} />
    </div>
  );
};

export default App;