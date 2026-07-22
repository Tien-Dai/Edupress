
import { createContext, useEffect, useState } from "react";



export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        const storedUser = localStorage.getItem("user"); 
        if (storedUser) { 
        setUser(JSON.parse(storedUser)); 
        }
        setLoading(false);
    }, []);



   const login = ({ user, accessToken, refreshToken }) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setUser(user);
    };
    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
    };


    // check quyền 
    const hasRole = (role) => {
        if(!user) return false;
        return user.role === role;
    }

    // check nhiều quyền
    const hasAnyRoles = (roles) => {
        if(!user) return false;
        return roles.includes(user.role);
    }

    // Lấy chữ cái trên avatar (viết hoa)
    const getAvatarLetter = () => {
        if ( !user || !user?.username) return "?";

        return user.username
        .trim() 
        .split(" ")// tách chuỗi thành mảng
        .pop() // Lấy phần tử cuối cùng của mảng
        .charAt(0)// Lấy ký tự đầu tiên
        .toUpperCase() || "?";
    };

    return (
        <AuthContext.Provider 
            value={{
                user,
                login,
                logout,
                // !!user => (nếu user có giá trị -> true, ngược lại -> false)
                isAuthenticated: !!user,
                hasRole,
                hasAnyRoles,
                getAvatarLetter ,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );        
};

export default AuthProvider;
