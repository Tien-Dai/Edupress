import express from "express";

import {
  createEnrollment,
  createEnrollmentsFromPayment,
  getEnrollmentsByUser,
  checkEnrollment,
  updateProgress,
  getStudents,
} from "../controllers/enrollment.js";

const routerEnrollment =
  express.Router();

// Tạo 1 enrollment
routerEnrollment.post(
  "/enrollments",
  createEnrollment
);

// Tạo enrollment từ payment
routerEnrollment.post(
  "/enrollments/payment/:paymentId",
  createEnrollmentsFromPayment
);

// Lấy khóa học của người dùng
routerEnrollment.get(
  "/enrollments/user/:userId",
  getEnrollmentsByUser
);

// Kiểm tra đã mua khóa học chưa
routerEnrollment.get(
  "/enrollments/check/:userId/:courseId",
  checkEnrollment
);

// Cập nhật tiến độ học
routerEnrollment.put(
  "/enrollments/:id/progress",
  updateProgress
);
routerEnrollment.get(
    "/students",
    getStudents
);

export default routerEnrollment;