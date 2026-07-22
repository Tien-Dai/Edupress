import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    // Người dùng đăng ký học
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Khóa học được đăng ký
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    // Payment tạo ra enrollment này
    payment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      default: null,
    },

    // Trạng thái học
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },

    // Tiến độ học %
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // Các bài đã học
    completed_lectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseLecture",
      },
    ],

    // Ngày bắt đầu học
    enrolled_at: {
      type: Date,
      default: Date.now,
    },

    // Ngày hoàn thành
    completed_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Một user không được ghi danh cùng khóa học 2 lần
enrollmentSchema.index(
  {
    user_id: 1,
    course_id: 1,
  },
  {
    unique: true,
  }
);

const EnrollmentModel = mongoose.model(
  "Enrollment",
  enrollmentSchema
);

export default EnrollmentModel;