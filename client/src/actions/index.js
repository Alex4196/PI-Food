
import axios from 'axios';
import Swal from 'sweetalert2'


 export function filterByTypes(payload) {
  
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

export function orderBy(payload) {
  return { type: "ORDER_BY", payload };
}

 export function getNameRecipes(name, next) {
  return async function (dispatch) {
 
    try {
      var json = await axios.get("http://localhost:3001/recipes?name=" + name)
      return dispatch({
        type: "GET_NAME_RECIPES",
        payload: json.data
      })
    } catch (err) {
     Swal.fire({
        title: 'The Recipe does not exist',
        text: '',
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    }
  }
} 

/* export function getNameRecipes(name) {

  return function(dispatch){
    axios.get("http://localhost:3001/recipes?name=" + name)
    .then(r => r.data)
.then(data => dispatch({
  type: "GET_NAME_RECIPES",
  payload: data
}))
}
}
 */

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
       Swal.fire({
        title: 'Does not exist recipe with that Diet',
        text: '',
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    }
  }
}

export const postRecipe = (input, next) => {

  const pasos=[]
  pasos.push(input.stepbystep)
 

  return async function (dispatch) {
try{
    const newRecipe = await axios({
      method: 'post',
      url: 'http://localhost:3001/recipes/create',
      data: {
        title: input.name,
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
    console.log('The creation of recipe fail')
  }
};
}

