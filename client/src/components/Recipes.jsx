import React from "react";
import { Link } from "react-router-dom";
import styles from "./Recipes.module.css"
import plato from "./plato.jpg"


export default function Recipes({ name, image, title, id }) {
  return (

    <div className={styles.recipes}>
      <div className={styles.box} >
        <Link  to={`/${id}`} >
           
          <h1 className={styles.title}>{title.length >= 34 ? title.slice(0,45)+"..." : title}</h1>
          
          <h5 className={styles.name}  > Suitable for: {name && name.length? name: "All diets"}</h5>
        
          <div className={styles.imagen} >
          <img className={styles.img} src={image ? image : plato} alt='' />
          </div>
        </Link>
      </div>
    </div>
  )
}

