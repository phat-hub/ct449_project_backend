const { ObjectId } = require("mongodb");

class PublisherService {
    constructor(client) {
        this.Publisher = client.db().collection("Publishers");
    }

    // Extract publisher data from payload
    extractPublisherData(payload) {
        const publisher = {
            manxb: payload.manxb,
            tennxb: payload.tennxb,
            diachi: payload.diachi,
        };
        // Remove undefined fields
        Object.keys(publisher).forEach(
            (key) => publisher[key] === undefined && delete publisher[key]
        );
        return publisher;
    }

    async create(payload) {
        const publisher = this.extractPublisherData(payload);
        const result = await this.Publisher.findOneAndUpdate(
            publisher,
            { $set: {} },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }

    async find(filter) {
        const cursor = await this.Publisher.find(filter);
        return await cursor.toArray();
    }

    async findByName(tennxb) {
        return await this.find({
            tennxb: { $regex: new RegExp(tennxb), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Publisher.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractPublisherData(payload);
        const result = await this.Publisher.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.Publisher.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Publisher.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = PublisherService;
