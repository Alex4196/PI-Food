import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postRecipe, getTypes } from '../actions/index'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./RecipeCreate.module.css"
import { IoRestaurantSharp } from "react-icons/io5";



export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name= 'Name is required';
  } 
  if (!input.summary) {
    errors.summary = 'Summary is required';
  } 
  if(input.healthscore < 0 || input.healthscore > 100 ){
    errors.punctuation = 'The health score has to be between 0 and 100'
  }
  if(input.spoonacularScore < 0 || input.spoonacularScore > 100 ){
    errors.spoonacularScore = 'The punctuation has to be between 0 and 100'
  }
  if (!input.stepbystep) {
    errors.stepbystep = 'Step by step is required';
  } 
  return errors;
};


export default function RecipeCreate() {
  const dispatch = useDispatch()
  const history = useHistory()
  const types = useSelector((state) => state.types)
  const [errors, setErrors] = useState({});

/*   useEffect(() => (
    dispatch(getTypes())
  ), []) */

  const [input, setInput] = useState({
    title: "",
    summary: "",
    spoonacularScore: "",
    healthscore: "",
    steps: "",
    types: []
  })


  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value //cada vez que ejecute la funcion, a mi estado input, ademas de lo que tengo le agrego , el target value de lo que estoy modificando
    })
    let objError = validate({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(objError);
  }

  function handleSelect(e) {
    setInput({

      ...input,
      types: [...input.types, e.target.value]
    })
   
  }


function handleSubmit(e){
  e.preventDefault();
  dispatch(postRecipe(input))
  alert('The new recipe has been created')
  setInput({
    title: "",
    summary: "",
    spoonacularScore: "",
    healthscore: "",
    steps: "",
    types: []
  })
  history.push("/home")
}




 console.log(input)  


  return (
    <div>

      <Link to='/home'><button> Home </button></Link>
      <div className={styles.title}>
      <h1> Make your own recipe! </h1>
      </div>
       <div className={styles.conteiner}> 
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.name}>
         
          <input  className={errors.name && 'danger'} placeholder="Recipe Name..." type="text" name="title" value={input.name} onChange={handleInputChange} />
           {errors.name && (
      <p className="danger">{errors.name}</p>
    )} 
        </div>
        <div >
          
          <input className={styles.summary} className={errors.summary && 'danger'} placeholder="Dish Summary..."  type="text" name="summary" value={input.summary} onChange={handleInputChange} />
           {errors.summary && (
      <p className="danger">{errors.summary}</p>  
    )} 
        </div>
        <div>
         
          <input className={errors.spoonacularScore && 'danger'} placeholder="Punctuation..."  type="number" name="spoonacularScore" value={input.punctuation} onChange={handleInputChange} />
           {errors.spoonacularScore && (
      <p className="danger">{errors.spoonacularScore}</p> 
      )}  
        </div>

        <div>
         
          <input  className={errors.healthscore && 'danger'} placeholder = "Health Score..."  type="number" name="healthscore" value={input.healthscore} onChange={handleInputChange} />
            {errors.healthscore && (
      <p className="danger">{errors.healthscore}</p> 
      )}  
        </div>
        <div>
          
          <input  className={errors.stepbystep && 'danger'} placeholder="Step by Step..."  type="text" name="steps" value={input.stepbystep} onChange={handleInputChange} />
           {errors.stepbystep && (
      <p className="danger">{errors.stepbystep}</p> 
      )}  
        </div>
        <div>
        
          <select onChange={(e) => handleSelect(e)}>
            {types?.map((e) => 
               <option value={e.name} key={e.id}>{e.name}</option>
            )}
            
          </select>
        </div>
        <div>
          {/* <input type="submit" value="create recipe"  /> */}
           <button type="submit"><IoRestaurantSharp/></button> 
        </div>
      </form>
       </div> 
    </div>
    
  )
  
}


