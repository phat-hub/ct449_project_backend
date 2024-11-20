const { ObjectId } = require("mongodb");

class FollowService {
    constructor(client) {
        this.Follow = client.db().collection("Follows");
    }

    extractFollowData(payload) {
        const follow = {
            madocgia: payload.madocgia,
            masach: payload.masach,
            ngaymuon: payload.ngaymuon,
            ngaytra: payload.ngaytra,
        };
        // Remove undefined fields
        Object.keys(follow).forEach(
            (key) => follow[key] === undefined && delete follow[key]
        );
        return follow;
    }

    async create(payload) {
    const follow = this.extractFollowData(payload);

    const result = await this.Follow.findOneAndUpdate(
        { madocgia: follow.madocgia, masach: follow.masach }, 
        { $set: follow }, 
        { returnDocument: "after", upsert: true } 
    );

    return result;
}


    async find(filter) {
        const cursor = await this.Follow.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.Follow.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractFollowData(payload);
        const result = await this.Follow.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.Follow.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Follow.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = FollowService;
