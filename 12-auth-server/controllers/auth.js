const { response, request } = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs")
const generarJWT = require("../helpers/jwt")

const Usuario = require("../models/Usuario")

const crearUsuario = async ( req = request, res = response ) => {

    const { name, email, password } = req.body;

    try{
            
    // Verificar el e-mail
    const usuario = await Usuario.findOne({email});
    if( usuario ){  
        return res.status(400).json({
            ok: false,
            msg: 'Ya existe un usuario con ese e-mail'
        })
    };

    // Crear usuario con el modelo
    const dbUser = new Usuario( req.body );

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync( password, salt );

    // Generar el JWT
    const token = await generarJWT( dbUser.id, dbUser.name );
    console.log(token)

    // Crear usuario en Base de datos
    dbUser.save();

    // Generar respuesta exitosa
    return res.status(201).json({
        ok: true,
        uid: dbUser.id,
        name: dbUser.name,
        token: token
    });

    } catch (error){
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Por favor, hable con el administrador',
        })        
    }

}

const loginUsuario = async ( req = request, res = response ) => {

    const { email, password } = req.body;

    try{

        const dbUser = await Usuario.findOne({email});

        if (!dbUser){
            return res.status(400).json({
                ok: false,
                msg: 'El email no existe'
            })
        } 

        // Confirmar si el password hace match
        const validPassword = bcrypt.compareSync( password, dbUser.password );

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'El password no es correcto'
            });
        }

        // Generar el JWT
        const token = await generarJWT( dbUser.id, dbUser.name );

        // Respuesta del servicio
        return res.status(200).json({
            ok: true,
            msg: 'Login correcto',
            uid: dbUser.id,
            name: dbUser.name,
            token: token
        })

    } catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const revalidarToken = async ( req = request, res = response ) => {

    const {uid, name} = req;

    const newToken = await generarJWT(uid, name);

    return res.json({
        ok: true,
        msg: 'renew',
        uid,
        name,
        newToken
    })

}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}
