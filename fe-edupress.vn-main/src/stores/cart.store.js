import { create } from "zustand";
import axios from "axios";

const API_KEY = "6957348a9dda81df11d0c527";

const CART_API =
  `https://mindx-mockup-server.vercel.app/api/resources/cart?apiKey=${API_KEY}`;

const cartUrl = (id) =>
  `https://mindx-mockup-server.vercel.app/api/resources/cart/${id}?apiKey=${API_KEY}`;

export const useCartStore = create((set, get) => ({
  cart: null,
  cartUI: [],
  loading: false,
  hasFetchedCart: false,
  error: null,

  // ==========================================
  // FETCH CART THEO USER
  // ==========================================
  fetchCart: async (userId) => {
    if (!userId) {
      set({
        cart: null,
        cartUI: [],
        hasFetchedCart: true,
        loading: false,
      });

      return null;
    }

    set({
      loading: true,
      error: null,
    });

    try {
      const res = await axios.get(
        `${CART_API}&_t=${Date.now()}`
      );

      const carts = res.data?.data?.data || [];

      const activeCart =
        carts.find(
          (cart) =>
            String(cart.user_id) === String(userId) &&
            cart.status === "active"
        ) || null;

      set({
        cart: activeCart,
        cartUI: activeCart?.courses || [],
        hasFetchedCart: true,
        loading: false,
      });

      return activeCart;
    } catch (error) {
      console.error("FETCH CART ERROR:", error);

      set({
        cart: null,
        cartUI: [],
        hasFetchedCart: true,
        loading: false,
        error: "Không thể tải giỏ hàng",
      });

      return null;
    }
  },

  // ==========================================
  // ADD TO CART
  // ==========================================
  addToCart: async (courseItem, userId) => {
    if (!userId || !courseItem?.course_id) {
      return false;
    }

    const { cart, cartUI } = get();

    const currentCourses = Array.isArray(cartUI)
      ? cartUI
      : [];

    // Kiểm tra khóa học đã có trong giỏ chưa
    const alreadyExists = currentCourses.some(
      (course) =>
        String(course.course_id) ===
        String(courseItem.course_id)
    );

    if (alreadyExists) {
      return false;
    }

    const newCourses = [
      ...currentCourses,
      courseItem,
    ];

    // Lưu dữ liệu cũ để rollback nếu API lỗi
    const oldCart = cart;
    const oldCartUI = currentCourses;

    // Optimistic update
    set({
      cartUI: newCourses,

      cart: cart
        ? {
            ...cart,
            courses: newCourses,
          }
        : {
            user_id: userId,
            status: "active",
            courses: newCourses,
          },

      error: null,
    });

    const payload = {
      user_id: userId,
      status: "active",
      courses: newCourses,
    };

    try {
      // Chưa có cart -> tạo mới
      if (!cart?._id) {
        const res = await axios.post(
          CART_API,
          {
            name: `cart-user-${userId}`,
            ...payload,
          }
        );

        const createdCart =
          res.data?.data || null;

        set({
          cart: createdCart
            ? createdCart
            : {
                ...payload,
                courses: newCourses,
              },

          cartUI: newCourses,
        });
      }

      // Đã có cart -> cập nhật
      else {
        await axios.put(
          cartUrl(cart._id),
          {
            name:
              cart.name ||
              `cart-user-${userId}`,

            ...payload,
          }
        );

        set({
          cart: {
            ...cart,
            ...payload,
          },

          cartUI: newCourses,
        });
      }

      return true;
    } catch (error) {
      console.error(
        "ADD TO CART ERROR:",
        error
      );

      // Rollback
      set({
        cart: oldCart,
        cartUI: oldCartUI,
        error: "Không thể thêm khóa học vào giỏ hàng",
      });

      return false;
    }
  },

  // ==========================================
  // REMOVE COURSE FROM CART
  // ==========================================
  removeFromCart: async (courseId) => {
    const {
      cart,
      cartUI,
    } = get();

    if (!cart?._id) {
      return false;
    }

    const currentCourses =
      Array.isArray(cartUI)
        ? cartUI
        : cart.courses || [];

    const newCourses =
      currentCourses.filter(
        (course) =>
          String(course.course_id) !==
          String(courseId)
      );

    const oldCart = cart;
    const oldCartUI = currentCourses;

    // Optimistic update
    set({
      cart: {
        ...cart,
        courses: newCourses,
      },

      cartUI: newCourses,
      error: null,
    });

    try {
      await axios.put(
        cartUrl(cart._id),
        {
          name:
            cart.name ||
            `cart-user-${cart.user_id}`,

          user_id: cart.user_id,
          status: "active",
          courses: newCourses,
        }
      );

      return true;
    } catch (error) {
      console.error(
        "REMOVE FROM CART ERROR:",
        error
      );

      // Rollback
      set({
        cart: oldCart,
        cartUI: oldCartUI,
        error: "Không thể xóa khóa học khỏi giỏ hàng",
      });

      return false;
    }
  },

  // ==========================================
  // UPDATE CART SAU KHI THANH TOÁN
  // ==========================================
  updateCartAfterPayment: async (cartId) => {
    if (!cartId) {
      return false;
    }

    const { cart } = get();

    try {
      await axios.put(
        cartUrl(cartId),
        {
          name:
            cart?.name ||
            `cart-user-${cart?.user_id || ""}`,

          user_id:
            cart?.user_id || "",

          status: "inactive",

          courses: [],
        }
      );

      set({
        cart: null,
        cartUI: [],
        hasFetchedCart: true,
        error: null,
      });

      return true;
    } catch (error) {
      console.error(
        "UPDATE CART AFTER PAYMENT ERROR:",
        error
      );

      set({
        error:
          "Không thể cập nhật giỏ hàng sau thanh toán",
      });

      return false;
    }
  },


  isCourseInCart: (courseId) => {
    const { cartUI } = get();

    if (!Array.isArray(cartUI)) {
      return false;
    }

    return cartUI.some(
      (course) =>
        String(course.course_id) ===
        String(courseId)
    );
  },

  // ==========================================
  // CLEAR CART UI
  // ==========================================
  clearCartUI: () => {
    set({
      cart: null,
      cartUI: [],
      hasFetchedCart: true,
      error: null,
    });
  },

  // ==========================================
  // CLEAR CART
  // ==========================================
  clearCart: () => {
    set({
      cart: null,
      cartUI: [],
      hasFetchedCart: false,
      error: null,
    });
  },
}));