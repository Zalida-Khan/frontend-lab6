import React from 'react';
import Country from './Country';

const Countries = ({ countries, formatNumber }) => {
  return (
    <div className="countries">
      {countries.map((country, index) => (
        <Country key={index} country={country} 
        formatNumber={formatNumber}/>
      ))}
    </div>
  );
};

export default Countries;
