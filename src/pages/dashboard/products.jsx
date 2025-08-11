import React, { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useModal } from "@/context/ModalContext";
import { productCategories, productList } from "@/api";
import { useNavigate } from "react-router";
import ProductAddModal from "@/modals/ProductAddModal"
import ProductDetailModal from "@/modals/ProductDetailModal"

export default function Products() {
    const [products, setProducts] = useState([]);
    const [options, setOptions] = useState([]);
    const [selectOption, setSelectOption] = useState(-1);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const { showModal } = useModal();
    const navigate = useNavigate();

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await productList({ keyword: searchTerm, category_id: selectOption, page, page_size: pageSize });
            setProducts(data.result);
            setTotal(data.total);
        } catch (error) {
            console.error("加载商品失败:", error);
        }
        setLoading(false);
    };
    const fetchCategories = async () => {
        try {
            const data = await productCategories();
            setOptions(data)
        } catch (error) {
            console.error("加载商品失败:", error);
        }
    }


    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    const getStatusBadgeClass = (status) => {
        return status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    };

    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">商品管理</h1>
                    <p className="text-gray-600">管理您的商品库存和价格</p>
                </div>
                <Button onClick={() => showModal(ProductAddModal)}>
                    <Plus className="w-4 h-4 mr-2" />
                    添加商品
                </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1 relative w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            type="text"
                            placeholder="搜索商品名称或描述..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex gap-2 items-center">
                        <Select value={selectOption?.toString()} onValueChange={(value) => setSelectOption(Number(value))}>
                            <SelectTrigger className="h-10 px-4 text-sm w-[150px]">
                                <SelectValue placeholder="选择分类" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem key={-1} value="-1">全部</SelectItem>
                                {options.map((option) => (
                                    <SelectItem key={option.id} value={option.id.toString()}>
                                        {option.id}.{option.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Button
                            variant="outline"
                            onClick={fetchProducts}
                            className="h-9 px-4 text-sm flex items-center gap-2 w-[100px]"
                        >
                            <Search className="w-4 h-4" />
                            搜索
                        </Button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b">
                    <h2 className="text-lg font-semibold text-gray-900">商品列表</h2>
                </div>

                {loading ? (
                    <div className="p-6 text-center text-gray-500">加载中...</div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-center">商品名称</TableHead>
                                        <TableHead className="text-center">描述</TableHead>
                                        <TableHead className="text-center">分类</TableHead>
                                        <TableHead className="text-center">状态</TableHead>
                                        <TableHead className="text-center">创建时间</TableHead>
                                        <TableHead className="text-center">更新时间</TableHead>
                                        <TableHead className="text-center">操作</TableHead>
                                        <TableHead className="text-center">更多</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {products.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell className="text-center">{product.name}</TableCell>
                                            <TableCell className="max-w-[200px] truncate text-gray-500 text-center">{product.description}</TableCell>
                                            <TableCell className="text-center">{product.category_id}</TableCell>
                                            <TableCell className="text-center">
                                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(product.is_active)}`}>
                                                    {product.is_active ? "在售" : "下架"}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center">{new Date(product.created_at).toLocaleString()}</TableCell>
                                            <TableCell className="text-center">{new Date(product.updated_at).toLocaleString()}</TableCell>
                                            <TableCell className="text-center">
                                                <button
                                                    className="text-blue-600 hover:underline text-sm"
                                                    onClick={() => showModal(ProductDetailModal, { product })}
                                                >
                                                    修改
                                                </button>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <button
                                                    className="text-red-600 hover:underline text-sm"
                                                    onClick={() => navigate("/product", { state: { product } })}
                                                >
                                                    详情
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex justify-end mt-4 px-4">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                <span>每页</span>
                                <Select
                                    value={pageSize.toString()}
                                    onValueChange={(value) => {
                                        setPageSize(Number(value));
                                        setPage(1);
                                    }}
                                >
                                    <SelectTrigger className="w-20 h-8">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[10, 20, 50, 100].map((size) => (
                                            <SelectItem key={size} value={size.toString()}>
                                                {size}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <span>条</span>

                                <span className="ml-4">第</span>
                                <Input
                                    type="number"
                                    value={page}
                                    min={1}
                                    max={totalPages}
                                    onChange={(e) => {
                                        const val = Number(e.target.value);
                                        if (val >= 1 && val <= totalPages) {
                                            setPage(val);
                                        }
                                    }}
                                    className="w-16 h-8 text-center"
                                />
                                <span>页 / 共 {totalPages} 页</span>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        if (page < totalPages) {
                                            setPage(page + 1);
                                        }
                                    }}
                                    disabled={page >= totalPages}
                                >
                                    下一页
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
