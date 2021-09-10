const {Router} = require('express');
const { listRecipe,  getRecipeDetail,  createNewRecipe} = require('../Controllers/recipe')

const router = Router();

router.get('/:id', getRecipeDetail); 
router.get('/', listRecipe);
router.post('/create', createNewRecipe);

module.exports = router;

/* recipe
-Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
Si no existe ninguna receta mostrar un mensaje adecuado
-Obtener el detalle de una receta en particular
Debe traer solo los datos pedidos en la ruta de detalle de receta
Incluir los tipos de dieta asociados
-Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
Crea una receta en la base de datos
 */