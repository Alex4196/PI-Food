const {Type} = require('../db')
 const axios = require('axios')
/* const { v4: uuidv4 } = require('uuid')  */
/* const { API_KEY } = process.env; */



  const diets = [
  {name: "gluten free"},
  {name: "dairy free"},
  {name: "lacto ovo vegetarian"},
  {name: "vegan"},
  {name: "paleolithic"},
  {name: "primal"},
  {name: "pescatarian"},
  {name: "fodmap friendly"},
  {name: "whole 30"},
]
 
 async function getAllType (req, res, next) {
try{
       const respuesta = await Type.findAll()
       if(respuesta.length >0) return res.json(respuesta)

       else{try{

        const dietDb = await Type.bulkCreate(diets)
        return res.json(dietDb)

       } catch(err){
          next(err)
       }

}
} catch(err){
    next(err)
}
}  


/*  async function getAllType(req, res, next){
const typeApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=eabeefd2c7314b058dbdb26060389f6c&number=20&addRecipeInformation=true/${diet}`)
const types = typeApi.data.results.map(e => e.name)
const name = types.map(e => {
    for ( let i=0; i<e.length; i++) return e[i]})
    name.forEach(e=> {
        Type.findOrCreate({
            where: {name: e}
        })
    })
    const allNames = await Type.findAll();
    res.send(allNames);
}  */

/*   async function getAllType(req, res, next){
    try{
        const db = await Type.findAll()
         console.log(db) 
        if(!db || db.length<1){
            const array= [];
            const apiInfo = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=eb54db2bf44b425bb3ed5d972d0d55f2&number=100&addRecipeInformation=true');
          
            apiInfo.data.results.map(e => {
                e.diets.map(f => { 
                    if(array.length === 0 || !array.includes(f))
                  array.push(f)})
              }) 
          
          console.log(array) 
          
                array.map(async d =>
                   await Type.findOrCreate({
                      where: {
                         name: d
                      },
                    defaults: {
                      id: uuidv4(),
                      name: d
                  } } 
                   )  
            )
           const dietas = await Type.findAll()
           res.status(200).send(dietas) 
           
        } else {
            console.log('else', db) 
            res.status(200).send(db)
        }
} catch(err) {
        next(err)
    }
}
    */

module.exports = {
    getAllType
}