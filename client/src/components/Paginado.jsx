import React from 'react';
import styles from './Paginado.module.css'

export default function Paginado ({recipesPerPage, allRecipes, paginado}) {
    const pageNumbers = []

    for(let i = 0; i<Math.ceil(allRecipes/recipesPerPage); i++) {
        pageNumbers.push(i+1)
    }
    return(
        <nav >
          <ul className={styles.pag}>
             { pageNumbers && 
             pageNumbers.map(number =>{
                 return (
                 <li key={number}  >
                 <button   className={styles.paginado} onClick={() => paginado(number)}>{number}</button>
                 </li>
             )
             } )}
           </ul> 
        </nav>
    )
}