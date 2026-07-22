import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    // Người mua khóa học
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Danh sách khóa học đã mua
    courses: [
      {
        course_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },

        course_title: {
          type: String,
          default: "",
        },

        price: {
          type: Number,
          default: 0,
        },

        image_url: {
          type: String,
          default: "",
        },
      },
    ],

    // Tổng tiền trước giảm giá
    subtotal: {
      type: Number,
      default: 0,
    },

    // Số tiền được giảm
    discount: {
      type: Number,
      default: 0,
    },

    // Tổng tiền cuối cùng
    total_amount: {
      type: Number,
      default: 0,
    },

    // Mã giảm giá nếu có
    coupon: {
      code: {
        type: String,
        default: null,
      },

      percent: {
        type: Number,
        default: 0,
      },
    },

    // Phương thức thanh toán
    payment_method: {
      type: String,
      enum: [
        "cash",
        "bank_transfer",
        "momo",
        "vnpay",
        "free",
      ],
      default: "bank_transfer",
    },

    // Trạng thái thanh toán
    status: {
      type: String,
      enum: [
        "pending",
        "paid",
        "failed",
        "cancelled",
      ],

      // Web demo: thanh toán thành công ngay
      default: "paid",
    },

    // Mã giao dịch
    transaction_code: {
      type: String,
      default: null,
    },

    // ID giỏ hàng
    cart_id: {
      type: String,
      default: null,
    },

    // Thời điểm thanh toán thành công
    paid_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const PaymentModel = mongoose.model(
  "Payment",
  paymentSchema
);

export default PaymentModel;