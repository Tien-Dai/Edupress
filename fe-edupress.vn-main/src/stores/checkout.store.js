import { create } from "zustand";

const STORAGE_KEY = "edupress_checkouts";

const getCheckouts = () => {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const saveCheckouts = (checkouts) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(checkouts));
};

export const useCheckoutStore = create((set, get) => ({
  checkoutList: [],
  currentCheckout: null,
  loading: false,
  error: null,

  // =========================
  // CREATE CHECKOUT
  // =========================
  createCheckout: async (payload) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const checkouts = getCheckouts();

      const newCheckout = {
        _id: `checkout_${Date.now()}`,
        ...payload,
        status: "pending",
        created_at: new Date().toISOString(),
      };

      const newList = [...checkouts, newCheckout];

      saveCheckouts(newList);

      set({
        checkoutList: newList,
        currentCheckout: newCheckout,
        loading: false,
      });

      return newCheckout;
    } catch (error) {
      console.error("CREATE CHECKOUT ERROR:", error);

      set({
        loading: false,
        error: "CREATE_CHECKOUT_FAILED",
      });

      return null;
    }
  },

  // =========================
  // FETCH CHECKOUT BY TOKEN
  // =========================
  fetchCheckoutByToken: async (token) => {
    if (!token) return null;

    set({
      loading: true,
      error: null,
    });

    try {
      const checkouts = getCheckouts();

      const checkout =
        checkouts.find((item) => item.token === token) || null;

      if (!checkout) {
        set({
          currentCheckout: null,
          loading: false,
          error: "CHECKOUT_NOT_FOUND",
        });

        return null;
      }

      set({
        checkoutList: checkouts,
        currentCheckout: checkout,
        loading: false,
      });

      return checkout;
    } catch (error) {
      console.error("FETCH CHECKOUT ERROR:", error);

      set({
        currentCheckout: null,
        loading: false,
        error: "FETCH_CHECKOUT_FAILED",
      });

      return null;
    }
  },

  // =========================
  // MARK CHECKOUT PAID
  // =========================
  markCheckoutPaid: async (checkoutId) => {
    if (!checkoutId) return false;

    try {
      const checkouts = getCheckouts();

      const newList = checkouts.map((item) =>
        item._id === checkoutId
          ? {
              ...item,
              status: "paid",
              paid_at: new Date().toISOString(),
            }
          : item
      );

      saveCheckouts(newList);

      const updatedCheckout =
        newList.find((item) => item._id === checkoutId) || null;

      set({
        checkoutList: newList,
        currentCheckout: updatedCheckout,
      });

      return true;
    } catch (error) {
      console.error("MARK CHECKOUT PAID ERROR:", error);
      return false;
    }
  },

  // =========================
  // CANCEL CHECKOUT
  // =========================
  cancelCheckout: async (checkoutId) => {
    if (!checkoutId) return false;

    try {
      const checkouts = getCheckouts();

      const newList = checkouts.map((item) =>
        item._id === checkoutId
          ? {
              ...item,
              status: "cancelled",
              cancelled_at: new Date().toISOString(),
            }
          : item
      );

      saveCheckouts(newList);

      const updatedCheckout =
        newList.find((item) => item._id === checkoutId) || null;

      set({
        checkoutList: newList,
        currentCheckout: updatedCheckout,
      });

      return true;
    } catch (error) {
      console.error("CANCEL CHECKOUT ERROR:", error);
      return false;
    }
  },

  clearCurrentCheckout: () => {
    set({
      currentCheckout: null,
      error: null,
    });
  },
}));