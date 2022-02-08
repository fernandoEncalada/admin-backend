/*
    Path: '/api/login'
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const { validateJWT } = require('../middlewares/validate');

const router = Router();

router.post('/', 
    [
        check('email', 'The email is required').isEmail(),
        check('password', 'The password is required').not().isEmpty(),
        validateFields
    ],
    login
)

router.post('/google', 
    [
        check('token', 'The Google token is required').not().isEmpty(),
        validateFields
    ],
    googleSignIn
)


router.get('/renew',
    validateJWT,
    renewToken
)


module.exports = router;