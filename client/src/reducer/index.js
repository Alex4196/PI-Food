
import Swal from 'sweetalert2'

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
        recipes:  action.payload 
      }
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload
      }
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
        }) : action.payload === "desc" ?
          state.recipes.sort(function (a, b) {
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
              return -1;
            }
            if (b.title.toLowerCase() > a.title.toLowerCase()) {
              return 1;
            }
            return 0;
          }) : action.payload === "punAsc" ?
            state.recipes.sort(function (a, b) {
              if (a.spoonacularScore > b.spoonacularScore) {
                return 1;
              }
              if (b.spoonacularScore > a.spoonacularScore) {
                return -1;
              }
              return 0;
            }) : action.payload === "punDesc" ?
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
      return {
        ...state,
        detail: action.payload
      };


    case "FILTER_BY_TYPE":
      const allRecipes = state.allRecipes
      const dietasApi = []
      allRecipes.forEach(e => {
        if (e.hasOwnProperty('diets') && e.diets.includes(action.payload)) {
          dietasApi.push(e)
        }
      })

      const dietasDb = []
      allRecipes.forEach(e => {
        if (e.hasOwnProperty('types') && e.types.find(c => c.name === action.payload)) {
          dietasDb.push(e)
        }
      })

      const encontradas = dietasApi.concat(dietasDb)
    
      if (encontradas.length) {
        return {
          ...state,
          recipes: encontradas
        };
      }
      else {
        alert('Any recipe has that diet')
      }

     break;

    default: return state;
  }
}
export default rootReducer;




