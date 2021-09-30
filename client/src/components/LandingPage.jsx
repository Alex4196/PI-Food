
import {Link} from "react-router-dom";
import styles from "./LandingPage.module.css"

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { listRecipes } from '../actions';
import Kitchen from './video.mp4'

const LandingPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(listRecipes())
  }, [dispatch]
  );

  return (

      <div className={styles.contenedor}>
        
        <h6 className={styles.title}>The ultimate food app</h6>
       
          <video autoPlay loop muted className={styles.video} >
              <source src={Kitchen} type="video/mp4" />
          </video>
          <Link to='/home'><button className={styles.boton}>Home</button></Link>
      </div>

  )
};




export default LandingPage;