const { ObjectId } = require("mongodb");

class ReaderService {
    constructor(client) {
        this.Reader = client.db().collection("Readers");
    }

    extractReaderData(payload) {
        const reader = {
            madocgia: payload.madocgia,
            holot: payload.holot,
            ten: payload.ten,
            ngaysinh: payload.ngaysinh,
            phai: payload.phai,
            diachi: payload.diachi,
            dienthoai: payload.dienthoai,
        };

        // Remove undefined fields
        Object.keys(reader).forEach(
            (key) => reader[key] === undefined && delete reader[key]
        );

        return reader;
    }

    async create(payload) {
        const reader = this.extractReaderData(payload);
        const result = await this.Reader.findOneAndUpdate(
            { madocgia: reader.madocgia },
            { $set: reader },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }

    async find(filter) {
        const cursor = await this.Reader.find(filter);
        return await cursor.toArray();
    }

    async findByMadocgia(madocgia) {
        return await this.Reader.findOne({
            madocgia: madocgia,
        });
    }

    async findById(id) {
        return await this.Reader.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractReaderData(payload);
        const result = await this.Reader.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.Reader.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Reader.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = ReaderService;
