const fs = require('fs');
const path = require('path');


const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const { updateImage } = require('../helpers/update-image');

const fileUpload = (req, res = response ) => {

    const type = req.params.type;
    const id = req.params.id;

    // Validate type
    const validatedTypes = ['hospitals', 'users', 'doctors'];
    if ( !validatedTypes.includes(type) ){
        return res.status(400).json({
            ok: false,
            msg: 'Is not a doctor, hospital or user'
        })
    }

    // Validate file exists
    if( !req.files || Object.keys(req.files).length === 0 ){
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded'
        });
    }

    const file = req.files.image;

    const cutedName = file.name.split('.');
    const extensionFile = cutedName[ cutedName.length - 1 ];
    
    const validExtensions = [ 'jpg', 'png', 'jpeg', 'gif']; 

    if( !validExtensions.includes( extensionFile )){
        return res.status(400).json({
            ok: false,
            msg: 'Extension not allowed'
        });
    }

    const fileName = `${ uuidv4() }.${ extensionFile }`;
     
    const path = `./uploads/${ type }/${ fileName }`;

    // Move image
    file.mv( path, (err) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error when moving the image'
            });
        }

        // Update BD
        updateImage( type, id, fileName );

        res.json({
            ok: true,
            msg: 'File uploaded',
            fileName
        });
    })


}

const getImage = ( req, res = response ) => {

    const type = req.params.type;
    const photo = req.params.photo;

    const pathImg = path.join( __dirname, `../uploads/${ type }/${ photo }`);

    if( fs.existsSync( pathImg )){
        res.sendFile( pathImg );
    }else{
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg`);
        res.sendFile( pathImg );
    }
    

}

module.exports = {
    fileUpload,
    getImage
}