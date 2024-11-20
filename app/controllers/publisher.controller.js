const PublisherService = require("../services/publisher.service");
const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    try {
        const publisherService = new PublisherService(MongoDB.client);
        const result = await publisherService.create(req.body);
        res.send(result);
    } catch (error) {
        next(new ApiError(500, "An error occurred while creating the publisher"));
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const publisherService = new PublisherService(MongoDB.client);
        const publishers = await publisherService.find({});
        res.send(publishers);
    } catch (error) {
        next(new ApiError(500, "An error occurred while retrieving publishers"));
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const publisherService = new PublisherService(MongoDB.client);
        const publisher = await publisherService.findById(req.params.id);
        if (!publisher) {
            return next(new ApiError(404, "Publisher not found"));
        }
        res.send(publisher);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const publisherService = new PublisherService(MongoDB.client);
        const result = await publisherService.update(req.params.id, req.body);
        if (!result) {
            return next(new ApiError(404, "Publisher not found"));
        }
        res.send(result);
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const publisherService = new PublisherService(MongoDB.client);
        const result = await publisherService.delete(req.params.id);
        if (!result) {
            return next(new ApiError(404, "Publisher not found"));
        }
        res.send({ message: "Publisher was deleted successfully" });
    } catch (error) {
        next(error);
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const publisherService = new PublisherService(MongoDB.client);
        const deletedCount = await publisherService.deleteAll();
        res.send({ message: `${deletedCount} Publishers were deleted successfully` });
    } catch (error) {
        next(new ApiError(500, "An error occurred while delete all publishers"));
    }
};


