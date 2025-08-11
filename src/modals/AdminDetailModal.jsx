import React, { useEffect, useState } from "react";
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
import { deleteAdmin, modifyAdmin } from "@/api";
import { useModal } from "@/context/ModalContext";
import { useNavigate } from "react-router";

export default function AdminDetailModal({ admin, onClose }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: admin.username,
        role: admin.role,
        is_active: admin.is_active,
        password: "",
        confirmPassword: "",
    });
    const [originalData, setOriginalData] = useState({
        username: admin.username,
        role: admin.role,
        is_active: admin.is_active,
    });
    const [isChanged, setIsChanged] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const { hideModal } = useModal();
    const navigate = useNavigate();

    useEffect(() => {
        const changed =
            formData.username !== originalData.username ||
            formData.role !== originalData.role ||
            formData.is_active !== originalData.is_active ||
            (formData.password !== "" && formData.password === formData.confirmPassword);
        setIsChanged(changed);

        if (formData.password !== formData.confirmPassword) {
            setPasswordError("两次输入的密码不一致");
        } else {
            setPasswordError("");
        }
    }, [formData, originalData]);

    const onEdit = () => {
        setIsEditing(true);
    };

    const onDelete = async () => {
        if (!confirm(`确定要删除管理员 ${admin.username} 吗？`)) return;
        await deleteAdmin(admin.id);
        onClose?.();
    };

    const onSave = async () => {
        if (!isChanged) return;
        if (formData.password !== formData.confirmPassword) {
            setPasswordError("两次输入的密码不一致");
            return;
        }

        // 构造更新数据
        const updateData = {
            id: admin.id,
            username: formData.username,
            role: formData.role,
            is_active: formData.is_active,
        };

        // 仅当密码非空且两次密码相等时才传密码
        if (formData.password !== "") {
            updateData.password = formData.password;
        }

        try {
            await modifyAdmin(updateData);
            hideModal()
            window.location.reload();
        } catch (error) {
            toast.error("更新失败：" + (error?.message || "未知错误"));
        }

    };

    const handleChange = (field) => (e) => {
        const value = field === "is_active" ? e.target.checked : e.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
            <DialogHeader>
                <DialogTitle>管理员详情</DialogTitle>
                <DialogDescription>查看管理员的详细信息</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 text-sm text-gray-700">
                <div>
                    <p className="font-medium text-muted-foreground">用户名</p>
                    {isEditing ? (
                        <Input value={formData.username} onChange={handleChange("username")} />
                    ) : (
                        <p>{admin.username}</p>
                    )}
                </div>
                <Separator />
                <div>
                    <p className="font-medium text-muted-foreground">角色</p>
                    {isEditing ? (
                        <Input value={formData.role} onChange={handleChange("role")} />
                    ) : (
                        <p>{admin.role}</p>
                    )}
                </div>
                <Separator />
                <div>
                    <p className="font-medium text-muted-foreground">状态</p>
                    {isEditing ? (
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={formData.is_active}
                                onChange={handleChange("is_active")}
                            />
                            <span>{formData.is_active ? "活跃" : "禁用"}</span>
                        </label>
                    ) : (
                        <p>{admin.is_active ? "活跃" : "禁用"}</p>
                    )}
                </div>

                {isEditing && (
                    <>
                        <Separator />
                        <div>
                            <p className="font-medium text-muted-foreground">新密码</p>
                            <Input
                                type="password"
                                value={formData.password}
                                onChange={handleChange("password")}
                                placeholder="请输入新密码（留空则不修改）"
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
                    </>
                )}
            </div>
            <DialogFooter className="pt-4 space-x-2">
                {!isEditing ? (
                    <>
                        <Button variant="secondary" onClick={onEdit}>
                            编辑
                        </Button>
                        <Button variant="destructive" onClick={onDelete}>
                            删除
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            onClick={onSave}
                            disabled={!isChanged || passwordError !== ""}
                            className={!isChanged || passwordError !== "" ? "opacity-50 cursor-not-allowed" : ""}
                        >
                            保存
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setFormData({
                                    username: originalData.username,
                                    role: originalData.role,
                                    is_active: originalData.is_active,
                                    password: "",
                                    confirmPassword: "",
                                });
                                setIsEditing(false);
                                setPasswordError("");
                            }}
                        >
                            取消
                        </Button>
                    </>
                )}
            </DialogFooter>
        </DialogContent>
    );
}
