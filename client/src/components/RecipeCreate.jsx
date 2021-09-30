import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postRecipe} from '../actions/index'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./RecipeCreate.module.css"
import { IoRestaurantSharp } from "react-icons/io5";
import { IoFastFoodOutline } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";
import Swal from 'sweetalert2'




export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name= 'Name is required';
  } 
  if (!input.summary) {
    errors.summary = 'Summary is required';
  } 
  if(input.healthscore < 0 || input.healthscore > 100 ){
    errors.healthscore = 'The health score has to be between 0 and 100'
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



  const [input, setInput] = useState({
    name: "",
    summary: "",
    spoonacularScore: "",
    healthscore: "",
    stepbystep: "",
    types: []
  })

  console.log(input)


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
    if (input.types.includes(e.target.value)) {
      alert("You already selected this diet. Try again.");
    } else if (input.types.length >= 4) {
      alert("You can select up to 3 diets.");
    } else {
    setInput({
      ...input,
      types: [...input.types, e.target.value]
    })
   
  }
}



function handleSubmit(e){
  e.preventDefault();
  dispatch(postRecipe(input))
  Swal.fire({
    title: 'The new recipe has been created!',
    text: 'Enjoy the recipe!',
    icon: 'success',
    confirmButtonText: 'Cool'
  })
  setInput({
    name: "",
    summary: "",
    spoonacularScore: "",
    healthscore: "",
    stepbystep: "",
    types: []
  })
  history.push("/home")
}


  return (
    <div>

      <Link to='/home'><button className={styles.home} > <IoArrowBackOutline/><IoFastFoodOutline/> </button></Link>
      <div className={styles.title}>
      <h1> Make your own recipe! </h1>
      </div>
       <div className={styles.conteiner}> 
      <form onSubmit={(e) => handleSubmit(e)}>
        <div   >
         
          <input  className={errors.name && 'danger'} className={styles.name}  placeholder="Recipe Name..." type="text" name="name" value={input.name} onChange={handleInputChange} />
           {errors.name && (
      <p className={styles.danger}>{errors.name}</p>
    )} 
        </div>
        <div className={styles.summary}  >
          
          <textarea className={errors.summary && 'danger'} placeholder="Dish Summary..."  type="text" name="summary" value={input.summary} onChange={handleInputChange} />
           {errors.summary && (
      <p className={styles.danger}>{errors.summary}</p>  
    )} 
        </div>
        <div className={styles.spoonacularScore} >
         
          <input className={errors.spoonacularScore && 'danger'} placeholder="Punctuation..."  type="number" name="spoonacularScore" value={input.punctuation} onChange={handleInputChange} />
           {errors.spoonacularScore && (
      <p className={styles.danger}>{errors.spoonacularScore}</p> 
      )}  
        </div>

        <div className={styles.healthscore} >
         
          <input  className={errors.healthscore && 'danger'} placeholder = "Health Score..."  type="number" name="healthscore" value={input.healthscore} onChange={handleInputChange} />
            {errors.healthscore && (
      <p className={styles.danger}>{errors.healthscore}</p> 
      )}  
        </div>
        <div className={styles.steps} >
          
          <textarea  className={errors.stepbystep && 'danger'} placeholder="Step by Step..."  type="text" name="stepbystep" value={input.stepbystep} onChange={handleInputChange} />
           {errors.stepbystep && (
      <p className={styles.danger}>{errors.stepbystep}</p> 
      )}  
        </div>
        <div className={styles.types}>
        
          <select onChange={(e) => handleSelect(e)}> <option hidden disabled selected value>Choose the types of Diets...</option>
            {types?.map((e) => 
               <option value={e.name} key={e.id}>{e.name}</option>
               
            )}
            
          </select>
           <div>
          <ul className={styles.list}>
                        <li className={styles.lista}  >{input.types.map(i => i + ", ")}  </li>
                        
                    </ul>
                    </div>  
        </div>
        <div >
          
           <button className={styles.boton}  type="submit"  >  Create Recipe  <IoRestaurantSharp/></button> 
        </div>
      </form>
       </div> 
       <p className={styles.copy} > Copyright ©️ 2021 The ultimate food app</p>
    </div>
    
  )
  
}


