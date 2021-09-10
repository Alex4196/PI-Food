const {Router} = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
/* const axios = require ('axios') */
const RecipeRoutes = require('./recipe');
const TypeRoutes = require('./type');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', RecipeRoutes);
router.use('/types',  TypeRoutes); 

module.exports = router;
