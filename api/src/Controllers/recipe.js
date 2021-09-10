
const { Recipe, Type } = require('../db')
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const {Op} = require('sequelize')


/* 
async function APIcall() {
  try {
      const recipeApi = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=9839cb3e4cb64436bca28db4b565ae338&addRecipeInformation=true&number=5`
      );
      const requiredInfo = recipeApi.data.results.map((recipe) => {
          return {
              title: recipe.title,
              diets: recipe.diets.map((diet) => {
                  return { name: diet };
              }),
              healthyness: recipe.healthScore,
              summary: recipe.summary,
              image: recipe.image,
              id: recipe.id,
              score: parseInt(recipe.spoonacularScore),
              steps: recipe.analyzedInstructions
                  .map((r) => r.steps.map((s) => s.step))
                  .flat(2)
                  .join(""),
          };
      }
      )
      return requiredInfo
  }
  catch (error) { next(err) }
}


 async function listRecipe(req, res, next) {
  const { name } = req.query;
  if (!name) {
      try {
          const informacionAPI = await APIcall()
          const informacionDB = await Recipe.findAll({
                  include: {
                    model: Type,
                    attributes: ["name"],
                    through: {
                      attributes: [],
                    },
                  },
          });
          return res.send(await Promise.all([informacionDB, informacionAPI]));
      }
      catch (err) {
          res.json({ err })
          console.error(err);
      }
  }
  else {
      const nameAbuscar = name.toLowerCase()
      try {
          const APIderecetas = await APIcall()
          const FiltradoRecetaApi = APIderecetas.filter(a => {
              if (a.title.toLowerCase().includes(nameAbuscar)) {
                  return a
              }
          })

          const RecetasDB = await Recipe.findAll({
              where: {
                  title: `${nameAbuscar}`
              },
              include: {
                  model: Diet,
                  attributes: ["name"],
                  through: {
                      attributes: []
                  }
              }
          })
          return res.send(await Promise.all([FiltradoRecetaApi, RecetasDB]))
      }
      catch (err) {
          res.json({ err })
          console.error(err);
      }
  }
}

async function getRecipeDetail(req, res, next) {
  const { id } = req.params;
  const nameid = parseInt(id)

  const llamadaApi = await APIcall()
  try {

      const FiltradoPorID = llamadaApi.filter((a) => {
          if (a.id == nameid) {
              return a
          }
      })

      const recipeBD = await Recipe.findByPk(id,{
          include: {
              model: Type,
              attributes: ["name"],
              through: {
                  attributes: []
              }
          }

      })

      const response = await Promise.all([recipeBD, FiltradoPorID]);

      return res.send(response);

  } catch (err) {
     next(err)
      
  }
} 

async function createNewRecipe(req, res, next) {
 
  let { title, summary, score, healthyness, steps, diets} = req.body
  if(!title || !summary) {
    return res.status(404).send('We need a diet and a summary')
  }
  try{
    let newRecipe = await Recipe.create({ title, summary, score, healthyness, steps, id: uuidv4()});
  if (diets) {
    const dietDb = await Type.findAll({
      where: {
        name: diets
      },
    })
    newRecipe.addType(dietDb)
  }
  res.send('successfully created')
} catch(err) {
  next(err)
}
}  */ 


/* async function listRecipe(req, res, next) {
  const { name } = req.query
  if(!name){
  try {
   
    const apiInfo = await APIcall()
    const DBiNFO = await Recipe.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
});
return res.send(await Promise.all([informacionDB, informacionAPI]));
}
catch (err) {
res.json({ err })
console.error(err);
}
}
 else  }
    let listadoDeRecetas = await recipes.filter(e => e.title.toLowerCase().includes(name.toLowerCase()));
    listadoDeRecetas.length ? res.status(200).send(listadoDeRecetas) :
      res.status(404).send('No existe la receta')
  } catch (err) {
    next(err)
  
} 
  */

/* async function listRecipe(req, res, next) {
  try {
    const { name } = req.query
    const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=25fc391d100440efb263f5a7b889d2bb&addRecipeInformation=true&number=100`)
    const recipes = apiInfo.data.results

    const allRecipes = await recipes.map((recipe)=> {
      return {
        title: recipe.title,
        diets: recipe.diets.map((diet) => {
          return { name: diet};
        }),
        healthyness: recipe.healthScore,
                summary: recipe.summary,
                image: recipe.image,
                id: recipe.id,
                score: parseInt(recipe.spoonacularScore),
                steps: recipe.analyzedInstructions
                    .map((r) => r.steps.map((s) => s.step))
                    .flat(2)
                    .join(""),
      },
    })
  }
    if (!name) {
      return res.send(recipes)
    }
    let listadoDeRecetas = await recipes.filter(e => e.title.toLowerCase().includes(name.toLowerCase()));
    listadoDeRecetas.length ? res.status(200).send(listadoDeRecetas) :
      res.status(404).send('No existe la receta')
  } catch (err) {
    next(err)
  }
} 
 */


 async function listRecipe(req, res, next) {
  try {
    const { name } = req.query
   
    const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=457fc98cf4b74b3baea626fbd310efc8&addRecipeInformation=true&number=100`)
    const recipes = apiInfo.data.results
    const apiRecipes = await recipes.map((recipe) => {
      return {
          title: recipe.title,
          diets: recipe.diets,/* .map((diet) => {
              return { name: diet };
          }) */
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

console.log(recipeTypes)

      return res.send(apiRecipes.concat(recipeTypes))
    }

   let listadoDeRecetas = await apiRecipes.filter(e => e.title.toLowerCase().includes(name.toLowerCase()));
  /*  listadoDeRecetas.length ? res.status(200).send(listadoDeRecetas) :
   res.status(404).send('The recipe  does not exist')  */
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



/*  async function getRecipeDetail(req, res, next) {
  try {
    const { id } = req.params
    const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=eb54db2bf44b425bb3ed5d972d0d55f2`)
    const resultado = apiInfo.data
    res.send(resultado) 
      const dietas = await Type.findAll()
    res.send({ ...resultado, dietas: dietas })  
  }
  catch(err) {
   next(err)
  }
}    */



 async function getRecipeDetail(req, res, next) {
  try {
  const { id } = req.params;
 
  if(id.length !== 36){
  const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=457fc98cf4b74b3baea626fbd310efc8`)
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
   console.log(recipeBD)
   /* Recipe.findAll({
          where: {
              id: id
          }
          , 
          include: [{
            model: Type
          }]
        }) */
        
return res.send(recipeBD)   
  res.send({err: 'The detail fail'}) 
      }
  } catch (err) {
    next(err)
  }
} 




async function createNewRecipe(req, res, next) {
  try{
  let { title, summary, healthScore, spoonacularScore, steps, diets} = req.body
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

console.log(dietas)
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





/* let id = 0;
let diets = [
  {
    id: ++id,
    name: "dairy free",
  },
  {
    id: ++id,
    name: "whole 30",
  },
  {
    id: ++id,
    name: "gluten free",
  },
  {
    id: ++id,
    name: "vegan",
  },
  {
    id: ++id,
    name: "paleolithic",
  },
  {
    id: ++id,
    name: "pescatarian",
  },
  {
    id: ++id,
    name: "dairy free",
  },
  {
    id: ++id,
    name: "fodmap friendly",
  },
  {
    id: ++id,
    name: "lacto ovo vegetarian",
  },
  {
    id: ++id,
    name: "primal",
  },
];

async function createNewRecipe(req, res, next){

const {
  title, summary, healthScore, spoonacularScore, steps, diets
} = req.body;
try {
  const newRecipe = await Recipe.create({ title, summary, healthScore, spoonacularScore, steps, diets});
  if (diets.length) {
    diets.map(async (diet) => {
      try {
        let dietDB = await Type.findOne({
          where: {
            name: diet,
          },
        });
        newRecipe.addType(dietDB);
      } catch {
        next(err);
      }
    });
  }
  return res.json({
    mjs: "The recipe has benn created",
  });
} catch (error) {
  next(error);
}}
; */




/*   async function listRecipe(req, res, next) {
  try {
    const { name } = req.query
    const rec = []
    const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=eb54db2bf44b425bb3ed5d972d0d55f2&addRecipeInformation=true&number=100`)
    const recipes = apiInfo.data.results

    const allRecipes = await recipes.map(e => Recipe.findOrCreate({
      where: {
        id: uuidv4(),
        score: e.spoonacularScore, 
        name: e.title,
         summary: e.summary,
         steps: e.analyzedInstructions?.map(r => r.steps.map(s => s.step)).flat(1).join(' '), 
         healthyness: e.healthScore 
      },
      defaults: {
        name: e.title
      }
    }))
    if (!name) {
      return res.send(recipes)
    }
    let listadoDeRecetas = await recipes.filter(e => e.title.toLowerCase().includes(name.toLowerCase()));
    listadoDeRecetas.length ? res.status(200).send(listadoDeRecetas) :
      res.status(404).send('No existe la receta')
  } catch (err) {
    next(err)
  }
}  */
  




 

/*   async function getRecipeDetail(req, res, next) {
  const { id } = req.params
  axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=eabeefd2c7314b058dbdb26060389f6c`)
    .then(result => result.data)
    .then(result => {
      res.send(result)
    })
    .catch(() => { res.send('Esta id no existe') })
}
   */

    /* console.log('hola soy el back', name, dish_summary, punctuation, healthy_food_level, step_by_step, types) */
 /*   let newRecipe = await Recipe.create({ id, name, dish_summary, punctuation, healthy_food_level, step_by_step});
    await newRecipe.setType(types) */ 
     /* if(types) {
    const dietas = await Type.findAll({
      where: {
        name: {
          [Op.in]: types
        }
      }
    })
  }
    res.status(200).send(newRecipe);
 
  } catch (error) {
    next(error);
  }
}; 

module.exports = {
  getRecipeDetail,
  listRecipe, 
  createNewRecipe,
   APIcall 
}

/*  const recipes = apiInfo.data.results
 const allRecipes = await recipes.map(e => Recipe.findOrCreate({
  where: {
      name: e.title
  },
  defaults: {
    id: uuidv4(),
    punctuation: e.spoonacularScore,
    name: e.title,
    dish_summary: e.summary,
     step_by_step: e.analyzedInstructions.map(r => r.steps.map(s => s.step)).flat(1).join(' '),
    healthy_food_level: e.healthScore
  }
  }));
 let listadoDeRecetas = await recipes.filter(e => e.title.toLowerCase().includes(name.toLowerCase()));
listadoDeRecetas.length ? res.status(200).send(listadoDeRecetas.map(e => e.title)) :
    res.status(404).send('No existe la receta')
    }catch(err) {
        next(err)
    }
   */


/*  async function getRecipeDetail(req, res, next){
  const { id } = req.params
  let apiInfo = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=9839cb3e4cb64436bca28db4b565ae33&number=100&addRecipeInformation=true');
  const detailRecipe = apiInfo.data
  const recipe = await Recipe.findbyPk(id, {
  include: Type
  }) */

/*   async function getRecipeDetail(req, res, next) {
    try {
        const { id } = req.params;
        let apiInfo = await axios.get('https://api.spoonacular.com/recipes/{id}/information?apiKey=9839cb3e4cb64436bca28db4b565ae33&number=100&addRecipeInformation=true');
        const detailRecipe = apiInfo.data.results
        const recipeDetail= await detailRecipe.map( e => Recipe.findOrCreate({
            where: { id: e.id },
            include: { model: Type,
                       attributes: ['name'],
                       through: {
                        attributes: []
                       }
                     }
        }));
        recipeDetail.length ?
        res.status(200).send(recipeDetail) :
        res.status(404).json({error: `can not get ${id}`});

    } catch (error) {
        next(error);
    }
};
 */





/*
async function getRecipeDetail(req, res,next){

    const { title } = req.query;
    var apiRecipesPromise = await axios.get(
        'https:api.spoonacular.com/recipes/complexSearch?apiKey=9839cb3e4cb64436bca28db4b565ae33&number=100&addRecipeInformation=true'
    );
    var dbRecipesPromise = Recipe.findAll({
      includes: {
        model: types,
        where: {
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      },
    });
    return Promise.all([apiRecipesPromise,dbRecipesPromise])
      .then((resultados) => {
        var apiRecipes = resultados[0].data.results;
        var dbRecipes= resultados[1];
       var apiRecipes = apiRecipes.map((e) => {
          return {
            image: e.image,
            title: e.title,
            dishTypes:e.dishTypes
          };
        });
        dbRecipes = dbRecipes.map((e) => {
          return { image :e.image,
            title: e.title,
             dishTypes:e.dishTypes
          };
        });
        var allRecipes = apiRecipes.concat(dbRecipes);
        if (title) {
          const names = allRecipes.filter((e) =>
            e.title.toLowerCase().includes(title.toLowerCase())
          );
          return res.send(names);
        }
        return res.send(allRecipes);
      }
    } catch(err) {
        next(err);
}
  */





/*  async function listRecipe(req, res) {
const name = req.query.name;
try{
const apiInfo = await axios.get('https:api.spoonacular.com/recipes/complexSearch?apiKey=9839cb3e4cb64436bca28db4b565ae33&number=100&addRecipeInformation=true');

} catch (error) {

}
} */



