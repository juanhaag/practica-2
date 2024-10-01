const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conexion = require('../database/db');

// Procedimiento para registrarnos
exports.register = async (req, res) => {
    try {
        const { fullname, username, password,email } = req.body;

        if (!fullname || !username || !password || !email) {
            return res.render('register', {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Todos los campos son obligatorios",
                alertIcon: 'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'register'
            });
        }

        const passHash = await bcryptjs.hash(password, 8);
        conexion.query('INSERT INTO users SET ?', { username, fullname, password: passHash,email }, (error, results) => {
            if (error) {
                console.log(error);
                return res.render('register', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Error al registrar el usuario",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'register'
                });
            }
            res.redirect('/');
        });
    } catch (error) {
        console.log(error);
        return res.render('register', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Error al registrar el usuario",
            alertIcon: 'error',
            showConfirmButton: true,
            timer: false,
            ruta: 'register'
        });
    }
};

// Procedimiento para iniciar sesión
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body);
        if (!username || !password) {
            console.log(username,password);
            return res.render('login', {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon: 'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            });
        }

        conexion.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) => {
            if (error) {
                console.log(error);
                return res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Error en la base de datos",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login'
                });
            }

            if (!results || results.length === 0 || !(await bcryptjs.compare(password, results[0].password))) {
                return res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o Password incorrectas",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login'
                });
            }

            // Inicio de sesión OK
            const id = results[0].id;
            const token = jwt.sign({ id }, process.env.JWT_SECRETO, {
                expiresIn: process.env.JWT_TIEMPO_EXPIRA
            });

            const cookiesOptions = {
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                httpOnly: true
            };
            res.cookie('jwt', token, cookiesOptions);
            return res.render('login', {
                alert: true,
                alertTitle: "Conexión exitosa",
                alertMessage: "¡LOGIN CORRECTO!",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 800,
                ruta: ''
            });
        });
    } catch (error) {
        console.log(error);
        return res.render('login', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Error al iniciar sesión",
            alertIcon: 'error',
            showConfirmButton: true,
            timer: false,
            ruta: 'login'
        });
    }
};

// Procedimiento para cerrar sesión
exports.logout = (req, res) => {
    res.clearCookie('jwt');
    return res.redirect('/');
};