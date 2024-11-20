const express = require("express");
const cors = require("cors");
const publishersRouter = require("./app/routes/publisher.route");
const booksRouter = require("./app/routes/book.route");
const employeeRouter = require("./app/routes/employee.route");
const readersRouter = require("./app/routes/reader.route");
const followRouter = require("./app/routes/follow.route");

const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/publishers", publishersRouter);
app.use("/api/books", booksRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/readers", readersRouter);
app.use("/api/follows", followRouter);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to  book management application." });
});

// Handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

// Error handling middleware
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;
