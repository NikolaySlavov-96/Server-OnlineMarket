const { validationResult } = require('express-validator');

const { getAllComment, createCommentForProduct, editCommentById, deleteCommentById, getCommentById } = require("../services/commentService");
const { getById } = require('../services/shortProdService');
const { errorParser } = require('../util/parser');


const getCommentarsByIdProduct = async (req, res) => {
    const idSource = req.params.idSource;

    //To Do Implement with Promice All
    const source = await getById(req.params.category, idSource);
    const comments = await getAllComment(idSource);

    const result = comments && ({ ...source, comment: comments })

    res.json(result);
}

const getCommentByIdComment = async (req, res) => {
    const { _id, ownerId, name, commentar, createAt } = await getCommentById(req.params.idComment);

    res.json({ _id, ownerId, name, commentar, createAt });
}

const createComments = async (req, res) => {

    try {
        const { errors } = validationResult(req);

        if (errors.length > 0) {
            throw errors;
        }

        // code for chech whats letter and change isDelete to false or not

        const { _id, ownerId, name, commentar, createAt, } = await createCommentForProduct(req.params.idSource, req.user._id, req.body);
        res.json({ _id, ownerId, name, commentar, createAt, });

    } catch (err) {
        const message = errorParser(err);
        res.status(400).json({ message });
    }
}

const editCommentByIdComment = async (req, res) => {

    try {
        const { errors } = validationResult(req);

        if (errors.length > 0) {
            throw errors;
        }

        const idComment = req.params.idComment;

        const { _id, ownerId, name, commentar, isDelete, } = await editCommentById(idComment, req.body);
        res.json({ _id, ownerId, name, commentar, isDelete, });
    } catch (err) {

    }
}

const deleteCommentByIdComment = async (req, res) => {
    const idComment = req.params.idComment;

    await deleteCommentById(idComment);

    res.status(204).end();
}

module.exports = {
    getCommentarsByIdProduct,
    getCommentByIdComment,
    createComments,
    editCommentByIdComment,
    deleteCommentByIdComment,
}