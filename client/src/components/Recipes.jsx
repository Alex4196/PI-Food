import React from "react";
import { Link } from "react-router-dom";
import styles from "./Recipes.module.css"
import plato from "./plato.jpg"


export default function Recipes({ name, image, title, id }) {
  return (

    <div className={styles.recipes}>
      <div className={styles.box} >
        <Link to={`/${id}`} >

          <h1 className={styles.title}>{title}</h1>

          <span className={styles.name}>{name}</span>

          <img className={styles.img} src={image ? image : plato} alt='' />

        </Link>
      </div>
    </div>
  )
}

