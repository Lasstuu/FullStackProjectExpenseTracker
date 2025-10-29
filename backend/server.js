const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

connectDB();
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
