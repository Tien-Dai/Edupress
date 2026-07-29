import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import "./i18n.js";
import AuthProvider from "./context/AuthContext.jsx";
import CustomerLayout from "./layouts/CustomerLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import PrivateRoute from "./components/routes/PrivateRoute.jsx";
import HomePage from "./pages/customer/Home/HomePage.jsx";
import Detail from "./pages/customer/Detail/DetailPage.jsx";
import CourseCategoryPage from "./pages/customer/CourseCategoryPage/CourseCategoryPage.jsx";
import CartPage from "./pages/customer/Cart/CartPage.jsx";
import CheckoutPage from "./pages/customer/Checkout/CheckoutPage.jsx";
import CheckoutHistoryPage from "./pages/customer/CheckoutHistory/CheckoutHistoryPage.jsx";
import MyCoursePage from "./pages/customer/MyCourse/MyCoursePage.jsx";
import RegisterProvider from "./pages/customer/RegisterProvider/registerProvider.jsx";
import BlogPage from "./pages/customer/Blog/BlogPage.jsx";
import AboutPage from "./pages/customer/About/AboutPage.jsx";
import ContactPage from "./pages/customer/Contact/ContactPage.jsx";

// Learning
import LearningPage from "./pages/Learning/LearningPage.jsx";

// Auth
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";

// Scan
import ScanPage from "./pages/Scan/ScanPgae.jsx";

// Admin Pages
import ManagementUsers from "./pages/admin/ManagementUsers/ManagementUsers.jsx";
import ManagementCourse from "./pages/admin/ManagementCourse/ManagementCourse.jsx";
import BoxShowDetailCourse from "./pages/admin/ManagementCourse/BoxShowDetailCourse/BoxShowDetailCourse.jsx";
import ManagementRegisterProvider from "./pages/admin/ManagementRegisterProvider/ManagementRegisterProvider.jsx";
import ManagementStudent from "./pages/admin/ManagementStudent/ManagementStudent.jsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>

            {/* ================= CUSTOMER ================= */}
            <Route path="/" element={<CustomerLayout />}>

              <Route index element={<HomePage />} />

              {/* Header */}
              <Route path="blog" element={<BlogPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />

              {/* Course */}
              <Route path="detail/:_id" element={<Detail />} />
              <Route
                path="course-category/:_id"
                element={<CourseCategoryPage />}
              />

              {/* Cart */}
              <Route path="cart" element={<CartPage />} />

              <Route
                path="checkout"
                element={
                  <PrivateRoute>
                    <CheckoutPage />
                  </PrivateRoute>
                }
              />

              <Route
                path="checkout-history"
                element={<CheckoutHistoryPage />}
              />

              {/* My Course */}
              <Route
                path="my-course"
                element={<MyCoursePage />}
              />

              {/* Provider */}
              <Route
                path="register-provider"
                element={<RegisterProvider />}
              />

            </Route>

            {/* ================= ADMIN ================= */}
            <Route
              path="/admin"
              element={
                <PrivateRoute roles={["admin", "provider"]}>
                  <AdminLayout />
                </PrivateRoute>
              }
            >

              {/* Admin */}
              <Route
                path="employee"
                element={
                  <PrivateRoute roles={["admin"]}>
                    <ManagementUsers />

                  </PrivateRoute>
                }
              />
              <Route
                path="students"
                element={
                  <PrivateRoute roles={["admin", "provider"]}>
                    <ManagementStudent />
                  </PrivateRoute>
                }
              />

              <Route
                path="providers/pending"
                element={
                  <PrivateRoute roles={["admin"]}>
                    <ManagementRegisterProvider />
                  </PrivateRoute>
                }
              />

              {/* Provider */}
              <Route
                path="course"
                element={
                  <PrivateRoute roles={["provider"]}>
                    <ManagementCourse />
                  </PrivateRoute>
                }
              />

              <Route
                path="course/:_id"
                element={
                  <PrivateRoute roles={["admin", "provider"]}>
                    <BoxShowDetailCourse />
                  </PrivateRoute>
                }
              />

            </Route>

            {/* ================= LEARNING ================= */}
            <Route
              path="/learning/:_id"
              element={
                <PrivateRoute>
                  <LearningPage />
                </PrivateRoute>
              }
            />

            {/* ================= OTHER ================= */}
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);