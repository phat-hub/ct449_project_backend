const ReaderService = require("../services/reader.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    try {
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating the reader"));
    }
};

exports.findAll = async (req, res, next) => {
    let readers = [];
    try {
        const readerService = new ReaderService(MongoDB.client);
        readers = await readerService.find({});
    } catch (error) {
        return next(new ApiError(500, "An error occurred while retrieving readers"));
    }
    return res.send(readers);
};

exports.findOne = async (req, res, next) => {
    try {
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Reader not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving reader with id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    try {
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Reader not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error updating reader with id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Reader not found"));
        }
        return res.send({ message: "Reader was deleted successfully" });
    } catch (error) {
        return next(new ApiError(500, `Could not delete reader with id=${req.params.id}`));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const readerService = new ReaderService(MongoDB.client);
        const deletedCount = await readerService.deleteAll();
        return res.send({
            message: `${deletedCount} readers were deleted successfully`,
        });
    } catch (error) {
        return next(new ApiError(500, "An error occurred while removing all readers"));
    }
};
