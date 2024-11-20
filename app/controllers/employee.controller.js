const ApiError = require("../api-error");
const EmployeeService = require("../services/employee.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const document = await employeeService.create(req.body);
        return res.send(document);
    } catch (error) {
        if (error.message === "Mã nhân viên đã tồn tại" || error.message === "Số điện thoại đã tồn tại") {
            return next(new ApiError(400, error.message)); // Trả về lỗi 400 với thông báo cụ thể
        }
        return next(new ApiError(500, "An error occurred while creating the employee"));
    }
};


exports.findOne = async (req, res, next) => {
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const document = await employeeService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Employee not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving employee with id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const document = await employeeService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Employee not found"));
        }
        return res.send(document);
    } catch (error) {
        if (error.message === "Số điện thoại đã được sử dụng bởi nhân viên khác") {
            return next(new ApiError(400, error.message)); // Trả về lỗi 400 với thông báo cụ thể
        }
        return next(new ApiError(500, `Error updating employee with id=${req.params.id}`));
    }
};


exports.login = async(req, res, next) => {
    try {
        const { msnv, password } = req.body;

        if (!msnv || !password) {
            return next(new ApiError(400, "Mã nhân viên và mật khẩu là bắt buộc"));
        }

        const employeeService = new EmployeeService(MongoDB.client);
        const result = await employeeService.login(msnv, password);
        res.send(result);
    } catch (error) {
        if (error.message === "Thông tin đăng nhập không chính xác") {
            return next(new ApiError(400, error.message)); // Trả về lỗi 400 với thông báo cụ thể
        }
        return next(new ApiError(500, "An error occurred while login"));
    }
};

