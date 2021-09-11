
import React from 'react';
import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { getNameRecipes } from '../actions';
import styles from "./SearchBar.module.css";
import { IoSearchSharp } from "react-icons/io5";


export default function SearchBar(){
const dispatch = useDispatch()

const[name, setName] = useState("")

function handleInputChange(e){
e.preventDefault()
setName(e.target.value)
console.log(name)
}

function handleSubmit(e){
    e.preventDefault()
    dispatch(getNameRecipes(name))
    }
    
return (
    <div className={styles.wrap}>
        <div className={styles.search}>

<input className={styles.searchTerm} type= 'text' placeholder='Search a recipe...' onChange={(e) => handleInputChange(e)}/>
<button className={styles.searchButton}  type='submit' onClick={(e) => handleSubmit(e)}> <IoSearchSharp/> </button>
</div>
    </div>
)
}