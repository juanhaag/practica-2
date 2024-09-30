const jwt = require('jsonwebtoken');
const conexion = require('../database/db');
const { promisify } = require('util');

exports.isAuthenticated = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO);
            conexion.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, results) => {
                if (!results || results.length === 0) {
                    return res.redirect('/login');
                }
                req.user = results[0];
                return next();
            });
        } catch (error) {
            console.log(error);
            return res.redirect('/login');
        }
    } else {
        return res.redirect('/login');
    }
};