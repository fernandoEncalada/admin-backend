const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response ) => {

    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({email});

        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email invalid'
            });
        }

        const validPassword = bcrypt.compareSync(password, userDB.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Passwrod invalid'
            });
        }

        const token = await generateJWT( userDB.id);

        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }
}

const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try{
        const { name, email, picture } =  await googleVerify( googleToken );

        const userDB = await User.findOne({ email });
        let user;

        if( !userDB ){
            user = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
            
        }else{
            user = userDB;
            user.google = true;
        }
        console.log(`user: ${user}`);
        await user.save();

        const token = await generateJWT( user.id);
        
        res.json({
            ok: true,
            token
        });

    }catch(error){ 

        res.status(401).json({
            ok: false,
            msg: 'Invalid Token'
        });

    }

} 


module.exports = {
    login,
    googleSignIn
}