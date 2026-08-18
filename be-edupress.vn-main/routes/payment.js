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


routerPayment.post(
  "/payment/checkout",
  checkoutPayment
);
routerPayment.post(
  "/payments",
  createPayment
);

routerPayment.get(
  "/payments",
  getPayments
);
routerPayment.get(
  "/payments/user/:userId",
  getPaymentsByUser
);
routerPayment.put(
  "/payments/:id/paid",
  markPaymentPaid
);
routerPayment.get(
  "/payments/:id",
  getPaymentById
);


export default routerPayment;