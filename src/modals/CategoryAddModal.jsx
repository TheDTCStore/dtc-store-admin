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
import { addCategory } from "@/api";
import { useModal } from "@/context/ModalContext";
import { toast } from "sonner";

export default function CategoryAddModal() {
    const [formData, setFormData] = useState({
        name: "",
        is_active: true,
    });
    const [isChanged, setIsChanged] = useState(false);
    const { hideModal } = useModal();

    useEffect(() => {
        setIsChanged(formData.name.trim() !== "");
    }, [formData]);

    const handleChange = (field) => (e) => {
        const value = field === "is_active" ? e.target.checked : e.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const onSave = async () => {
        if (!isChanged) return;
        try {
            await addCategory({
                name: formData.name.trim(),
                is_active: formData.is_active,
            });
            toast.success("新增分类成功");
            hideModal();
            window.location.reload();
        } catch (error) {
            toast.error("新增分类失败：" + (error?.message || "未知错误"));
        }
    };

    return (
        <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
            <DialogHeader>
                <DialogTitle>新增分类</DialogTitle>
                <DialogDescription>填写商品分类信息</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 text-sm text-gray-700">
                <div>
                    <p className="font-medium text-muted-foreground">分类名称</p>
                    <Input value={formData.name} onChange={handleChange("name")} placeholder="请输入分类名称" />
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
                        <span>{formData.is_active ? "启用" : "禁用"}</span>
                    </label>
                </div>
            </div>

            <DialogFooter className="pt-4 space-x-2">
                <Button
                    onClick={onSave}
                    disabled={!isChanged}
                    className={!isChanged ? "opacity-50 cursor-not-allowed" : ""}
                >
                    保存
                </Button>
                <Button variant="secondary" onClick={() => hideModal()}>
                    取消
                </Button>
            </DialogFooter>
        </DialogContent>
    );
}
