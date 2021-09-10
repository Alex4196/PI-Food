
const initialState = {
  recipes: [],
  filter: [],
  allRecipes: [],
  types: [],
  detail: []
}



function rootReducer(state = initialState, action) {
  
  switch (action.type) {

    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

    case "GET_NAME_RECIPES":
      return {
        ...state,
        recipes: action.payload
      }

    case "ADD_NEW_RECIPE":
      return {
        ...state
      }

    case "GET_TYPES":
      return {
        ...state,
        types: action.payload
      }


 /*    case "ORDER_A_TO_Z":
      return {
        ...state,
        filter: action.payload
      }
      case "ORDER_Z_TO_A":
        return {
          ...state,
          filter: action.payload
        } */

    case "ORDER_BY":
      let sortedArr = action.payload === "asc" ?
        state.recipes.sort(function (a, b) {
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          if (b.title.toLowerCase() > a.title.toLowerCase()) {
            return -1;
          }
          return 0;
        }) : action.payload==="desc"? 
        state.recipes.sort(function (a, b) {
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return -1;
          }
          if (b.title.toLowerCase() > a.title.toLowerCase()) {
            return 1;
          }
          return 0;
        }) : action.payload === "punAsc"?
        state.recipes.sort(function (a, b) {
          if (a.spoonacularScore > b.spoonacularScore) {
            return 1;
          }
          if (b.spoonacularScore> a.spoonacularScore) {
            return -1;
          }
          return 0;
        }):action.payload === "punDesc"?
         state.recipes.sort(function (a, b) {
          if (a.spoonacularScore > b.spoonacularScore) {
            return -1;
          }
          if (b.spoonacularScore > a.spoonacularScore) {
            return 1;
          }
          return 0;
        }) : null
      return {
        ...state,
        recipes: sortedArr

      }

    case "GET_RECIPE_DETAIL":
    /*   console.log('ACAAAAAAAAA', action.payload) */
      return {
           ...state,
           detail: action.payload
      };

     case "FILTER_BY_TYPE":
      const allRecipes = state.allRecipes

      
      
      const dietasApi= []
      allRecipes.forEach(e => {
        if(e.hasOwnProperty('diets') && e.diets.includes(action.payload)) {
          dietasApi.push(e)
        }
      })

      const dietasDb= []
      allRecipes.forEach(e => {
        if(e.hasOwnProperty('types') && e.types.find(c => c.name === action.payload)) {
          dietasDb.push(e)
        }
      }) 
    
       const encontradas = dietasApi.concat(dietasDb) 
       console.log(encontradas) 
      if( encontradas.length ) {
      return {
        ...state,
       recipes: encontradas
      };
    } 
    else {
      alert('Any recipe has that diet')
    } 



    /*   case "FILTER_BY_TYPE":
        const allRecipes = state.allRecipes
        const filterByTypes = allRecipes.filter(e => e.map(f => f.name))
        console.log('MARADONAAAAAAA', filterByTypes)
        return {
          ...state,
         recipes: filterByTypes
        }; */
   
   
  
    case "ORDER_BY_TYPE":
      return {

      };

    default: return state;
  }
}
export default rootReducer;




/* const initialState = {

  }


  function rootReducer(state = initialState, action) {
    switch (action.type)  {

    case "ADD_NEW_RECIPE":
        return {
          ...state,
          moviesFavorites: [...state.moviesFavorites, action.payload]
        }

    case "GET_RECIPE_DETAIL":
        return {
          ...state,
          moviesLoaded: action.payload.Search
        };

    case "FILTER_BY_TYPE":
        return {
            ...state,
            moviesFavorites: state.moviesFavorites.filter(movie => movie.id !== action.payload)
        };

    case "ORDER_BY_TYPE":
        return {
            ...state,
            movieDetail: action.payload
        };

    default: return state;
  }
}
  export default rootReducer; */