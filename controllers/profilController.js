const { getUserById, editUserById, deleteUserById } = require("../services/profileService")


const getUser = async (req, res) => {
    const { _id, username, email, year } = await getUserById(req.user._id);
    res.json({ _id, username, email, year });
}

const updateUser = async (req, res) => {
    const { _id, username, email, year, isDelete } = await editUserById(req.user._id, req.body);
    res.json({ _id, username, email, year, isDelete });
}

const deleteUser = async (req, res) => {
    await deleteUserById(req.user._id);
    res.status(204).end();
}

module.exports = {
    getUser,
    updateUser,
    deleteUser,
}