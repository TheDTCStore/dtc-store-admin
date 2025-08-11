import React, { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { adminList } from "@/api";
import { useModal } from "@/context/ModalContext";
import AdminDetailModal from "@/modals/AdminDetailModal";
import AdminAddModal from "@/modals/AdminAddModal";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Users() {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const { showModal } = useModal();

    const fetchAdmins = async () => {
        setLoading(true);
        try {
            const data = await adminList({ page, page_size: pageSize });
            setAdmins(data.result);
            setTotal(data.total);
        } catch (err) {
            console.error("加载管理员失败:", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAdmins();
    }, [page, pageSize]);

    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">用户管理</h1>
                    <p className="text-gray-600">管理您的用户账户和权限</p>
                </div>
                <Button onClick={() => showModal(AdminAddModal)}>
                    <Plus className="w-4 h-4 mr-2" />
                    添加管理员
                </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">管理员列表</h2>
                {loading ? (
                    <p className="text-gray-500">加载中...</p>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <Table className="mx-auto text-center">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-center">用户名</TableHead>
                                        <TableHead className="text-center">角色</TableHead>
                                        <TableHead className="text-center">状态</TableHead>
                                        <TableHead className="text-center">创建时间</TableHead>
                                        <TableHead className="text-center">更新时间</TableHead>
                                        <TableHead className="text-center">操作</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {admins.map((admin) => (
                                        <TableRow key={admin.id}>
                                            <TableCell className="text-center">{admin.username}</TableCell>
                                            <TableCell className="text-center">{admin.role}</TableCell>
                                            <TableCell className="text-center">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${admin.is_active
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-200 text-gray-600"
                                                        }`}
                                                >
                                                    {admin.is_active ? "活跃" : "禁用"}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {new Date(admin.created_at).toLocaleString(undefined, {
                                                    year: "numeric",
                                                    month: "2-digit",
                                                    day: "2-digit",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {new Date(admin.updated_at).toLocaleString(undefined, {
                                                    year: "numeric",
                                                    month: "2-digit",
                                                    day: "2-digit",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <button
                                                    className="text-red-600 hover:underline text-sm"
                                                    onClick={() => showModal(AdminDetailModal, { admin })}
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
