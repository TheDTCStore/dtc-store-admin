
import React, { useState, useEffect } from "react";
import {
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addAdmin } from "@/api";
import { useModal } from "@/context/ModalContext";
import { toast } from "sonner";

export default function AdminAddModal() {
    const [formData, setFormData] = useState({
        username: "",
        role: "",
        is_active: true,
        password: "",
        confirmPassword: "",
    });
    const [isChanged, setIsChanged] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const { hideModal } = useModal();

    useEffect(() => {
        const changed =
            formData.username.trim() !== "" &&
            formData.role.trim() !== "" &&
            formData.password !== "" &&
            formData.password === formData.confirmPassword;
        setIsChanged(changed);

        if (formData.password !== formData.confirmPassword) {
            setPasswordError("两次输入的密码不一致");
        } else {
            setPasswordError("");
        }
    }, [formData]);

    const handleChange = (field) => (e) => {
        const value = field === "is_active" ? e.target.checked : e.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const onSave = async () => {
        if (!isChanged) return;
        if (passwordError) return;

        try {
            await addAdmin({
                username: formData.username.trim(),
                role: formData.role.trim(),
                is_active: formData.is_active,
                password: formData.password,
            });
            toast.success("新增管理员成功");
            hideModal();
            window.location.reload();
        } catch (error) {
            toast.error("新增失败：" + (error?.message || "未知错误"));
        }
    };

    return (
        <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
            <DialogHeader>
                <DialogTitle>新增管理员</DialogTitle>
                <DialogDescription>填写管理员的详细信息</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 text-sm text-gray-700">
                <div>
                    <p className="font-medium text-muted-foreground">用户名</p>
                    <Input value={formData.username} onChange={handleChange("username")} placeholder="请输入用户名" />
                </div>
                <Separator />
                <div>
                    <p className="font-medium text-muted-foreground">角色</p>
                    <Input value={formData.role} onChange={handleChange("role")} placeholder="请输入角色" />
                </div>
                <Separator />
                <div>
                    <p className="font-medium text-muted-foreground">状态</p>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={formData.is_active}
                            onChange={handleChange("is_active")}
                        />
                        <span>{formData.is_active ? "活跃" : "禁用"}</span>
                    </label>
                </div>
                <Separator />
                <div>
                    <p className="font-medium text-muted-foreground">密码</p>
                    <Input
                        type="password"
                        value={formData.password}
                        onChange={handleChange("password")}
                        placeholder="请输入密码"
                    />
                </div>
                <div>
                    <p className="font-medium text-muted-foreground">确认密码</p>
                    <Input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange("confirmPassword")}
                        placeholder="请再次输入密码"
                    />
                    {passwordError && (
                        <p className="text-red-600 text-xs mt-1">{passwordError}</p>
                    )}
                </div>
            </div>

            <DialogFooter className="pt-4 space-x-2">
                <Button
                    onClick={onSave}
                    disabled={!isChanged || !!passwordError}
                    className={!isChanged || !!passwordError ? "opacity-50 cursor-not-allowed" : ""}
                >
                    保存
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => {
                        hideModal();
                    }}
                >
                    取消
                </Button>
            </DialogFooter>
        </DialogContent>
    );
}
