import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (username === "admin" && password === "123456") {
            onLogin(true);
        } else {
            alert("用户名或密码错误");
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
                <Button type="submit" className="w-full">
                    登录
                </Button>
            </form>
        </div>
    );
}