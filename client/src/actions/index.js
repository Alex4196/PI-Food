import { notStrictEqual } from 'assert';
import axios from 'axios';




export function createNewRecipe(id) {
  return {
    type: "ADD_NEW_RECIPE", payload: id
  };
}





/* export function filterByTypes(payload) {
 return function (dispatch) {
  var json =  axios.get("http://localhost:3001/types")  
  console.log('TYYYYYPES', json)
  return dispatch({
     type: "FILTER_BY_TYPE", 
     payload: json.data
  }
)
}
} */

 export function filterByTypes(payload) {
    /* return async function (dispatch) {
      var json = axios.get("http://localhost:3001/types") */ 
  return {
    type: "FILTER_BY_TYPE",
    payload
  };
}
 

export function listRecipes() {
  return async function (dispatch) {
    var json = await axios.get('http://localhost:3001/recipes')
    return dispatch({
      type: "GET_RECIPES",
      payload: json.data
    })
  }
}



/* export function filterByTypes() {
  return async function (dispatch) {
    var json = axios.get("http://localhost:3001/types")  
return dispatch({
  type: "FILTER_BY_TYPE",
  payload: json.data
});
}
} */

export function orderBy(payload) {
  return { type: "ORDER_BY", payload };
}

/* 
   export function filterAtoZ() {
    return function (dispatch) {
      return  axios.get("http://localhost:3001/recipes").then((recipe) => {
        const orderAZ = recipe.data.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
        dispatch({
          type: "ORDER_AZ",
          payload: orderAZ,
        });
      });
    };
  } 
 */

/*   export function orderAZ() {
    return function(dispatch) {
        return axios.get('http://localhost:3001/recipes')
        .then(resp => {
            const orderByAZ = resp.data.sort((a, b) => {    
            });
            dispatch({
                type: "ORDER_A_TO_Z",
                payload: orderByAZ
            })
        })
    }
}
 */
/* export function orderZA() {
  return function(dispatch) {
      return axios.get('http://localhost:3001/recipes')
      .then(resp => {
          const orderByZA = resp.data.sort((b, a) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
          });
          dispatch({
              type: "ORDER_Z_TO_A",
              payload: orderByZA
          })
      })
  }
} */

export function getNameRecipes(name, next) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/recipes?name=" + name)
      return dispatch({
        type: "GET_NAME_RECIPES",
        payload: json.data
      })
    } catch (err) {
      alert('This recipes does not exist')
      console.log('error')
    }
  }
}

export function getRecipeDetail(id) {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/recipes/${id}`)

    return dispatch({
      type: "GET_RECIPE_DETAIL",
      payload: json.data
    })
  }
}


export function getTypes(name, next) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/types")
      /*   console.log(json) */
      return dispatch({
        type: "GET_TYPES",
        payload: json.data
      })
    } catch (err) {
      next(err)
    }
  }
}


/* export function postRecipe(payload) {
return async function (dispatch) {
  const post = await axios.post("http://localhost:3001/recipe", payload)
/* console.log(post) */
/* return post;
} */

export const postRecipe = (input, next) => {
/*   console.log(  
    input.title,
     input.summary,
     parseInt(input.spoonacularScore),
     parseInt(input.healthscore),
    input.steps,
     input.types
  )  */
  const pasos=[]
  pasos.push(input.steps)
  console.log(pasos) 

  return async function (dispatch) {
try{
    const newRecipe = await axios({
      method: 'post',
      url: 'http://localhost:3001/recipes/create',
      data: {
        title: input.title,
        summary: input.summary,
        spoonacularScore: parseInt(input.spoonacularScore),
        healthScore: parseInt(input.healthscore),
        steps: pasos,
        diets: input.types
      }
    });
    return dispatch({
      type: 'CREATE_RECIPE',
      payload: newRecipe.data
    })
  } catch(err){
    console.log('maradooooooooona')
  }
};
}

/*   export function orderByPunctuation() {
    return function (dispatch) {
      return axios.get("http://localhost:3001/recipes").then((recipe) => {
        const orderPunctuation = recipe.data.sort((a, b) => {
          if (!a.spoonacularScore) {
            const punctuation = a.spoonacularScore;
            a.spoonacularScore= punctuation;
          }

          if (!b.spoonacularScore) {
            const punctuation = { metric: b.spoonacularScore};
            b.spoonacularScore = punctuation;
          }
          if (parseInt(a.spoonacularScore) > parseInt(b.spoonacularScore)) return 1;
          if (parseInt(a.spoonacularScore) < parseInt(b.spoonacularScore)) return -1;
          return 0;
        });
        dispatch({
          type: "ORDER_BY_PUNCTUATION",
          payload: orderPunctuation,
        });
      });
    };
  } */





/* export function getMovies(titulo) {
    return function(dispatch) {
      return fetch("http://www.omdbapi.com/?apikey=20dac387&s=" + titulo)
        .then(response => response.json())
        .then(json => {
          dispatch({ type: "GET_MOVIES", payload: json });
        });
    };
  }
*/