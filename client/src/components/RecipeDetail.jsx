import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeDetail } from '../actions';
import { useEffect } from 'react';
import styles from './RecipeDetail.module.css';


export default function Detail(props) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRecipeDetail(props.match.params.id));
    }, [dispatch])


    const myRecipe = useSelector((state) => state.detail)
    
     myRecipe && console.log(myRecipe )
    return (
        <div>
            {
                typeof myRecipe === "object" ?
                    <div>
                        <Link to='/home'>
                            <button> Home </button>
                        </Link>
                           {myRecipe.image ? 
                           <img  src={myRecipe.image} alt='' width='250px' height='200px' /> : null }
                        
                        <div classname={styles.contenedor}>
                        <h1>{myRecipe.title}</h1>
                        <h2> Dish summary: {myRecipe.summary && myRecipe.summary.replace(/<[^>]*>?/g, '')} </h2>
                        <p> Punctuation: {myRecipe.spoonacularScore}</p>
                        <h3> Health score: {myRecipe.healthScore}</h3>
                        <h4> Step by step: {myRecipe.analyzedInstructions && myRecipe.analyzedInstructions ? myRecipe.analyzedInstructions.map(r => r.steps.map(s => s.step)).flat(1).join(' ') : myRecipe.steps} </h4>
                        <h5>Type of diets:</h5>
                        
                        <ul>
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
                      
                    </div> : <p>Loading...</p>
            }
        </div>

    )
}