const { response } = require('express');
const Doctor = require('../models/doctor');

const getDoctors = async(req, res) => {

    const doctors = await Doctor.find()
                            .populate('user', 'name')
                            .populate('hospital', 'name');

    try {
        
        res.json({
            ok: true,
            doctors
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error'
        })
    }

}

const createDoctor = async(req, res) => {

     // 61ef55a3411555a8f81ffd84

    //  console.log("request params", req);

     console.log("id user", req.uid);
     const uid = req.uid;
     const doctor = new Doctor({
         user: uid,
         ...req.body
     });
 
     try {
         
         const doctorDB = await doctor.save();
 
         res.json({
             ok: true,
             doctor: doctorDB
         });
 
     } catch (error) {
        console.log(error);
         res.status(500).json({
             ok: false,
             msg: 'Unexpected Error'
         });
 
     }
}

const updateDoctors = async(req, res) => {

    const id = req.params.id;
    const uid = req.uid;

    try{
        
        const doctorDB = Doctor.findById( id );

        if( !doctorDB ){
            return res.json({
                ok: true,
                msg: 'Doctor does not exists'
            });
        }

        const changesDoctor = {
            ...req.body,
            user: uid,
            // hospital: req.body.hospital
        };

        const updatedDoctor = await Doctor.findByIdAndUpdate(id, changesDoctor, { new: true});

        res.json({
            ok: true,
            updatedDoctor
        })

    }catch(error){

        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error'
        });
    }


}

const deleteDoctors = async(req, res) => {

    const id = req.params.id;

    try{
        
        const doctorDB = Doctor.findById( id );

        if( !doctorDB ){
            return res.json({
                ok: true,
                msg: 'Doctor does not exists'
            });
        }

        await Doctor.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Doctor has been deleted successfully'
        })

    }catch(error){

        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error'
        });
    }

}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctors,
    deleteDoctors
}