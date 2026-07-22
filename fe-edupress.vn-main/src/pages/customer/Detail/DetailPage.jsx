import { memo, useMemo, useState } from "react";
import { useParams } from "react-router";

import Breadcrumb from "../../../components/Breadcrumb";
import BoxShowInfo from "./BoxShowInfo/BoxShowInfo";
import BoxShowTabsCourse from "./BoxShowTabsCourse/BoxShowTabsCourse";
import BoxCourseInfoCard from "./BoxShowInfo/BoxCourseInfoCard";
import BoxShowCourseRelated from "./BoxShowCourseRelated/BoxShowCourseRelated";

import useFetchCourseDetail from "../../../hooks/useCourse/useFetchCourseDetail";
import useFetchData from "../../../api/useFetchData";

import { useStickyObserver } from "../../../hooks/useStickyObserver";
import { useCartStore } from "../../../stores/cart.store";
import useAuth from "../../../hooks/useAuth";

// =========================
// Sticky Card
// =========================
const StickyCard = memo(
  ({ show, showList, handleAddToCart, adding, isPurchased }) => {
    if (!show) return null;

    return (
      <div className="lg:sticky lg:top-[100px] transform transition-all duration-300">
        <BoxCourseInfoCard
          showList={showList}
          handleAddToCart={handleAddToCart}
          adding={adding}
          isPurchased={isPurchased}
        />
      </div>
    );
  }
);

const DetailPage = () => {
  const [showStickyCard, setShowStickyCard] = useState(false);
  const [adding, setAdding] = useState(false);

  const { _id } = useParams();

  // =========================
  // Lấy chi tiết khóa học
  // =========================
  const {
    data,
    isLoading,
    error,
  } = useFetchCourseDetail(_id);

  const showList = data?.course || null;

  // =========================
  // Lấy tất cả khóa học (để hiển thị related)
  // =========================
  const { data: courses = [] } = useFetchData("courses");

  // =========================
  // Lấy provider
  // =========================
  const { data: providers = [] } = useFetchData("providers");

  // =========================
  // Cart
  // =========================
  const { cart, addToCart } = useCartStore();

  // =========================
  // User
  // =========================
  const { user, isAuthenticated } = useAuth();

  // =========================
  // Checkout
  // =========================
  const { data: checkoutList = [] } = useFetchData("checkout");

  // =========================
  // Sticky
  // =========================
  useStickyObserver(setShowStickyCard);

  // =========================
  // Đã mua chưa
  // =========================
  const isPurchased = useMemo(() => {
    if (!checkoutList || !user || !showList) return false;

    return checkoutList.some(
      (order) =>
        order.user_id === user._id &&
        order.status === "paid" &&
        order.courses.some((c) => c.course_id === showList._id)
    );
  }, [checkoutList, user, showList]);

  if (isLoading) {
    return (
      <div className="mt-20 text-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 text-center text-red-500">
        {error.message}
      </div>
    );
  }

  if (!showList) {
    return (
      <div className="mt-20 text-center">
        Không tìm thấy khóa học
      </div>
    );
  }

  return (
    <div className="mt-[65px] lg:mt-[60px]">

      <Breadcrumb
        nameCate="Chi tiết khóa học"
        showList={showList}
      />

      <BoxShowInfo
        showStickyCard={showStickyCard}
        showList={showList}
        loading={isLoading}
        addToCart={addToCart}
        cart={cart}
        adding={adding}
        setAdding={setAdding}
        user={user}
        isAuthenticated={isAuthenticated}
        isPurchased={isPurchased}
      />

      <div
        className="
          max-w-[1080px]
          mx-auto
          grid
          gap-8
          py-10
          grid-cols-1
          lg:grid-cols-[2fr_1fr]
          px-[15px]
          lg:px-0
        "
      >
        <div className="min-w-0 flex flex-col gap-10">

          <BoxShowTabsCourse
            showList={data}
            loading={isLoading}
          />

          <BoxShowCourseRelated
            courses={courses}
            currentCourses={showList}
            providers={providers}
          />

        </div>

        <div className="hidden lg:block min-w-0">
          <StickyCard
            show={showStickyCard}
            showList={showList}
            handleAddToCart={addToCart}
            adding={adding}
            isPurchased={isPurchased}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;