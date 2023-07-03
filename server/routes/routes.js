const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Post = require("../Models/Post");

const router = express.Router();

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../public'),
    /* destination: path.join(__dirname, '../../client/public/images'), */
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskstorage
}).single('image')

router.get('/', (req, res) => {
    res.send('Bienvenid@ a mi Blog')
})

router.post('/images/post', fileUpload, (req, res) => {
    res.send(req.file.filename);
})

router.get('/images/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(path.join(__dirname, '../public', filename));
  });

// Borrar imagen de la carpeta public del server
router.delete('/images/:filename', async (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, '../public', filename);
  
    try {

      fs.unlinkSync(imagePath);
      const imageUrl = `http://localhost:9000/images/${filename}`; 
      /* res.json({ message: 'Image deleted', filename: filename, imagePath: imagePath, imageUrl: imageUrl }); */
      res.send({filename: filename, imagePath: imagePath, imageUrl: imageUrl });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting image');
    }
  });
  



/* -------------------   CRUD    --------------------------------------------------------------- */

// Obtener todos los posts
router.get('/posts', async (req, res) => {
    try {
        /* const posts = await Post.findAll(); */
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']]
          });
          
        console.log(posts)
        res.json(posts);

    } catch (err) {
        console.error(err);
        res.status(500).send('Error del servidor');
    }
});

// Obtener un post por su ID
router.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            res.status(404).send('Registro no encontrado');
        } else {
            res.json(post);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error del servidor');
    }
});

// Crear un post
router.post('/posts', async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error del servidor');
    }
});

// Editar un post
router.patch('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            res.status(404).send('Registro no encontrado');
        } else {
            await post.update(req.body);
            res.json(post);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error del servidor');
    }
});

// Eliminar un post
router.delete('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            res.status(404).send('Registro no encontrado');
        } else {
            await post.destroy();
            res.json({ message: 'Registro eliminado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error del servidor');
    }
})




module.exports = router