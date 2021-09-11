import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listRecipes, filterByTypes, getTypes, orderBy } from "../actions";
import { Link } from "react-router-dom";
import Recipes from "./Recipes";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import styles from './Home.module.css'
import { NavLink } from "react-router-dom";

export default function Home() {

    const dispatch = useDispatch()  //es para despachar mis acciones, usando la constante
    const allRecipes = useSelector((state) => state.recipes) //es igual al mapstatetoprops, con use selector traeme todo lo que esta en el estado de recipes, entonces voy a usar allRecipes, me trae del reducer el estado recipes

    const [order, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1) //empieza en uno porque empiezo desde esa pagina
    const [recipesPerPage, setRecipesPerPage] = useState(9) //cuantas recetas quiero por pagina
    const indexOfLastRecipe = currentPage * recipesPerPage //esto da 9
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage //esto da 0
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)//agarra un arreglo y toma una porcion dependiendo lo que le estoy pasando por parametro

    /* console.log(currentRecipes) */

    const paginado = (pageNumber) => (
        setCurrentPage(pageNumber)
    )

    useEffect(() => { //es igual al mapdispatchtoprops

        dispatch(listRecipes());
        
    }, [])

    useEffect(() => {
        dispatch(getTypes())
      
    }, [])

    function handleonClick(e) {
        e.preventDefault();
        dispatch(listRecipes());
    }


    function handleFilterTypes(e) {
        dispatch(filterByTypes(e.target.value))
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderBy(e.target.value))
        setCurrentPage(1); //cuango el ordenamineto lo seteo en la primera pagina
        setOrder(`Ordered ${e.target.value}`) //me modifica el estado local que esta vacio y se renderiza
    }

    return (

        <div>

            <SearchBar />
             <div className={styles.newrecipe }>
            <NavLink  to='/recipecreate'> <button className={styles.boton}>Create a new recipe</button> </NavLink >
            </div>
            <div className={styles.title}>
            <h1 onClick={(e) => handleonClick(e)} >The ultimate food app </h1>
            </div> 
            <div >
                <select className={styles.filterdiets} onChange={e => handleFilterTypes(e)}>
                    <option value='gluten free'>Gluten Free</option>
                    <option value='fodmap friendly'>Fodmap Friendly</option>
                    <option value='dairy free'>Dairy Free</option>
                    <option value='lacto ovo vegetarian'>Ovo-Vegetarian</option>
                    <option value='vegan'>Vegan</option>
                    <option value='pescatarian'>Pescetarian</option>
                    <option value='paleolithic'>Paleo</option>
                    <option value='primal'>Primal</option>
                    <option value='whole 30'>Whole30</option>
                    <option hidden disabled selected value>Type of Diet</option>
                </select>
            </div>

            <div>
                
                <select className={styles.filteralph} onChange={(e) => handleSort(e)} >
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                    <option hidden disabled selected value>Alphabetical order</option>
                </select>
                
                <select className={styles.filterpun} onChange={(e) => handleSort(e)} >
                    <option value='punAsc'>Ascending order</option>
                    <option value='punDesc'>descending order</option>
                    <option hidden disabled selected value>Punctuation</option>
                </select>
                <div className={styles.paginado}  > 
                <Paginado 
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length} //necesito un valor numerico
                   paginado={paginado} />
                   </div>
                     <div > 
                {currentRecipes && currentRecipes.map(e => {
                    return (
                        <fragment className={styles.cartas} >
                            <Link to={"/home/" + e.id}>
                                <Recipes 
                                id={e.id} 
                                title={e.title} 
                                name={e.diets ? e.diets : e.types && e.types.map(e => e.name)} 
                                image={e.image} 
                                key={e.id} 
                                />
                            </Link>
                        </fragment>
                    )
                })
                }
                 </div> 
            </div>
        </div>
    )



}