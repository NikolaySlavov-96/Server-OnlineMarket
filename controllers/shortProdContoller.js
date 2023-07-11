const { validationResult } = require('express-validator');

// create get by id and return only owner id, not other

const { getAll, getById, create, updateById, deleteById } = require("../services/shortProdService");
const { errorParser } = require('../util/parser');

const getAllSource = async (req, res) => {
    const category = req?.query?.category;
    const subCategory = req?.query?.subCategory;
    const release = req?.query?.release;
    const page = parseInt(req?.query?.page) || 1;
    const limit = parseInt(req?.query?.limit) || 10;
    const skipSource = (page - 1) * limit;

    const querys = {};
    category ? querys.category = category : '';
    subCategory ? querys.subCategory = subCategory : '';
    release ? querys.release = release : '';

    const source = await getAll(querys, limit, skipSource);
    res.json(source);
};

const getSourceById = async (req, res) => {
    const product = await getById(req.params.category, req.params.idSource)
    res.json(product);
};

const createSource = async (req, res) => {
    try {
        const { errors } = validationResult(req);
        if (errors.length > 0) {
            throw errors;
        };

        // To Do checking witch field is mandatory and not filled or new Function
        if (Object.values(req.body).some(v => v != v)) {
            throw new Error('All field is required');
        }

        const createProduct = await create(req.body)
        res.json(createProduct);
    } catch (err) {
        const message = errorParser(err);
        res.status(400).json({ message });
    }
};

const updateSource = async (req, res) => {
    try {
        const { errors } = validationResult(req);

        if (errors.length > 0) {
            throw errors;
        }
        // To Do checking witch field is mandatory and not filled or new Function
        if (Object.values(req.body).some(v => v != v)) {
            throw new Error('All field is required');
        }

        const updateProduct = await updateById(req.params.idSource, req.body);
        res.json(updateProduct);
    } catch (err) {
        const message = errorParser(err);
        res.status(400).json({ message });
    }
};

const deleteSource = async (req, res) => {
    try {
        await deleteById(req.params.idSource);
        res.status(204).end();
    } catch (err) {
        const messge = errorParser(err);
        res.status(400).json({ messge });
    }
}


module.exports = {
    getAllSource,
    getSourceById,
    createSource,
    updateSource,
    deleteSource,
}