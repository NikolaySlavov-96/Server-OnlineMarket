const { getAllLikes, addLikeToProduct, removeLike } = require("../services/likeService");
const { errorParser } = require("../util/parser");


// const getLikes = async (req, res) => {
//     console.log('here');
//     const likeCount = await getAllLikes(req.params.productId);
//     res.json( likeCount );
// };

const likeProduct = async (req, res) => {
    try {
        const { _id, productId, likeCount, users } = await addLikeToProduct(req.params.productId, req.user._id);
        res.json({ _id, productId, likeCount, users });
    } catch (err) {
        const message = errorParser(err);
        res.status(400).json({ message });
    }
};

const unlikeProduct = async (req, res) => {
    try {
        const idProduct = req.params.productId;
        const userId = req.user._id;
        
        await removeLike(idProduct, userId)
        res.status(200).end() 

    } catch (err) {
        const message = errorParser(err);
        res.status(400).json({ message });
    };
}


module.exports = {
    getLikes,
    likeProduct,
    unlikeProduct
}