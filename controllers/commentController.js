const { validationResult } = require('express-validator');

const { getAllComment, createCommentForProduct, editCommentById, deleteCommentById, getCommentById } = require("../services/commentService");
const { errorParser } = require('../util/parser');


const getCommentarsByIdProduct = async (req, res) => {
    const comments = await getAllComment(req.params.idSource);
    res.json(comments);
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
        const message = errorParser(err);
        res.status(401).json({ message });
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