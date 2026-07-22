import express from "express";

import {
  getCourseSections,
} from "../controllers/course/courseSection.js";

const routerCourseSection = express.Router();

routerCourseSection.get(
  "/coursesections",
  getCourseSections
);
    
export default routerCourseSection;