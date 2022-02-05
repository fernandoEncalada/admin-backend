/*
    Path: '/api/login'
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const { OAuth2Client } = require('google-auth-library');

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


module.exports = router;