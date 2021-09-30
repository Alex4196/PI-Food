import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeDetail } from '../actions';
import { useEffect } from 'react';
import styles from './RecipeDetail.module.css';
import { IoFastFoodOutline } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";

export default function Detail(props) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRecipeDetail(props.match.params.id));
    }, [dispatch])


    const myRecipe = useSelector((state) => state.detail)
    
     myRecipe && console.log(myRecipe )
    return (
        <div >
            {
                typeof myRecipe === "object" ?
                    <div >
                        <Link to='/home'>
                            <button className={styles.home}> <IoArrowBackOutline/> <IoFastFoodOutline/> </button>
                        </Link>
                        <div classname={styles.contenedor}  >

                            <div className={styles.thecard}>

                        <div className={styles.thefront}>
                    
                        <h1  className={styles.title} >{myRecipe.title}</h1>
                   
                        <h2 className={styles.summary}> Dish summary: {myRecipe.summary && myRecipe.summary.replace(/<[^>]*>?/g, '')} </h2>
                        <div  className={styles.image} >  
                           {myRecipe.image ? 
                           <img className={styles.image} src={myRecipe.image} alt=''  /> : null }
                       </div>
                        <p className={styles.puntos}> Punctuation: {myRecipe.spoonacularScore}</p>
                        
                        <h3 className={styles.score} > Health score: {myRecipe.healthScore}</h3>
                        
                        <ul className={styles.types}> Suitable for these diets:
                            {
                              myRecipe.diets &&  myRecipe.diets.length ? myRecipe.diets.map(e => {
                                    return <li>
                                        {e}
                                    </li>
                                }) : 
                                myRecipe.diets ? " All diets" : 
                                myRecipe.types && myRecipe.types.map(f => {
                                    return <li>
                                        {f.name}
                                    </li>
                                })
                            }
                        </ul>
                        </div>
                      <div className={styles.theback}>
                          
                         <h4 className={styles.steps}> <h1 className={styles.titulostep}> Step by step </h1>  
                         { myRecipe.analyzedInstructions && myRecipe.analyzedInstructions.length ? myRecipe.analyzedInstructions.map(r => r.steps.map(s => s.step)).flat(1).join(' '): myRecipe.analyzedInstructions ? "Sorry, this recipe does not have Step by Step.": myRecipe.steps} </h4> 
                         <div className={styles.enjoy} >
                         <h1 > {myRecipe.analyzedInstructions && myRecipe.analyzedInstructions.length?  "Enjoy this wonderful and exquisite recipe!!" : null}</h1>
                         </div>
                        </div>
                        
                      </div>
                      </div>
                    </div> : <p>Loading...</p>
            }
            <p className={styles.copy} > Copyright ©️ 2021 The ultimate food app</p>
        </div>

    )
}