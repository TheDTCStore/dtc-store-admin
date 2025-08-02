import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
    Table, 
    TableHeader, 
    TableBody, 
    TableHead, 
    TableRow, 
    TableCell 
} from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Tags, FolderOpen } from "lucide-react";

export default function Categories() {
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);

    const categories = [
        {
            id: 1,
            name: "玩具",
            isActive: true,
            createdAt: "2025-07-31 07:07:27.156785",
            updatedAt: "2025-07-31 07:07:27.156785",
            productCount: 4
        },
        {
            id: 2,
            name: "数码产品",
            isActive: true,
            createdAt: "2025-07-31 07:07:27.156785",
            updatedAt: "2025-07-31 07:07:27.156785",
            productCount: 0
        },
        {
            id: 3,
            name: "家居用品",
            isActive: true,
            createdAt: "2025-07-31 07:07:27.156785",
            updatedAt: "2025-07-31 07:07:27.156785",
            productCount: 0
        },
        {
            id: 4,
            name: "服装",
            isActive: true,
            createdAt: "2025-07-31 07:07:27.156785",
            updatedAt: "2025-07-31 07:07:27.156785",
            productCount: 0
        }
    ];

    const filteredCategories = categories.filter(category => {
        return category.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const getStatusBadgeClass = (isActive) => {
        return isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">分类管理</h1>
                    <p className="text-gray-600">管理商品分类和层级结构</p>
                </div>
                <Button onClick={() => setShowAddModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    添加分类
                </Button>
            </div>

            {/* Search */}
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex space-x-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="搜索分类名称..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <Button variant="outline">导出分类</Button>
                </div>
            </div>

            {/* Categories Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b">
                    <h2 className="text-lg font-semibold text-gray-900">分类列表</h2>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>分类名称</TableHead>
                            <TableHead>商品数量</TableHead>
                            <TableHead>状态</TableHead>
                            <TableHead>创建时间</TableHead>
                            <TableHead>更新时间</TableHead>
                            <TableHead>操作</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCategories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>
                                    <div className="flex items-center">
                                        <FolderOpen className="w-4 h-4 text-blue-600 mr-2" />
                                        <span className="font-medium">{category.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="font-medium">{category.productCount}</span>
                                </TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(category.isActive)}`}>
                                        {category.isActive ? '启用' : '禁用'}
                                    </span>
                                </TableCell>
                                <TableCell className="text-sm text-gray-500">
                                    {formatDate(category.createdAt)}
                                </TableCell>
                                <TableCell className="text-sm text-gray-500">
                                    {formatDate(category.updatedAt)}
                                </TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button variant="ghost" size="sm">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Category Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">分类总数</p>
                            <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                        </div>
                        <Tags className="w-8 h-8 text-blue-600" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">启用分类</p>
                            <p className="text-2xl font-bold text-green-600">
                                {categories.filter(cat => cat.isActive).length}
                            </p>
                        </div>
                        <Tags className="w-8 h-8 text-green-600" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">禁用分类</p>
                            <p className="text-2xl font-bold text-red-600">
                                {categories.filter(cat => !cat.isActive).length}
                            </p>
                        </div>
                        <Tags className="w-8 h-8 text-red-600" />
                    </div>
                </div>
            </div>

            {/* Add Category Modal (placeholder) */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">添加分类</h3>
                        <p className="text-gray-600 mb-4">分类添加功能开发中...</p>
                        <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setShowAddModal(false)}>
                                取消
                            </Button>
                            <Button onClick={() => setShowAddModal(false)}>
                                确定
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 