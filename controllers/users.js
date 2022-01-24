const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async(req, res) =>{

    const users = await User.find({}, 'name email role google');

    res.json({
        ok: true,
        users,
        uid: req.uid
    });

}

const createUser = async(req, res = response) =>{

    const { email, password }= req.body;

    try {

        const existEmail = await  User.findOne({email});

        if(existEmail ){
            res.status(400).json({
                ok: false,
                msg: 'The email is registered'
            });
        }


        const user = new User(req.body);

        //Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();
        
        const token = await generateJWT( user.id); 
    
        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }

}

const updateUser = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById(uid);

        if( !userDB ){
            return res.status(404).json({
                ok: false,
                msg: 'The user does not exist'
            });
        }

        const { password, google, email, ...fields} = req.body;

        if(userDB.email !== email){

            const existEmail = await User.findOne({ email });
            if( existEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'The email is already taken'
                });
            }
        }

        fields.email = email;

        const userUpdated = await User.findByIdAndUpdate( uid, fields, { new: true });
        

        res.json({
            ok: true,
            user: userUpdated
        });



        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }

}


const deleteUser = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById( uid );
        
        if( !userDB ){
            return res.status(404).json({
                ok: false,
                msg: 'The user does not exist'
            });
        }

        await User.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'User deleted'
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error'
        });
    }

}



module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}