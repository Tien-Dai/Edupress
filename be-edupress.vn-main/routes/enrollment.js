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
routerEnrollment.post(
  "/enrollments",
  createEnrollment
);
routerEnrollment.post(
  "/enrollments/payment/:paymentId",
  createEnrollmentsFromPayment
);
routerEnrollment.get(
  "/enrollments/user/:userId",
  getEnrollmentsByUser
);

routerEnrollment.get(
  "/enrollments/check/:userId/:courseId",
  checkEnrollment
);

routerEnrollment.put(
  "/enrollments/:id/progress",
  updateProgress
);

routerEnrollment.get(
    "/students",
    getStudents
);

export default routerEnrollment;