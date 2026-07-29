import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import categoryRouter from "./routes/category.js";
import routerUser from "./routes/user.js";
import routerProvider from "./routes/provider.js";
import routerCourse from "./routes/course.js";
import routerLogin from "./routes/login.js";
import routerRegister from "./routes/register.js";
import routerPayment from "./routes/payment.js";
import routerEnrollment from "./routes/enrollment.js";
import routerCourseSection from "./routes/courseSection.js";
import routerLecture from "./routes/lecture.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error(err);
  });

// Test API
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Chào mừng bạn đến với web học Edupress",
  });
});

// Routes
app.use("/", routerEnrollment);
app.use("/", routerPayment);

app.use("/", categoryRouter);
app.use("/", routerUser);
app.use("/", routerProvider);
app.use("/", routerCourse);
app.use("/", routerCourseSection);
app.use("/", routerLecture);
app.use("/", routerLogin);
app.use("/", routerRegister);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});