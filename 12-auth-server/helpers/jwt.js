const jwt = require('jsonwebtoken')

const generarJWT = ( uid, name, email ) => {

    // Aunque he hecho esta solución, siempre es mejor minimizar los datos en el JWT (por peso del JWT)

    const payload = { uid, name, email }

    return new Promise( (resolve, reject) => {

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h',
        }, (err, token) => {

            if ( err ){
                console.log(err);
                reject( err );
            } else {
                resolve( token );
            }

        })

    })

}

module.exports = generarJWT
