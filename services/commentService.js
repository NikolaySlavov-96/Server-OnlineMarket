const CommentModel = require("../models/CommentarModel");

const { createNewDate } = require("../util/dates");
const { changeFilds } = require("../util/changeFilds");


const obectOfKeys = {
    'createCommentar': ['productId', 'ownerId', 'name', 'commentar'],
    'editCommentar': ['name', 'commentar'],
}

const getAllComment = (query, limit, skipSource) => {
    return CommentModel.find(query).limit(limit).skip(skipSource);
}

const getCommentById = (idComment) => {
    return CommentModel.findById(idComment).find({ isDelete: false });
}

const createCommentForProduct = async (idProduct, owner, dataComment) => {
    const value = {
        createAt: createNewDate(),
    }
    const field = changeFilds(obectOfKeys['createCommentar'], value, { ...dataComment, ownerId: owner, productId: idProduct });
    const createComment = await CommentModel.create(field)
    return createComment;
}

const editCommentById = async (idComment, newDate) => {
    const commentInfo = await CommentModel.findById(idComment);

    const field = changeFilds(obectOfKeys['editCommentar'], commentInfo, newDate)

    return await field.save();
}

const deleteCommentById = async (idComment) => {
    const commentInfor = await CommentModel.findById(idComment);

    commentInfor.lastUpdate = createNewDate();
    commentInfor.isDelete = !commentInfor.isDelete;

    return await commentInfor.save();
}

module.exports = {
    getAllComment,
    getCommentById,
    createCommentForProduct,
    editCommentById,
    deleteCommentById,
}