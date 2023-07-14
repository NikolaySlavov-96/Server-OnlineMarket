const likeModel = require('../models/LikeModel');


const createLike = async () => {
    return await likeModel.create({
        likeCount: 0,
        users: []
    });
};

const addLikeToProduct = async (likesId, userId) => {
    const existing = await likeModel.findOne({ likesId });
    if(!existing){
        throw new Error('like model does not exist for this product.DatabaseError');
    };
    if(existing.users.includes(userId.toString())){
        throw new Error('you have already liked this product')
    };
    existing.likeCount++;
    existing.users.push(userId);
    return existing.save();
};

const removeLike = async (likesId, userId) => {
    const product = await likeModel.findOne({ likesId });
    if(!product.users.includes(userId.toString())){
        throw new Error("You haven't liked this product");
    }
    product.likeCount--;
    product.users = product.users.filter(x => x.toString() != userId.toString());
    return product.save();
};

//TODO verification if the users has already liked the product
const hasLiked = async (likeId, userId) => {
    return;
} 

module.exports = {
    addLikeToProduct,
    removeLike,
    createLike
}
