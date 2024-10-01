const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const albumController = require('../controllers/albumController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.get('/login', (req, res) => {
  res.render('login', { alert: false });
});
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', authController.register);
router.post('/login', authController.login);

router.use(authMiddleware.isAuthenticated);

router.get('/', async (req, res) => {
  try {
    const userId = req.user.id; 
    albumController.obtenerAlbumsPorUsuario(req, res);
  } catch (error) {
    console.log(error);
    res.redirect('/login'); 
  }
});
router.get('/alta', (req, res) => {
  res.render('index', { isHome: false, partial: 'partials/alta', user: req.user });
});
router.post('/alta', upload.single('song'), albumController.altaAlbum);
router.post('/modificacion/:id', albumController.modificarAlbum);


// Ruta para eliminar el álbum
router.post('/baja/:id', albumController.bajaAlbum);

// Router para los métodos del controller protegidos
router.get('/logout', authController.logout);
router.post('/alta', albumController.altaAlbum);
router.post('/baja', albumController.bajaAlbum);
router.post('/modificacion', albumController.modificarAlbum);

module.exports = router;