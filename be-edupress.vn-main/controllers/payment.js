import mongoose from "mongoose";
import PaymentModel from "../models/payment.js";
import EnrollmentModel from "../models/enrollment.js";

export const checkoutPayment = async (req, res) => {
  try {
    const {
      user_id,
      courses,
      cart_id,
      coupon,
      total,
    } = req.body;

    if (!user_id) {
      return res.status(400).json({
        message: "Thiếu thông tin người dùng",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({
        message: "user_id không hợp lệ",
      });
    }
    if (!Array.isArray(courses) || courses.length === 0) {
      return res.status(400).json({
        message: "Không có khóa học để thanh toán",
      });
    }

    for (const course of courses) {
      if (
        !course.course_id ||
        !mongoose.Types.ObjectId.isValid(course.course_id)
      ) {
        return res.status(400).json({
          message: "Có khóa học chứa course_id không hợp lệ",
        });
      }
    }

    const subtotal = courses.reduce(
      (sum, course) => sum + Number(course.price || 0),
      0
    );
    const totalAmount =
      total !== undefined
        ? Number(total)
        : subtotal;

    // Tiền được giảm
    const discount = Math.max(
      subtotal - totalAmount,
      0
    );

  
    const transactionCode =
      "EDU-" +
      Date.now() +
      "-" +
      Math.floor(1000 + Math.random() * 9000);

  
    const payment = await PaymentModel.create({
      user_id,

      courses: courses.map((course) => ({
        course_id: course.course_id,

        course_title:
          course.course_title ||
          course.title ||
          "",

        price: Number(course.price) || 0,

        image_url:
          course.image_url ||
          "",
      })),

      subtotal,

      discount,

      total_amount: totalAmount,

      coupon: coupon
        ? {
            code: coupon.code || null,
            percent: Number(coupon.percent) || 0,
          }
        : {
            code: null,
            percent: 0,
          },

      payment_method:
        totalAmount === 0
          ? "free"
          : "bank_transfer",

      // Demo: thanh toán thành công ngay
      status: "paid",

      transaction_code: transactionCode,

      cart_id: cart_id || null,

      paid_at: new Date(),
    });

  
    const enrollments = [];

    for (const course of courses) {

      const existingEnrollment =
        await EnrollmentModel.findOne({
          user_id,
          course_id: course.course_id,
        });

      if (existingEnrollment) {
        enrollments.push(existingEnrollment);
        continue;
      }

      const enrollment =
        await EnrollmentModel.create({
          user_id,

          course_id: course.course_id,

          payment_id: payment._id,

          status: "active",

          progress: 0,

          completed_lectures: [],

          enrolled_at: new Date(),

          completed_at: null,
        });

      enrollments.push(enrollment);
    }

    return res.status(201).json({
      message:
        "Thanh toán thành công! Bạn đã có thể học khóa học.",

      data: {
        payment,
        enrollments,
      },
    });

  } catch (error) {
    console.error(
      "CHECKOUT PAYMENT ERROR:",
      error
    );

    return res.status(500).json({
      message: "Thanh toán thất bại",

      error: error.message,
    });
  }
};

export const createPayment = async (req, res) => {
  try {
    const {
      user_id,
      courses,
      subtotal,
      discount = 0,
      total_amount,
      payment_method = "bank_transfer",
      cart_id,
      coupon,
    } = req.body;

    if (!user_id) {
      return res.status(400).json({
        message: "Thiếu thông tin người dùng",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({
        message: "user_id không hợp lệ",
      });
    }

    if (!Array.isArray(courses) || courses.length === 0) {
      return res.status(400).json({
        message: "Không có khóa học để thanh toán",
      });
    }

    for (const course of courses) {
      if (
        !course.course_id ||
        !mongoose.Types.ObjectId.isValid(course.course_id)
      ) {
        return res.status(400).json({
          message:
            "Có khóa học chứa course_id không hợp lệ",
        });
      }
    }

    const calculatedSubtotal =
      subtotal !== undefined
        ? Number(subtotal)
        : courses.reduce(
            (sum, course) =>
              sum + Number(course.price || 0),
            0
          );

    const calculatedDiscount =
      Number(discount) || 0;

    const calculatedTotal =
      total_amount !== undefined
        ? Number(total_amount)
        : Math.max(
            calculatedSubtotal -
              calculatedDiscount,
            0
          );

    const transactionCode =
      "EDU-" +
      Date.now() +
      "-" +
      Math.floor(1000 + Math.random() * 9000);

    const payment =
      await PaymentModel.create({
        user_id,

        courses: courses.map((course) => ({
          course_id: course.course_id,

          course_title:
            course.course_title ||
            course.title ||
            "",

          price:
            Number(course.price) || 0,

          image_url:
            course.image_url || "",
        })),

        subtotal: calculatedSubtotal,

        discount: calculatedDiscount,

        total_amount: calculatedTotal,

        coupon: coupon || null,

        payment_method:
          calculatedTotal === 0
            ? "free"
            : payment_method,

        status: "paid",

        transaction_code:
          transactionCode,

        cart_id:
          cart_id || null,

        paid_at: new Date(),
      });

    return res.status(201).json({
      message:
        "Tạo giao dịch thanh toán thành công",

      data: payment,
    });

  } catch (error) {

    console.error(
      "CREATE PAYMENT ERROR:",
      error
    );

    return res.status(500).json({
      message:
        "Không thể tạo giao dịch thanh toán",

      error: error.message,
    });
  }
};

export const markPaymentPaid = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message:
          "ID thanh toán không hợp lệ",
      });
    }

    const payment =
      await PaymentModel.findById(id);

    if (!payment) {
      return res.status(404).json({
        message:
          "Không tìm thấy giao dịch",
      });
    }

    if (payment.status === "paid") {
      return res.status(200).json({
        message:
          "Giao dịch đã được thanh toán",

        data: payment,
      });
    }

    payment.status = "paid";
    payment.paid_at = new Date();

    await payment.save();

    return res.status(200).json({
      message:
        "Xác nhận thanh toán thành công",

      data: payment,
    });

  } catch (error) {

    console.error(
      "MARK PAYMENT PAID ERROR:",
      error
    );

    return res.status(500).json({
      message:
        "Không thể xác nhận thanh toán",

      error: error.message,
    });
  }
};


// ======================================================
// LẤY TẤT CẢ PAYMENT
// GET /payments
// ======================================================
export const getPayments = async (req, res) => {
  try {

    const payments =
      await PaymentModel.find()
        .populate(
          "user_id",
          "username email role"
        )
        .populate(
          "courses.course_id"
        )
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      message:
        "Lấy danh sách thanh toán thành công",

      data: payments,
    });

  } catch (error) {

    console.error(
      "GET PAYMENTS ERROR:",
      error
    );

    return res.status(500).json({
      message:
        "Không thể lấy danh sách thanh toán",

      error: error.message,
    });
  }
};


// ======================================================
// LẤY PAYMENT THEO USER
// GET /payments/user/:userId
// ======================================================
export const getPaymentsByUser = async (req, res) => {
  try {

    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message:
          "userId không hợp lệ",
      });
    }

    const payments =
      await PaymentModel.find({
        user_id: userId,
      })
        .populate(
          "courses.course_id"
        )
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      message:
        "Lấy lịch sử thanh toán thành công",

      data: payments,
    });

  } catch (error) {

    console.error(
      "GET USER PAYMENTS ERROR:",
      error
    );

    return res.status(500).json({
      message:
        "Không thể lấy lịch sử thanh toán",

      error: error.message,
    });
  }
};


// ======================================================
// LẤY CHI TIẾT PAYMENT
// GET /payments/:id
// ======================================================
export const getPaymentById = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message:
          "ID thanh toán không hợp lệ",
      });
    }

    const payment =
      await PaymentModel.findById(id)
        .populate(
          "user_id",
          "username email role"
        )
        .populate(
          "courses.course_id"
        );

    if (!payment) {
      return res.status(404).json({
        message:
          "Không tìm thấy giao dịch",
      });
    }

    return res.status(200).json({
      message:
        "Lấy thông tin thanh toán thành công",

      data: payment,
    });

  } catch (error) {

    console.error(
      "GET PAYMENT ERROR:",
      error
    );

    return res.status(500).json({
      message:
        "Không thể lấy thông tin thanh toán",

      error: error.message,
    });
  }
};