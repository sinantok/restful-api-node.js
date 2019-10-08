const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;  
    if(token){
        jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
            if(err){
                res.json({
                    status: false,
                    message: 'Failed to authenticate token'
                });
            } 
            else{
                req.decode = decoded;
                next(); //burada hersey yolunda herhangi bir route ile eslesme imkani verildi
            }
        });
    }else{
        res.json({
            status: false,
            message: 'No token provided'
        });
    }
};