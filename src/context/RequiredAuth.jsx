import { Navigate, useLocation } from "react-router";
import { jwtDecode } from "jwt-decode";
import { getToken } from "@/lib/token";

export default function RequireAuth({ children }) {
    const location = useLocation();
    const token = getToken();

    // 判断 token 是否存在和是否过期
    const isTokenValid = () => {
        if (!token) return false;
        try {
            const decoded = jwtDecode(token); // 解析 JWT
            const currentTime = Math.floor(Date.now() / 1000); // 当前时间戳（单位秒）
            return decoded.exp && decoded.exp > currentTime;
        } catch (e) {
            console.warn("JWT 解析失败:", e);
            return false;
        }
    };

    if (!isTokenValid()) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}