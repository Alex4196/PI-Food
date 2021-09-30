
const { Recipe, Type } = require('../db')
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const {Op} = require('sequelize');
require('dotenv').config();
const { API_KEY } = process.env;




 async function listRecipe(req, res, next) {
  try {
    const { name } = req.query
   
    const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const recipes = apiInfo.data.results
    const apiRecipes = await recipes.map((recipe) => {
      return {
          title: recipe.title,
          diets: recipe.diets,
          healthyness: recipe.healthScore,
          summary: recipe.summary,
          image: recipe.image,
          id: recipe.id,
          spoonacularScore: parseInt(recipe.spoonacularScore),
          steps: recipe.analyzedInstructions
              .map((r) => r.steps.map((s) => s.step))
              .flat(1)
              .join(""),
      };
  }
  )
    if (!name) {
      const recipeTypes = await Recipe.findAll({
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
});


      return res.send(apiRecipes.concat(recipeTypes))
    }

   let listadoDeRecetas = await apiRecipes.filter(e => e.title.toLowerCase().includes(name.toLowerCase()));
 
    const recipeName = await Recipe.findAll({
      where: {
          title: {
            [Op.iLike]: `%${name}%`
          }
        }
      })
      const receta = listadoDeRecetas.concat(recipeName)
      receta.length ?
      res.status(200).send(receta) :
      res.status(404).json({error: 'Recipe not found'});
 
  } catch (err) {
    next(err)
  }
 }







 async function getRecipeDetail(req, res, next) {
  try {
  const { id } = req.params;
 
  if(id.length !== 36){
  const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
  const resultado = apiInfo.data
  resultado ? res.send(resultado) : null
  } 
  else {
   const recipeBD = await Recipe.findByPk(id,{
    include: {
        model: Type,
        attributes: ["name"],
        through: {
            attributes: []
        }
    }
  })
  /*  console.log(recipeBD) */
   
        
return res.send(recipeBD)   
 
      }
  } catch (err) {
    next(err)
  }
} 




async function createNewRecipe(req, res, next) {
  try{
  let { title, summary, healthScore, spoonacularScore, steps, diets} = req.body
  /* console.log(title, summary, healthScore, spoonacularScore, steps, diets) */
  if(!title || !summary) {
    return res.status(404).send('We need a diet and a summary')
  }
    let newRecipe = await Recipe.create({ title, summary, healthScore, spoonacularScore, steps, id: uuidv4() });
    
    const dietas = await Type.findAll({
      where: {
          name: {
              [Op.in]: diets
          },
      }
      });
dietas.map((c) => {
  
newRecipe.addType(c)

});


res.status(201).send(newRecipe);
} catch (error) {
next(error);
}
};

module.exports = {
  getRecipeDetail,
  listRecipe, 
  createNewRecipe,
}





