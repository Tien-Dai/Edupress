
import BoxResult from "./BoxResult/BoxResult";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartStore } from "../../stores/cart.store";
import { useCheckoutStore } from "../../stores/checkout.store";


const ScanPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [isStatus, setIsStatus] = useState("loading");
    const { updateCartAfterPayment  } = useCartStore();
    const {  fetchCheckoutByToken,  markCheckoutPaid } = useCheckoutStore();

    useEffect(() => {
        if (!token) return;

        const handleScan = async () => {
            setIsStatus("loading");

            const checkout = await fetchCheckoutByToken(token);

            if (!checkout) {
                setIsStatus("invalid");
                return;
            }

            if (checkout.status === "paid") {
                setIsStatus("already_paid");
                return;
            }

            if (checkout.status !== "pending") {
                setIsStatus("invalid");
                return;
            }

            const ok = await markCheckoutPaid(checkout._id);

            if (!ok) {
                setIsStatus("error");
                return;
            }

            // cart chỉ là side-effect
            await updateCartAfterPayment(checkout.cart_id);
            setIsStatus("success");
        };

    handleScan();
    }, [token]);



    return (
        <div className="mt-[90px]  max-w-[1080px] mx-auto">
            <div className="h-screen">
                <div className="w-full absolute top-0 left-0 h-screen flex items-center justify-center">
                    {/* <Spin fullscreen size="large" /> */}
                    <BoxResult isStatus={isStatus}  />
                </div>
            </div>
        </div>
    )
}

export default ScanPage;