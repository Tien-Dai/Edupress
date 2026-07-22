import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import FloatingButtons from "../components/buttons/FloatingButtons";


const CustomerLayout = () =>{
    return (
        <div>
            <Header />
                <Outlet />
            <Footer />
            <FloatingButtons />
        </div>
    );
}

export default CustomerLayout;