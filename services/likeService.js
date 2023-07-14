const likeModel = require('../models/LikeModel');

const getAllLikes = async (productId) => {
    let product =  await likeModel.findOne({ productId }).lean();
    return product.likeCount;
};

const createLike = async () => {
    return await likeModel.create({
        likeCount: 0,
        users: []
    });
};

const addLikeToProduct = async (productId, userId) => {
    const existing = await likeModel.findOne({ productId });
    if(!existing){
        return await likeModel.create({
            productId: productId,
            likeCount: 1,
            users: [userId]
        })
    };
    if(existing.users.includes(userId.toString())){
        throw new Error('you have already liked this product')
    };
    existing.likeCount++;
    existing.users.push(userId);
    return existing.save();
};

const removeLike = async (productId, userId) => {
    const product = await likeModel.findOne({ productId });
    if(!product.users.includes(userId.toString())){
        throw new Error("You haven't liked this product");
    }
    product.likeCount--;
    product.users = product.users.filter(x => x.toString() != userId.toString());
    return product.save();
};

module.exports = {
    addLikeToProduct,
    removeLike,
    createLike
}
