import './App.css';
import React, { useEffect, useState } from "react";
import Recipe from './Recipe';

function App() {

  const App_ID = '7e29964b';
  const App_KEY = '70dfdead063ad118ea9d4e38b6389b93';
  // const exampleReq = "https://api.edamam.com/search?=q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free"
  // const exampleReq = `https://api.edamam.com/search?=q=chicken&app_id=${App_ID}&app_key=${App_KEY}`;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');


  useEffect(() => {
    // console.log('effect has been run');
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=fa6fdf86&app_key=83c74dd3d52d4f1f5af6dbc83bbcbb30`)
    const data = await response.json();
    setRecipes(data.hits);


    // fetch(`https://yummly2.p.rapidapi.com/feeds/auto-complete?q=${query}%20soup`, {
	  //   "method": "GET",
	  //   "headers": {
		//     "x-rapidapi-host": "yummly2.p.rapidapi.com",
		//     "x-rapidapi-key": "f824ae53f8mshca5d93517693bf0p18547ejsnbbd939ecd097"
	  //   }
    // })
    // fetch("https://api.edamam.com/doc/open-api/recipe-search-v2.json")
    // .then(response => {
    //   console.log(response);
    //   return response.json()
    // })
    //   .then(data => {
    //     setRecipes(data);
    //     console.log(data);
    //   })
    // .catch(err => {
	  //   console.error(err);
    // });
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input type="text" className="search-bar" value={search} onChange={updateSearch} />
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="recipes">
        {
          recipes.map((recipe,id) => ( 
            <Recipe 
              key={id}
              title={recipe.recipe.lable}
              calories={recipe.recipe.calories}
              img={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))
        }
        {/* <Recipe /> */}
      </div>
    </div>
  );
}

export default App;
