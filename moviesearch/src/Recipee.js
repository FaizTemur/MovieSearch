import React, { useState } from 'react';
import axios from 'axios';

function Recipee() {
  const [ingredients, setIngredients] = useState('');
  const [nutritiousData, setNutritousData] = useState(null);

  function Benefits() {
    const apiUrl = 'https://api.edamam.com/api/nutrition-data';
    const params = {
      app_id: '2dd63eb2',
      app_key: '2d3ad39db601f40c453ef2a26bbf7e40',
      ingr: ingredients,
    };

    axios.get(apiUrl, { params })
      .then((res) => {
        const response = res.data;
        setNutritousData(response);
        console.log(response);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  }

  return (
    <div>
      <input
        type='text'
        value={ingredients}
        placeholder='Type...'
        onChange={(e) => setIngredients(e.target.value)}
      ></input>
      <button onClick={Benefits}>Show</button>

      <ul>
        {nutritiousData && nutritiousData.parsed && nutritiousData.parsed.length > 0 && (
          nutritiousData.parsed[0].food.nutrients.map((nutrient, index) => (
            <li key={index}>{`${nutrient.label}: ${nutrient.quantity} ${nutrient.unit}`}</li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Recipee;
