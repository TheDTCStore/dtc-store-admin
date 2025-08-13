import React, { useEffect, useState } from "react";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useModal } from "@/context/ModalContext";
import { toast } from "sonner";
import { productAdd, productCategories } from "@/api";

export default function ProductAddModal() {
    const { hideModal } = useModal();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category_id: null,
        base_price: "",
        is_active: true,
    });
    const [categories, setCategories] = useState([]);
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        setIsChanged(
            formData.name.trim() !== "" &&
            formData.description.trim() !== "" &&
            formData.category_id !== null &&
            formData.base_price.trim() !== "" && !isNaN(Number(formData.base_price))
        );
    }, [formData]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await productCategories();
                setCategories(data || []);
            } catch {
                toast.error("无法加载分类列表");
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (field) => (e) => {
        const value = field === "is_active" ? e.target.checked : e.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleCategoryChange = (value) => {
        setFormData((prev) => ({ ...prev, category_id: Number(value) }));
    };

    const onSave = async () => {
        if (!isChanged) return;

        try {
            await productAdd({
                name: formData.name.trim(),
                description: formData.description.trim(),
                category_id: formData.category_id,
                base_price: parseFloat(formData.base_price), // 传 float
                is_active: formData.is_active,
            });
            toast.success("新增商品成功");
            hideModal();
            window.location.reload();
        } catch (error) {
            toast.error("新增失败：" + (error?.message || "未知错误"));
        }
    };

    return (
        <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
            <DialogHeader>
                <DialogTitle>新增商品</DialogTitle>
                <DialogDescription>填写商品的详细信息</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 text-sm text-gray-700">
                <div>
                    <p className="font-medium text-muted-foreground">商品名称</p>
                    <Input value={formData.name} onChange={handleChange("name")} placeholder="请输入商品名称" />
                </div>
                <Separator />
                <div>
                    <p className="font-medium text-muted-foreground">商品描述</p>
                    <Input value={formData.description} onChange={handleChange("description")} placeholder="请输入描述" />
                </div>
                <Separator />
                <div>
                    <p className="font-medium text-muted-foreground">商品分类</p>
                    <Select onValueChange={handleCategoryChange}>
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
                </div>
                <Separator />
                {/* 新增 base_price 输入框 */}
                <div>
                    <p className="font-medium text-muted-foreground">基础价格</p>
                    <Input
                        type="number"
                        step="0.0"
                        min="0"
                        value={formData.base_price}
                        onChange={handleChange("base_price")}
                        placeholder="请输入基础价格"
                    />
                </div>
                <Separator />
                <div>
                    <p className="font-medium text-muted-foreground">是否启用</p>
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
                <Button variant="secondary" onClick={hideModal}>
                    取消
                </Button>
            </DialogFooter>
        </DialogContent>
    );
}
