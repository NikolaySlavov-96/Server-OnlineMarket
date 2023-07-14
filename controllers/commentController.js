const { validationResult } = require('express-validator');

const { getAllComment, createCommentForProduct, editCommentById, deleteCommentById, getCommentById } = require("../services/commentService");
const { errorParser } = require('../util/parser');
const { createNewDateWithDate } = require('../util/dates');
const { badWordCheck } = require('../util/badWordCheck');


const getCommentarsByIdProduct = async (req, res) => {
    const page = parseInt(req?.query?.page) || 1;
    const limit = parseInt(req?.query?.limit) || 10;
    const skipSource = (page - 1) * limit;
    const query = {
        isDelete: false,
        productId: req.params.idSource,
    };

    const comments = await getAllComment(query, limit, skipSource);
    res.json(comments);
}

const getCommentByIdComment = async (req, res) => {
    const { _id, ownerId, name, commentar, createAt } = await getCommentById(req.params.idComment);

    res.json({ _id, ownerId, name, commentar, createAt });
}

const getAllComentarsForDates = async (req, res) => {
    const from = req?.query?.from;
    const to = req?.query?.to;
    const isDelete = req?.query?.isDelete

    const query = {};
    isDelete ? query.isDelete = true : query.isDelete = false;
    from ? query.createAt = { $gte: createNewDateWithDate(from) } : '';
    to ? query.createAt = { $gte: createNewDateWithDate(from), $lte: createNewDateWithDate(to) } : '';

    const comment = await getAllComment(query);
    res.json(comment)
}

const createComments = async (req, res) => {
    try {
        const { errors } = validationResult(req);
        if (errors.length > 0) {
            throw errors;
        }
        // code for chech whats letter and change isDelete to false or not
        if(badWordCheck(req.body.commentar)){
            throw new Error('Your comment may include uncensored words.Please check and try again.')
        };
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

        const { _id, ownerId, name, commentar, isDelete, } = await editCommentById(req.params.idComment, req.body);
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
    getAllComentarsForDates,
    createComments,
    editCommentByIdComment,
    deleteCommentByIdComment,
}