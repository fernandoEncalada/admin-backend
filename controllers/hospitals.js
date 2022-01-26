const { response } = require('express');

const Hospital = require('../models/hospital');

const getHospitals = async(req, res) => {

    const hospitals = await Hospital.find().populate('user', 'name img');

    try {

        res.json({
            ok: true,
            hospitals
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error'
        })
    }
}

const createHospital = async(req, res) => {

    const uid = req.uid;
    const hospital = new Hospital( {
        user: uid,
        ...req.body
    });
    

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }

}

const updateHospital = (req, res) => {

    res.json({
        ok: true,
        msg: 'Upaate Hospitals'
    })
}

const deleteHospital = (req, res) => {

    res.json({
        ok: true,
        msg: 'delete Hospitals'
    })
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}