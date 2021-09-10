import React from "react";
import { Link } from "react-router-dom";
import styles from "./Recipes.module.css"
import plato from "./plato.jpg"


export default function Recipes({ name, image, title, id }) {
  return (
   
    <div className={styles.recipes}>
      <div className={styles.box}> 
      <Link to={`/${id}`} >
     <div>
        <h1 className={styles.title}>{title}</h1>
        
        <span className={styles.name}>{name}</span>
        
        
         <img className={styles.img} src={image? image: plato} alt='' width='250px' height='200px' />  
         

        {/* <img className={styles.img} src={image} alt="img not found" width='200px' height='200px' /> */}
        </div>
      </Link>
      </div>
      </div> 
  )
}

