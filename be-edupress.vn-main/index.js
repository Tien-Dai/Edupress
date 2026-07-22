import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import categoryRouter from './routes/category.js';
import routerUser from './routes/user.js';
import routerProvider from './routes/provider.js';
import routerCourse from './routes/course.js';
import routerLogin from './routes/login.js';
import routerRegister from "./routes/register.js";
import cors from "cors";
import routerPayment from "./routes/payment.js";
import routerEnrollment from "./routes/enrollment.js";
import routerCourseSection from "./routes/courseSection.js";
import routerLecture from "./routes/lecture.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((err) => {
    console.log(err);
});

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Chào mừng bạn đến với web học Edupress'
    });
});

app.use("/", routerEnrollment);
app.use("/", routerPayment);
// Danh mục
app.use('/', categoryRouter);

// Tài khoản
app.use('/', routerUser);

// Giảng viên
app.use('/', routerProvider);

// Khóa học
app.use('/', routerCourse);
app.use("/", routerCourseSection);
app.use("/", routerLecture);
// Đăng nhập
app.use('/', routerLogin);

// Đăng ký
app.use('/', routerRegister);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});