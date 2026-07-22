import express from "express";

import {
  checkoutPayment,
  createPayment,
  markPaymentPaid,
  getPayments,
  getPaymentsByUser,
  getPaymentById,
} from "../controllers/payment.js";

const routerPayment = express.Router();


// ==========================================
// THANH TOÁN NGAY + TẠO ENROLLMENT
// POST /payment/checkout
// ==========================================
routerPayment.post(
  "/payment/checkout",
  checkoutPayment
);


// ==========================================
// TẠO PAYMENT
// POST /payments
// ==========================================
routerPayment.post(
  "/payments",
  createPayment
);


// ==========================================
// LẤY TẤT CẢ PAYMENT
// GET /payments
// ==========================================
routerPayment.get(
  "/payments",
  getPayments
);


// ==========================================
// LẤY PAYMENT THEO USER
// GET /payments/user/:userId
// ==========================================
routerPayment.get(
  "/payments/user/:userId",
  getPaymentsByUser
);


// ==========================================
// XÁC NHẬN PAYMENT THÀNH CÔNG
// PUT /payments/:id/paid
// ==========================================
routerPayment.put(
  "/payments/:id/paid",
  markPaymentPaid
);


// ==========================================
// LẤY CHI TIẾT PAYMENT
// GET /payments/:id
// ==========================================
routerPayment.get(
  "/payments/:id",
  getPaymentById
);


export default routerPayment;