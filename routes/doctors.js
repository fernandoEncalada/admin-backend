/*
    Doctorss
    path: api/doctors
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate');

const {
    getDoctors,
    createDoctor,
    updateDoctors,
    deleteDoctors
} = require('../controllers/Doctors');
    
const router = Router();

router.get( '/', getDoctors );

router.post( '/',
    [
        validateJWT,
        check('name', 'The name is required').not().isEmpty(),
        check('hospital', 'The hospital id must be valid').isMongoId(),
        validateFields
    ],
    createDoctor
  );

router.put( '/:id',
    [
        validateJWT,
        check('name', 'The name is required').not().isEmpty(),
        check('hospital', 'The hospital id must be valid').isMongoId(),
        validateFields
    ],
    updateDoctors
    );

router.delete( '/:id',
        deleteDoctors);

module.exports = router;