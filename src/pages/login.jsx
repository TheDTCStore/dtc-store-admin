import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { authLogin } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await authLogin(username.trim(), password.trim());
            toast.success("登录成功");
            navigate("/");
        } catch (err) {
            toast.error(err.message || "登录失败");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm p-6 bg-white rounded-md shadow-md space-y-6"
            >
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">DTC-STORE管理后台</h1>
                </div>
                <div>
                    <label className="block mb-1 font-medium">用户名</label>
                    <Input
                        type="text"
                        placeholder="请输入用户名"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">密码</label>
                    <Input
                        type="password"
                        placeholder="请输入密码"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "登录中..." : "登录"}
                </Button>
            </form>
        </div>
    );
}