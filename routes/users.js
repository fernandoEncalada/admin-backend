/*
    Route '/api/users'
    */
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate');

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');

const router = Router();

router.get( '/', validateJWT, getUsers );

router.post( '/',
    [
        check('name', 'The name is required').not().isEmpty(),
        check('password' , 'The password is required').not().isEmpty(),
        check('email', 'The email is required').isEmail() ,
        validateFields
    ],
    createUser
  );

router.put( '/:id',
    [
        validateJWT,
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('role' , 'The role is required').not().isEmpty(),
    validateFields
    ],
    updateUser
    );

router.delete( '/:id',
        validateJWT,
        deleteUser);

module.exports = router;