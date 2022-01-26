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

const updateDoctors = (req, res) => {

    res.json({
        ok: true,
        msg: 'Upaate Doctorss'
    })
}

const deleteDoctors = (req, res) => {

    res.json({
        ok: true,
        msg: 'delete Doctorss'
    })
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctors,
    deleteDoctors
}