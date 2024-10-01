const conexion = require('../database/db')

exports.altaAlbum = async (req, res) => {
    try {
        const album = req.body.album;
        const genre = req.body.genre;
        const year = req.body.year;
        const song = req.file ? req.file.path : null; 
        const userId = req.user.id; 

        conexion.query('INSERT INTO albums SET ?', { album: album, genre: genre, year: year, song: song }, (error, results) => {
            if (error) {
                console.log(error);
                return res.send('Ocurrió un error al guardar el álbum.');
            }

            const albumId = results.insertId; 

            conexion.query('INSERT INTO user_albums (user_id, album_id) VALUES (?, ?)', [userId, albumId], (error) => {
                if (error) {
                    console.log(error);
                    return res.send('Ocurrió un error al asociar el álbum con el usuario.');
                }

                res.redirect('/');
            });
        });
    } catch (error) {
        console.log(error);
        res.send('Ocurrió un error.');
    }
};



exports.bajaAlbum = async (req, res) => {
    const albumId = req.params.id;

    try {
        await new Promise((resolve, reject) => {
            conexion.query('DELETE FROM user_albums WHERE album_id = ?', [albumId], (error, results) => {
                if (error) {
                    console.log(error);
                    return reject('Ocurrió un error al eliminar las relaciones.');
                }
                resolve(results);
            });
        });

        conexion.query('DELETE FROM albums WHERE id = ?', [albumId], (error, results) => {
            if (error) {
                console.log(error);
                return res.send('Ocurrió un error al eliminar el álbum.');
            }
            res.redirect('/');
        });
    } catch (error) {
        console.log(error);
        res.send('Ocurrió un error.');
    }
};



exports.modificarAlbum = async (req, res) => {
    const albumId = req.params.id;
    const album = req.body.album;
    const genre = req.body.genre;
    const year = req.body.year;

    try {
        conexion.query('UPDATE albums SET album = ?, genre = ?, year = ? WHERE id = ?', [album, genre, year, albumId], (error, results) => {
            if (error) {
                console.log(error);
                return res.send('Ocurrió un error al actualizar el álbum.');
            }
            res.redirect('/');
        });
    } catch (error) {
        console.log(error);
        res.send('Ocurrió un error.');
    }
};

exports.obtenerAlbumsPorUsuario = async (req, res) => {
    const userId = req.user.id; 
    console.log(userId);
    try {
        conexion.query(`
            SELECT albums.id, albums.album, albums.genre, albums.year, albums.song
            FROM albums
            JOIN user_albums ON albums.id = user_albums.album_id
            WHERE user_albums.user_id = ?
        `, [userId], (error, results) => {
            if (error) {
                console.log(error);
                return res.send('Ocurrió un error al obtener los álbumes.');
            }

            results.forEach(album => {
                album.song = `${req.protocol}://${req.get('host')}/${album.song}`;
            });
            console.log(results);
            
            res.render('index', { isHome: true, user: req.user, albums: results });
        });
    } catch (error) {
        console.log(error);
        res.send('Ocurrió un error.');
    }
};


