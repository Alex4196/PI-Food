const {Router} = require('express');
const {getAllType} = require('../Controllers/type');

const router = Router();

router.get('/', getAllType);


module.exports = router;


/* 

type
-obtener todos los tipos de dietas posibles, si no encuentro , me deberia traer las dietas que existen en la api
-
 */