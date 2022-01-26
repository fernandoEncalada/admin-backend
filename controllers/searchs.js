const { response } = require('express');

const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');

const getAll = async(req, res = response ) =>{

    const search = req.query.search;
    const regex = new RegExp( search, 'i');

    try {

        const [ users, hospitals, doctors ] = await Promise.all ([
            User.find( { name: regex }),
            Hospital.find( { name: regex }),
            Doctor.find( { name: regex })
        ])
        
        res.json({
            ok: true,
            users,
            hospitals,
            doctors
        });

    } catch (error) {

        console.log(error);
        
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });

    }
}


const getDocumentsCollection = async(req, res = response ) =>{

    const table = req.params.table;
    const search = req.params.search;
    const regex = new RegExp( search, 'i');


    let data = [];

    try {

        switch( table ){
            case 'doctors':
                data = await Doctor.find( { name: regex })
                                    .populate('user', 'name img')
                                    .populate('hospital', 'name img');
            break;

            case 'hospitals':
                data = await Hospital.find( { name: regex })
                                    .populate('user', 'name img');;
            break;

            case 'users':
                data = await User.find( { name: regex });
    
            break;

            default: 
                return res.status(400).json({
                    ok: false,
                    msg: 'The table name must be doctors/hospitals/users'
                });
        }
        
        res.json({
            ok: true,
            results: data
        })

    } catch (error) {

        console.log(error);
        
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });

    }
}


module.exports = {
    getAll,
    getDocumentsCollection
}