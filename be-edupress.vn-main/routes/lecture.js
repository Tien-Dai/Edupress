import express from "express";

import {
  getCourseLectures,
} from "../controllers/course/courseLecture.js";

const routerLecture = express.Router();

routerLecture.get(
  "/lectures",
  getCourseLectures
);

export default routerLecture;