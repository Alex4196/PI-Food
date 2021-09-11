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

                           {myRecipe.image ? 
                           <img className={styles.image} src={myRecipe.image} alt=''  /> : null }
                       
                        <p className={styles.puntos}> Punctuation: {myRecipe.spoonacularScore}</p>
                        
                        <h3 className={styles.score} > Health score: {myRecipe.healthScore}</h3>
                        
                        <ul className={styles.types}> suitable for these diets:
                            {
                                myRecipe.diets ? myRecipe.diets.map(e => {
                                    return <li>
                                        {e}
                                    </li>
                                }) : 
                                myRecipe.types && myRecipe.types.map(f => {
                                    return <li>
                                        {f.name}
                                    </li>
                                })
                            }
                        </ul>
                        </div>
                      <div className={styles.theback}>
                          
                         <h4 className={styles.steps}> Step by step: 
                         {myRecipe.analyzedInstructions && myRecipe.analyzedInstructions ? myRecipe.analyzedInstructions.map(r => r.steps.map(s => s.step)).flat(1).join(' ') : myRecipe.steps} </h4> 
                        </div>
                      </div>
                      </div>
                    </div> : <p>Loading...</p>
            }
        </div>

    )
}