const { addLikeToProduct, removeLike } = require("../services/likeService");
const { errorParser } = require("../util/parser");


const likeProduct = async (req, res) => {
    try {
        const { _id, likeCount, users } = await addLikeToProduct(req.params.likeId, req.user._id);
        res.json({ _id, likeCount, users });
    } catch (err) {
        const message = errorParser(err);
        res.status(400).json({ message });
    }
};

const unlikeProduct = async (req, res) => {
    try {
        const likeId = req.params.likeId;
        const userId = req.user._id;
        
        await removeLike(likeId, userId)
        res.status(200).end() 

    } catch (err) {
        const message = errorParser(err);
        res.status(400).json({ message });
    };
}

//create if the user has liked the product when entering the product


module.exports = {
    likeProduct,
    unlikeProduct
}