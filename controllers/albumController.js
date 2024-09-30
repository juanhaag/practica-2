const conexion = require('../database/db')

exports.altaAlbum = async (req, res) => {
    try {
        const album = req.body.album
        const genre = req.body.genre
        const year = req.body.year
        // Usas la conexión para insertar el álbum en la base de datos
        conexion.query('INSERT INTO albums SET ?', {album: album, genre: genre, year: year}, (error, results) => {
            if (error) {
                console.log(error)
            }
            res.redirect('/alta')
        })
    } catch (error) {
        console.log(error)
    }
}

exports.bajaAlbum = async (req, res) => {
    const album = req.body.album
    try {
        // Eliminamos el álbum sin mostrar una vista adicional, con la confirmación desde el front-end
        conexion.query('DELETE FROM albums WHERE album = ?', [album], (error, results) => {
            if (error) {
                console.log(error)
                return res.send('Ocurrió un error al eliminar el álbum.')
            }
            res.redirect('/baja')
        })
    } catch (error) {
        console.log(error)
        res.send('Ocurrió un error.')
    }
}

exports.modificarAlbum = async (req, res) => {
    const album = req.body.album
    const genre = req.body.genre
    const year = req.body.year
    try {
        // Actualizamos el álbum con los nuevos datos
        conexion.query('UPDATE albums SET genre = ?, year = ? WHERE album = ?', [genre, year, album], (error, results) => {
            if (error) {
                console.log(error)
                return res.send('Ocurrió un error al actualizar el álbum.')
            }
            res.redirect('/modificacion')
        })
    } catch (error) {
        console.log(error)
        res.send('Ocurrió un error.')
    }
}