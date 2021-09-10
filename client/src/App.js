import './App.css';
import { Route, Switch } from "react-router-dom";
import React from "react";
/*  import styles from "./App.module.css"; */
import RecipeCreate from "./components/RecipeCreate";
import RecipeDetail from "./components/RecipeDetail";
import SearchBar from "./components/SearchBar";
import Home from "./components/Home";
import LandingPage from './components/LandingPage';


function App() { //el swtich te toma el ultimo, va a matchear los lonk que correspondan
  return (
    <React.Fragment>
      <Switch> 
        <Route path="/" exact component={LandingPage} />
        <Route path="/home"  component={Home} />
        <Route path="/recipecreate" component={RecipeCreate} />
        <Route path="/home" exact component={SearchBar} />
        <Route path="/:id" component={RecipeDetail} />
      </Switch>
      </React.Fragment>
  
  )
}

export default App;

