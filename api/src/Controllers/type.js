const {Type} = require('../db')
 const axios = require('axios')

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

module.exports = {
    getAllType
}