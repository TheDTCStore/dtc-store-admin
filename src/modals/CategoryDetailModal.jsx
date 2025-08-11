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
import { deleteCategory, modifyCategory } from "@/api";
import { useModal } from "@/context/ModalContext";
import { toast } from "sonner";

export default function CategoryDetailModal({ category }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: category.name,
        is_active: category.is_active,
    });
    const [originalData, setOriginalData] = useState({
        name: category.name,
        is_active: category.is_active,
    });
    const [isChanged, setIsChanged] = useState(false);
    const { hideModal } = useModal();

    useEffect(() => {
        const changed =
            formData.name.trim() !== originalData.name.trim() ||
            formData.is_active !== originalData.is_active;
        setIsChanged(changed);
    }, [formData, originalData]);

    const onEdit = () => {
        setIsEditing(true);
    };

    const onDelete = async () => {
        if (!confirm(`确定要删除分类 "${category.name}" 吗？`)) return;
        try {
            await deleteCategory(category.id);
            toast.success("删除成功");
            hideModal();
            window.location.reload();
        } catch (err) {
            toast.error("删除失败：" + (err?.message || "未知错误"));
        }
    };

    const onSave = async () => {
        if (!isChanged) return;
        try {
            await modifyCategory({
                id: category.id,
                name: formData.name.trim(),
                is_active: formData.is_active,
            });
            toast.success("更新成功");
            hideModal();
            window.location.reload();
        } catch (err) {
            toast.error("更新失败：" + (err?.message || "未知错误"));
        }
    };

    const handleChange = (field) => (e) => {
        const value = field === "is_active" ? e.target.checked : e.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
            <DialogHeader>
                <DialogTitle>分类详情</DialogTitle>
                <DialogDescription>查看并编辑商品分类信息</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 text-sm text-gray-700">
                <div>
                    <p className="font-medium text-muted-foreground">分类名称</p>
                    {isEditing ? (
                        <Input value={formData.name} onChange={handleChange("name")} />
                    ) : (
                        <p>{category.name}</p>
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
                            <span>{formData.is_active ? "启用" : "禁用"}</span>
                        </label>
                    ) : (
                        <p>{category.is_active ? "启用" : "禁用"}</p>
                    )}
                </div>
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
                            disabled={!isChanged}
                            className={!isChanged ? "opacity-50 cursor-not-allowed" : ""}
                        >
                            保存
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setFormData({
                                    name: originalData.name,
                                    is_active: originalData.is_active,
                                });
                                setIsEditing(false);
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
