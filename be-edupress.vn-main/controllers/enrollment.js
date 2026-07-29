import mongoose from "mongoose";

import EnrollmentModel from "../models/enrollment.js";
import PaymentModel from "../models/payment.js";
import courseModel from "../models/course/course.js";
import providerModel from "../models/provider.js";

export const createEnrollment = async (req, res) => {
  try {
    const {
      user_id,
      course_id,
      payment_id,
    } = req.body;

    if (!user_id || !course_id) {
      return res.status(400).json({
        message:
          "Thiếu thông tin người dùng hoặc khóa học",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(user_id) ||
      !mongoose.Types.ObjectId.isValid(course_id)
    ) {
      return res.status(400).json({
        message:
          "user_id hoặc course_id không hợp lệ",
      });
    }

    // Kiểm tra đã đăng ký khóa học chưa
    const existingEnrollment =
      await EnrollmentModel.findOne({
        user_id,
        course_id,
      });

    if (existingEnrollment) {
      return res.status(400).json({
        message:
          "Bạn đã đăng ký khóa học này rồi",

        data: existingEnrollment,
      });
    }

    // Nếu enrollment đến từ payment
    // thì kiểm tra payment
    if (payment_id) {
      if (
        !mongoose.Types.ObjectId.isValid(
          payment_id
        )
      ) {
        return res.status(400).json({
          message:
            "payment_id không hợp lệ",
        });
      }

      const payment =
        await PaymentModel.findById(
          payment_id
        );

      if (!payment) {
        return res.status(404).json({
          message:
            "Không tìm thấy giao dịch thanh toán",
        });
      }

      // Chỉ cho ghi danh khi đã thanh toán
      if (payment.status !== "paid") {
        return res.status(400).json({
          message:
            "Giao dịch chưa được thanh toán",
        });
      }

      // Kiểm tra payment có thuộc user không
      if (
        String(payment.user_id) !==
        String(user_id)
      ) {
        return res.status(403).json({
          message:
            "Giao dịch không thuộc người dùng này",
        });
      }

      // Kiểm tra khóa học có trong payment
      const courseInPayment =
        payment.courses.some(
          (course) =>
            String(course.course_id) ===
            String(course_id)
        );

      if (!courseInPayment) {
        return res.status(400).json({
          message:
            "Khóa học không tồn tại trong giao dịch",
        });
      }
    }

    const enrollment =
      await EnrollmentModel.create({
        user_id,
        course_id,

        payment_id:
          payment_id || null,

        status: "active",

        progress: 0,

        completed_lectures: [],

        enrolled_at: new Date(),
      });

    const result =
      await EnrollmentModel.findById(
        enrollment._id
      )
        .populate(
          "user_id",
          "username email"
        )
        .populate("course_id");

    return res.status(201).json({
      message:
        "Đăng ký khóa học thành công",

      data: result,
    });
  } catch (error) {
    console.error(
      "CREATE ENROLLMENT ERROR:",
      error
    );

    // Duplicate user + course
    if (error.code === 11000) {
      return res.status(400).json({
        message:
          "Bạn đã đăng ký khóa học này rồi",
      });
    }

    return res.status(500).json({
      message:
        "Không thể đăng ký khóa học",

      error: error.message,
    });
  }
};

// ==========================================
// TẠO NHIỀU ENROLLMENT SAU PAYMENT
// POST /enrollments/payment/:paymentId
// ==========================================
export const createEnrollmentsFromPayment =
  async (req, res) => {
    try {
      const { paymentId } = req.params;

      if (
        !mongoose.Types.ObjectId.isValid(
          paymentId
        )
      ) {
        return res.status(400).json({
          message:
            "paymentId không hợp lệ",
        });
      }

      const payment =
        await PaymentModel.findById(
          paymentId
        );

      if (!payment) {
        return res.status(404).json({
          message:
            "Không tìm thấy giao dịch",
        });
      }

      if (payment.status !== "paid") {
        return res.status(400).json({
          message:
            "Giao dịch chưa thanh toán thành công",
        });
      }

      const createdEnrollments = [];

      for (const course of payment.courses) {
        const existing =
          await EnrollmentModel.findOne({
            user_id: payment.user_id,

            course_id:
              course.course_id,
          });

        if (existing) {
          createdEnrollments.push(
            existing
          );

          continue;
        }

        const enrollment =
          await EnrollmentModel.create({
            user_id:
              payment.user_id,

            course_id:
              course.course_id,

            payment_id:
              payment._id,

            status: "active",

            progress: 0,

            completed_lectures: [],

            enrolled_at:
              new Date(),
          });

        createdEnrollments.push(
          enrollment
        );
      }

      return res.status(201).json({
        message:
          "Ghi danh khóa học thành công",

        data: createdEnrollments,
      });
    } catch (error) {
      console.error(
        "CREATE ENROLLMENTS FROM PAYMENT ERROR:",
        error
      );

      return res.status(500).json({
        message:
          "Không thể ghi danh khóa học",

        error: error.message,
      });
    }
  };

// ==========================================
// LẤY KHÓA HỌC CỦA USER
// GET /enrollments/user/:userId
// ==========================================
export const getEnrollmentsByUser =
  async (req, res) => {
    try {
      const { userId } = req.params;

      if (
        !mongoose.Types.ObjectId.isValid(
          userId
        )
      ) {
        return res.status(400).json({
          message:
            "userId không hợp lệ",
        });
      }

      const enrollments =
        await EnrollmentModel.find({
          user_id: userId,

          status: {
            $ne: "cancelled",
          },
        })
          .populate("course_id")
          .populate("payment_id")
          .sort({
            createdAt: -1,
          });

      return res.status(200).json({
        message:
          "Lấy danh sách khóa học đã đăng ký thành công",

        data: enrollments,
      });
    } catch (error) {
      console.error(
        "GET USER ENROLLMENTS ERROR:",
        error
      );

      return res.status(500).json({
        message:
          "Không thể lấy khóa học của người dùng",

        error: error.message,
      });
    }
  };

// ==========================================
// KIỂM TRA USER ĐÃ SỞ HỮU COURSE CHƯA
// GET /enrollments/check/:userId/:courseId
// ==========================================
export const checkEnrollment =
  async (req, res) => {
    try {
      const {
        userId,
        courseId,
      } = req.params;

      if (
        !mongoose.Types.ObjectId.isValid(
          userId
        ) ||
        !mongoose.Types.ObjectId.isValid(
          courseId
        )
      ) {
        return res.status(400).json({
          message:
            "userId hoặc courseId không hợp lệ",
        });
      }

      const enrollment =
        await EnrollmentModel.findOne({
          user_id: userId,

          course_id: courseId,

          status: {
            $ne: "cancelled",
          },
        });

      return res.status(200).json({
        enrolled: !!enrollment,

        data:
          enrollment || null,
      });
    } catch (error) {
      return res.status(500).json({
        message:
          "Không thể kiểm tra trạng thái khóa học",

        error: error.message,
      });
    }
  };

// ==========================================
// CẬP NHẬT TIẾN ĐỘ
// PUT /enrollments/:id/progress
// ==========================================
export const updateProgress =
  async (req, res) => {
    try {
      const { id } = req.params;

      const {
        progress,
        lecture_id,
      } = req.body;

      if (
        !mongoose.Types.ObjectId.isValid(id)
      ) {
        return res.status(400).json({
          message:
            "Enrollment ID không hợp lệ",
        });
      }

      const enrollment =
        await EnrollmentModel.findById(id);

      if (!enrollment) {
        return res.status(404).json({
          message:
            "Không tìm thấy thông tin đăng ký khóa học",
        });
      }

      // Thêm bài học đã hoàn thành
      if (
        lecture_id &&
        mongoose.Types.ObjectId.isValid(
          lecture_id
        )
      ) {
        const existed =
          enrollment.completed_lectures.some(
            (id) =>
              String(id) ===
              String(lecture_id)
          );

        if (!existed) {
          enrollment.completed_lectures.push(
            lecture_id
          );
        }
      }

      if (progress !== undefined) {
        const value =
          Number(progress);

        enrollment.progress =
          Math.min(
            Math.max(value, 0),
            100
          );
      }

      if (
        enrollment.progress >= 100
      ) {
        enrollment.progress = 100;

        enrollment.status =
          "completed";

        enrollment.completed_at =
          new Date();
      }

      await enrollment.save();

      return res.status(200).json({
        message:
          "Cập nhật tiến độ học thành công",

        data: enrollment,
      });
    } catch (error) {
      console.error(
        "UPDATE PROGRESS ERROR:",
        error
      );

      return res.status(500).json({
        message:
          "Không thể cập nhật tiến độ",

        error: error.message,
      });
    }
  };
  export const getStudents = async (req, res) => {
  try {
    const students = await EnrollmentModel.find()
      .populate("user_id", "username email")
      .populate("course_id", "course_title");

    return res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};