/*
    routh: api/all/:search
*/

/*
    Route '/api/users'
    */
    const { Router } = require('express');
    
    const { validateJWT } = require('../middlewares/validate');
    
    const { getAll, getDocumentsCollection } = require('../controllers/searchs');
    
    const router = Router();
    
    router.get( '/:busqueda', validateJWT, getAll );

    router.get( '/collection/:table/:search', validateJWT, getDocumentsCollection );
    
    module.exports = router;