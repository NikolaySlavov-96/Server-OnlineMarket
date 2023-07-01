const Source = require("../models/SourceModel");
const { createNewDate } = require("../util/dates");

const getAll = (query, limit, skipSource) => {
    return Source.find(query).limit(limit).skip(skipSource);
}

const getById = (idSource) => {
    return Source.findById(idSource).find({ isDelete: false });
}

const create = (dataSource) => {

    return Source.create({
        articul: dataSource.articul,
        mark: dataSource.mark,
        model: dataSource.model,
        release: dataSource.release,
        description: dataSource.description,
        createAt: createNewDate(),
        lastUpdate: createNewDate(),
        owner: dataSource.owner,
    });
}

const updateById = async (idSource, dataSource) => {
    const oldData = await Source.findById(idSource);

    oldData.articul = dataSource.articul;
    oldData.mark = dataSource.mark;
    oldData.model = dataSource.model;
    oldData.release = dataSource.release;
    oldData.description = dataSource.description;
    oldData.lastUpdate = createNewDate();


    return await oldData.save();
}

const deleteById = async (idSource) => {
    const oldData = await Source.findById(idSource);

    oldData.lastUpdate = createNewDate();
    oldData.isDelete = !oldData.isDelete;

    return oldData.save();
}

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}