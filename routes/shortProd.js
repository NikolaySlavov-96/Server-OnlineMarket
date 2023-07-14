const shortProd = require('express').Router();
const { body } = require('express-validator');

const sourceConteroller = require('../controllers/shortProdContoller');
const commetController = require('../controllers/commentController');
const likeController = require('../controllers/likeController');
const { hasUser, hasRole } = require('../middlewares/guards');
const role = require('./role');

// like
shortProd.post('/likes/:likeId',
    hasUser(),
    hasRole(role.likeingProduct),
    likeController.likeProduct
);

shortProd.delete('/likes/:likeId',
    hasUser(),
    hasRole(role.likeingProduct),
    likeController.unlikeProduct
);


shortProd.get('/categories', sourceConteroller.getAllSource); //All products

// product
shortProd.get('/:category/:idSource', sourceConteroller.getSourceById);

shortProd.post('/category',
    hasUser(),
    hasRole(role.forProduct),
    body('productName').isLength({ min: 5 }).withMessage('productName field minal lenth is 5 characters'),
    body('category').isLength({ min: 5 }).withMessage('category field minal lenth is 5 characters'),
    body('subCategory').isLength({ min: 5 }).withMessage('subCategory field minal lenth is 5 characters'),
    body('description').isLength({ min: 5 }).withMessage('Description field minal lenth is 5 characters'),
    sourceConteroller.createSource);

shortProd.put('/:category/:idSource',
    hasUser(),
    hasRole(role.forProduct),
    body('productName').isLength({ min: 5 }).withMessage('productName field minal lenth is 5 characters'),
    body('category').isLength({ min: 5 }).withMessage('category field minal lenth is 5 characters'),
    body('subCategory').isLength({ min: 5 }).withMessage('subCategory field minal lenth is 5 characters'),
    body('description').isLength({ min: 5 }).withMessage('Description field minal lenth is 5 characters'),
    sourceConteroller.updateSource);

shortProd.delete('/category/:idSource',
    hasUser(),
    hasRole(role.forProduct),
    sourceConteroller.deleteSource);


//comment
shortProd.get('/category/:idSource/comments', commetController.getCommentarsByIdProduct);

shortProd.get('/category/:idSource/comment/:idComment', commetController.getCommentByIdComment);

shortProd.post('/category/:idSource/comment',
    hasUser(),
    hasRole(role.createCommentar),
    body('name').isLength({ min: 3 }).withMessage('Name length is minimal 3 characters'),
    body('commentar').isLength({ min: 3 }).withMessage('Commentar length is minimal 3 characters'),
    commetController.createComments);

shortProd.put('/category/:idSource/comment/:idComment',
    hasUser(),
    hasRole(role.forCommentars),
    body('name').isLength({ min: 3 }).withMessage('Name length is minimal 3 characters'),
    body('commentar').isLength({ min: 3 }).withMessage('Commentar length is minimal 3 characters'),
    commetController.editCommentByIdComment);

shortProd.delete('/category/:idSource/comment/:idComment',
    hasUser(),
    hasRole(role.forCommentars),
    commetController.deleteCommentByIdComment);


module.exports = shortProd;