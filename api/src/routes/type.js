const {Router} = require('express');
const {getAllType} = require('../Controllers/type');

const router = Router();

router.get('/', getAllType);


module.exports = router;


