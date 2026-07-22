import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// =======================
// Models
// =======================

import Category from "../models/category.js";
import Provider from "../models/provider.js";
import Course from "../models/course/course.js";
import CourseOverview from "../models/course/courseOverview.js";
import CourseRequest from "../models/course/courseRequest.js";
import CourseSection from "../models/course/courseSection.js";
import Lecture from "../models/course/courseLecture.js";

// =======================
// __dirname
// =======================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =======================
// Folder seed
// =======================

const seedFolder = path.join(__dirname, "seed");

const categories = JSON.parse(
    fs.readFileSync(
        path.join(seedFolder, "categories.json"),
        "utf8"
    )
);

const providers = JSON.parse(
    fs.readFileSync(
        path.join(seedFolder, "providers.json"),
        "utf8"
    )
);

const courses = JSON.parse(
    fs.readFileSync(
        path.join(seedFolder, "courses.json"),
        "utf8"
    )
);

const overviews = JSON.parse(
    fs.readFileSync(
        path.join(seedFolder, "courseOverviews.json"),
        "utf8"
    )
);

const requests = JSON.parse(
    fs.readFileSync(
        path.join(seedFolder, "courseRequests.json"),
        "utf8"
    )
);

const sections = JSON.parse(
    fs.readFileSync(
        path.join(seedFolder, "courseSections.json"),
        "utf8"
    )
);

const lectures = JSON.parse(
    fs.readFileSync(
        path.join(seedFolder, "lectures.json"),
        "utf8"
    )
);

async function seedDatabase() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("==================================");
        console.log("MongoDB Connected");
        console.log("==================================");
        // ====================================
        // XÓA DỮ LIỆU CŨ
        // ====================================

        console.log("\nĐang xóa dữ liệu cũ...");

        await Lecture.deleteMany({});
        await CourseSection.deleteMany({});
        await CourseOverview.deleteMany({});
        await CourseRequest.deleteMany({});
        await Course.deleteMany({});
        await Provider.deleteMany({});
        await Category.deleteMany({});

        console.log("✔ Đã xóa dữ liệu cũ");

        // ====================================
        // IMPORT CATEGORY
        // ====================================

        console.log("\n==================================");
        console.log("Import Categories");
        console.log("==================================");

        for (const item of categories) {

            const category = await Category.create({

                cate_name: item.cate_name,

                icon_key: item.icon_key,

                quantity: item.quantity

            });

            console.log(`✔ ${category.cate_name}`);

        }

        console.log("✔ Hoàn thành Categories");

        // ====================================
        // IMPORT PROVIDERS
        // ====================================

        console.log("\n==================================");
        console.log("Import Providers");
        console.log("==================================");

        for (const item of providers) {

            const provider = await Provider.create({

                provider_name: item.provider_name,

                career: item.career,

                email: item.email,

                images: Array.isArray(item.images)
                    ? item.images[0]
                    : item.images,

                status: item.status,

                user_id: null

            });

            console.log(`✔ ${provider.provider_name}`);

        }

        console.log("✔ Hoàn thành Providers");
        // ====================================
        // IMPORT COURSES
        // ====================================

        console.log("\n==================================");
        console.log("Import Courses");
        console.log("==================================");

        for (const item of courses) {

            // Tìm Category theo tên
            const category = await Category.findOne({
                cate_name: item.cate_name
            });

            if (!category) {
                console.log(`❌ Không tìm thấy Category: ${item.cate_name}`);
                continue;
            }

            // Tìm Provider theo tên
            const provider = await Provider.findOne({
                provider_name: item.provider_name
            });

            if (!provider) {
                console.log(`❌ Không tìm thấy Provider: ${item.provider_name}`);
                continue;
            }

            // Tạo Course
            const course = await Course.create({

                category_id: category._id,

                provider_id: provider._id,

                course_title: item.course_title,

                price: item.price,

                price_promotion: item.price_promotion,

                image_url: item.image_url,

                video_url: item.video_url,

                description: item.description,

                duration: item.duration,

                students: item.students,

                feature: item.feature,

                isActive: true

            });

            console.log(`✔ ${course.course_title}`);

        }

        console.log("✔ Hoàn thành Courses");
                // ====================================
        // IMPORT COURSE OVERVIEWS
        // ====================================

        console.log("\n==================================");
        console.log("Import Course Overviews");
        console.log("==================================");

        for (const item of overviews) {

            const course = await Course.findOne({
                course_title: item.course_title
            });

            if (!course) {
                console.log(`❌ Không tìm thấy Course: ${item.course_title}`);
                continue;
            }

            await CourseOverview.create({

                course_id: course._id,

                overview_name: item.overview_name

            });

        }

        console.log("✔ Hoàn thành Course Overviews");



        // ====================================
        // IMPORT COURSE REQUESTS
        // ====================================

        console.log("\n==================================");
        console.log("Import Course Requests");
        console.log("==================================");

        for (const item of requests) {

            const course = await Course.findOne({
                course_title: item.course_title
            });

            if (!course) {
                console.log(`❌ Không tìm thấy Course: ${item.course_title}`);
                continue;
            }

            await CourseRequest.create({

                course_id: course._id,

                request_name: item.request_name

            });

        }

        console.log("✔ Hoàn thành Course Requests");
                // ====================================
        // IMPORT COURSE SECTIONS
        // ====================================

        console.log("\n==================================");
        console.log("Import Course Sections");
        console.log("==================================");

        for (const item of sections) {

            const course = await Course.findOne({
                course_title: item.course_title
            });

            if (!course) {
                console.log(`❌ Không tìm thấy Course: ${item.course_title}`);
                continue;
            }

            await CourseSection.create({

                course_id: course._id,

                chapter_title: item.chapter_title,

                lecture_count: item.lecture_count,

                duration: item.duration

            });

        }

        console.log("✔ Hoàn thành Course Sections");



        // ====================================
        // IMPORT LECTURES
        // ====================================

        console.log("\n==================================");
        console.log("Import Lectures");
        console.log("==================================");

        for (const item of lectures) {

            const course = await Course.findOne({
                course_title: item.course_title
            });

            if (!course) {
                console.log(`❌ Không tìm thấy Course: ${item.course_title}`);
                continue;
            }

            const section = await CourseSection.findOne({

                course_id: course._id,

                chapter_title: item.chapter_title

            });

            if (!section) {
                console.log(`❌ Không tìm thấy Section: ${item.chapter_title}`);
                continue;
            }

            await Lecture.create({

                section_id: section._id,

                title: item.title,

                duration: item.duration,

                preview: item.preview,

                vid_lectures_url: item.vid_lectures_url || null

            });

        }

        console.log("✔ Hoàn thành Lectures");

                console.log("\n==================================");
        console.log("🎉 SEED DATABASE THÀNH CÔNG!");
        console.log("==================================");

    } catch (error) {

        console.error("\n==================================");
        console.error("❌ SEED DATABASE THẤT BẠI");
        console.error("==================================");
        console.error(error);

    } finally {

        await mongoose.disconnect();

        console.log("\n==================================");
        console.log("MongoDB Disconnected");
        console.log("==================================");

    }

}

seedDatabase();