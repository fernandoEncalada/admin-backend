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

const updateHospital = async(req, res) => {

    const id = req.params.id;
    const uid = req.uid;

    try{

        const hospitalDB = Hospital.findById(id);

        if( !hospitalDB ){
            return res.status(404).json({
                ok: true,
                msg: 'Hospital does not exists'
            });
        }

        const changesHospital = {
            ...req.body,
            user: uid
        }

        const updatedHospital = await Hospital.findByIdAndUpdate(id, changesHospital, { new: true });

        res.json({
            ok: true,
            hospital: updatedHospital
        })

    }catch(error){
        console.log(error);

        res.status(500).json({
            ok: true,
            msg: 'Unexpected error'
        });
    }

    
}

const deleteHospital = async(req, res) => {

    const id = req.params.id;

    try{

        const hospitalDB = Hospital.findById(id);

        if( !hospitalDB ){
            return res.status(404).json({
                ok: true,
                msg: 'Hospital does not exists'
            });
        }
        
        await Hospital.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Hospital has been deleted successfully'
        })

    }catch(error){
        console.log(error);

        res.status(500).json({
            ok: true,
            msg: 'Unexpected error'
        });
    }
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}