import { useEffect, useMemo, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useCartStore } from "../../../stores/cart.store";
import useFetchData from "../../../api/useFetchData";
import BoxShowCartPage from "./BoxShowCartPage/BoxShowCartPage";
import BoxCheckoutPage from "./BoxCheckoutPage/BoxCheckoutPage";


const CartPage = () => {
    const { user } = useAuth();
    const { cart, loading: cartLoading, fetchCart} = useCartStore();
    const { data: provider } = useFetchData("providers");

    /* ================= FETCH CART ================= */
   

    const [showSpin, setShowSpin] = useState(true);
    const isLoading = cartLoading ;
    useEffect(() => {
        if (!isLoading) {
            const t = setTimeout(() => setShowSpin(false), 400);
            return () => clearTimeout(t);
        } else {
            setShowSpin(true);
        }
    }, [isLoading]);

    // Loading
    // const isReady = course !== null && !isLoading;

    useEffect(() => {
        if (user?._id) {
            fetchCart(user._id);
        }
    }, [user?._id]);
    
    
    const showCart = useMemo(() => {
        if (!cart?.courses) return [];

        return cart.courses.map(item => ({
            course_id: item.course_id,
            course_title: item.course_title,
            price: item.price,
            image_url: item.image_url,
            total_lectures: item.total_lectures
        }));
    }, [cart]);

    return (
        <div className="mt-[45px] lg:mt-[50px] max-w-[1080px] mx-auto px-[15px] lg:px-0">
            <div className=" bg-gray-50 pt-8">
                <div className="max-w-[1080px] mx-auto ">
                    <h1 className="text-[#000000] text-[16px] md:text-[22px] lg:text-[26px] font-bold mb-3">🛒 Giỏ hàng</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* LEFT */}
                            <div className="lg:col-span-2 space-y-4 ">
                                <BoxShowCartPage
                                    showSpin={showSpin}
                                    showCart={showCart}
                                    user={user}
                                    provider={provider}
                                />
                            </div>

                        {/* RIGHT */}
                            <BoxCheckoutPage 
                                showCart={showCart}
                                cart={cart}
                            />
                    </div>
                </div>
            </div>
        </div>
        );

}

export default CartPage;