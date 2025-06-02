const jwt = require('jsonwebtoken');
const secret = "LeMotDePasseEstMotDePasse";


//fonction créer Token
function newTokenAcces() {
    const tokenDataUser = {
        id : user.id,
        email : user.email
    };
    const tokenPass = secret;
    const tokenExpireTime = {expiresIn : '1h'};

    return jwt.sign(tokenDataUser , tokenPass, tokenExpireTime);
};

//fonction verifié Token
function verifyTokenAcces(req , res, next) {
    //recup le token
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    //verif si il y a un token
    if (!token) return res.status(401).json({ error: 'pas de Token' });

    //verifié le token
    jwt.verify(token, secret, (err, user) => {
        //verifie si token valide
        if (err) return res.status(403).json({ error: 'Token non valide' });
        req.user = user;
        next();
      });
};



export {verifyTokenAcces, newTokenAcces};