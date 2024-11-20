const FollowService = require("../services/follow.service");
const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    try {
        const followService = new FollowService(MongoDB.client);
        const document = await followService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the follow")
        );
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const followService = new FollowService(MongoDB.client);
        const documents = await followService.find({});
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving follows")
        );
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const followService = new FollowService(MongoDB.client);
        const document = await followService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Follow not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving follow with id=${req.params.id}`)
        );
    }
};

exports.update = async (req, res, next) => {
    try {
        const followService = new FollowService(MongoDB.client);
        const document = await followService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Follow not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error updating follow with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const followService = new FollowService(MongoDB.client);
        const document = await followService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Follow not found"));
        }
        return res.send({ message: "Follow was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Could not delete follow with id=${req.params.id}`)
        );
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const followService = new FollowService(MongoDB.client);
        const deletedCount = await followService.deleteAll();
        return res.send({
            message: `${deletedCount} follows were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all follows")
        );
    }
};
