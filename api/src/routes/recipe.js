const {Router} = require('express');
const { listRecipe,  getRecipeDetail,  createNewRecipe} = require('../Controllers/recipe')

const router = Router();

router.get('/:id', getRecipeDetail); 
router.get('/', listRecipe);
router.post('/create', createNewRecipe);

module.exports = router;

