const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const albumController = require('../controllers/albumController');
const authMiddleware = require('../middleware/authMiddleware');

// Router para las vistas públicas
router.get('/login', (req, res) => {
  res.render('login', { alert: false });
});
router.get('/register', (req, res) => {
  res.render('register');
});

// Router para los métodos del controller públicos
router.post('/register', authController.register);
router.post('/login', authController.login);

// Aplicar middleware de autenticación a todas las rutas protegidas
router.use(authMiddleware.isAuthenticated);

// Router para las vistas protegidas
router.get('/', (req, res) => {
  res.render('index', { isHome: true, user: req.user });
});
router.get('/alta', (req, res) => {
  res.render('index', { isHome: false, partial: 'partials/alta', user: req.user });
});
router.get('/modificacion', (req, res) => {
  res.render('index', { isHome: false, partial: 'partials/modificacion', user: req.user });
});
router.get('/baja', (req, res) => {
  res.render('index', { isHome: false, partial: 'partials/baja', user: req.user });
});

// Router para los métodos del controller protegidos
router.get('/logout', authController.logout);
router.post('/alta', albumController.altaAlbum);
router.post('/baja', albumController.bajaAlbum);
router.post('/modificacion', albumController.modificarAlbum);

module.exports = router;