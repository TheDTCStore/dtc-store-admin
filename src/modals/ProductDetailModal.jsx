import React, { useEffect, useState } from "react";
import {
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useModal } from "@/context/ModalContext";
import { toast } from "sonner";
import { productModify, deleteProduct, productCategories } from "@/api";

export default function ProductDetailModal({ product }) {
    const { hideModal } = useModal();
    const [isEditing, setIsEditing] = useState(false);
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        name: product.name,
        description: product.description,
        category_id: product.category_id,
        is_active: product.is_active,
    });
    const [originalData, setOriginalData] = useState({ ...formData });
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await productCategories();
                setCategories(res || []);
            } catch {
                toast.error("无法加载分类列表");
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const changed =
            formData.name.trim() !== originalData.name.trim() ||
            formData.description.trim() !== originalData.description.trim() ||
            formData.category_id !== originalData.category_id ||
            formData.is_active !== originalData.is_active;
        setIsChanged(changed);
    }, [formData, originalData]);

    const handleChange = (field) => (e) => {
        const value = field === "is_active" ? e.target.checked : e.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleCategoryChange = (value) => {
        setFormData((prev) => ({ ...prev, category_id: Number(value) }));
    };

    const onEdit = () => {
        setIsEditing(true);
    };

    const onDelete = async () => {
        if (!confirm(`确定要删除商品 "${product.name}" 吗？`)) return;
        try {
            await deleteProduct({ id: product.id });
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
            await productModify({
                id: product.id,
                name: formData.name.trim(),
                description: formData.description.trim(),
                category_id: formData.category_id,
                is_active: formData.is_active,
            });
            toast.success("更新成功");
            hideModal();
            window.location.reload();
        } catch (err) {
            toast.error("更新失败：" + (err?.message || "未知错误"));
        }
    };

    return (
        <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
            <DialogHeader>
                <DialogTitle>商品详情</DialogTitle>
                <DialogDescription>查看并编辑商品信息</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 text-sm text-gray-700">
                {/* 商品名称 */}
                <div>
                    <p className="font-medium text-muted-foreground">商品名称</p>
                    {isEditing ? (
                        <Input value={formData.name} onChange={handleChange("name")} />
                    ) : (
                        <p>{product.name}</p>
                    )}
                </div>
                <Separator />

                {/* 商品描述 */}
                <div>
                    <p className="font-medium text-muted-foreground">商品描述</p>
                    {isEditing ? (
                        <Input value={formData.description} onChange={handleChange("description")} />
                    ) : (
                        <p>{product.description}</p>
                    )}
                </div>
                <Separator />

                {/* 商品分类 */}
                <div>
                    <p className="font-medium text-muted-foreground">商品分类</p>
                    {isEditing ? (
                        <Select value={formData.category_id?.toString()} onValueChange={handleCategoryChange}>
                            <SelectTrigger className="h-10 w-full text-sm">
                                <SelectValue placeholder="请选择分类" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.id.toString()}>
                                        {cat.id}.{cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ) : (
                        <p>
                            {
                                categories.find((c) => c.id === product.category_id)?.name || `ID: ${product.category_id}`
                            }
                        </p>
                    )}
                </div>
                <Separator />

                {/* 是否启用 */}
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
                        <p>{product.is_active ? "启用" : "禁用"}</p>
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
                                setFormData({ ...originalData });
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
