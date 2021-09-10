import React from 'react';
import styles from './Paginado.module.css'

export default function Paginado ({recipesPerPage, allRecipes, paginado}) {
    const pageNumbers = []

    for(let i = 0; i<Math.ceil(allRecipes/recipesPerPage); i++) {
        pageNumbers.push(i+1)
    }
    return(
        <nav>
          <ul>
             { pageNumbers && 
             pageNumbers.map(number =>{
                 return (
                 <ul className={styles.paginado}>
                 <a onClick={() => paginado(number)}>{number}</a>
                 </ul>
             )
             } )}
           </ul> 
        </nav>
    )
}