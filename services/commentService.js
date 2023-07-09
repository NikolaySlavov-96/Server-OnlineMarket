const CommentModel = require("../models/CommentarModel");

const { createNewDate } = require("../util/dates");


const getAllComment = (idProduct) => {
    return CommentModel.find({ productId: idProduct }).find({ isDelete: false });
}

const getCommentById = (idComment) => {
    return CommentModel.findById(idComment).find({ isDelete: false });
}

const createCommentForProduct = async (idProduct, owner, dataComment) => {
    const createComment = await CommentModel.create({
        productId: idProduct,
        ownerId: owner,
        name: dataComment.name,
        commentar: dataComment.commentar,
        createAt: createNewDate(),
        lastUpdate: createNewDate(),
    });
    return createComment;
}

const editCommentById = async (idComment, newDate) => {
    const commentInfo = await CommentModel.findById(idComment);

    commentInfo.name = newDate.name;
    commentInfo.commentar = newDate.commentar;
    commentInfo.lastUpdate = createNewDate();

    return await commentInfo.save();
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

