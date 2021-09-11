
import axios from 'axios';




export function createNewRecipe(id) {
  return {
    type: "ADD_NEW_RECIPE", payload: id
  };
}


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




export const postRecipe = (input, next) => {

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

