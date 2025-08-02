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
import { Plus, Search, Edit, Trash2, Package, Eye } from "lucide-react";

export default function Products() {
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");

    const products = [
        {
            id: 1,
            name: "智能遥控车",
            category: "玩具",
            basePrice: 199.99,
            skuCount: 2,
            totalStock: 80,
            status: "在售",
            description: "可遥控操作的玩具车",
            specs: {
                "容量": "20Ah",
                "尺寸": "1200×500×980 mm",
                "材质": "铝合金"
            }
        },
        {
            id: 2,
            name: "毛绒熊",
            category: "玩具",
            basePrice: 89.99,
            skuCount: 1,
            totalStock: 100,
            status: "在售",
            description: "柔软的毛绒玩具熊",
            specs: {
                "尺寸": "30cm",
                "材质": "棉"
            }
        },
        {
            id: 3,
            name: "积木套装",
            category: "玩具",
            basePrice: 129.00,
            skuCount: 1,
            totalStock: 20,
            status: "在售",
            description: "启发孩子想象力的积木套装",
            specs: {
                "件数": "120",
                "颜色": "多彩"
            }
        },
        {
            id: 4,
            name: "电动火车",
            category: "玩具",
            basePrice: 159.50,
            skuCount: 1,
            totalStock: 15,
            status: "在售",
            description: "仿真电动火车模型",
            specs: {
                "声音": "有",
                "轨道长度": "2米"
            }
        }
    ];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const getStatusBadgeClass = (status) => {
        return status === '在售' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800';
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">商品管理</h1>
                    <p className="text-gray-600">管理您的商品库存和价格</p>
                </div>
                <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    添加商品
                </Button>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="搜索商品名称或描述..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">全部分类</option>
                            <option value="玩具">玩具</option>
                            <option value="电子产品">电子产品</option>
                            <option value="服装">服装</option>
                        </select>
                        <Button variant="outline">导出商品</Button>
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b">
                    <h2 className="text-lg font-semibold text-gray-900">商品列表</h2>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>商品信息</TableHead>
                            <TableHead>分类</TableHead>
                            <TableHead>基础价格</TableHead>
                            <TableHead>SKU数量</TableHead>
                            <TableHead>总库存</TableHead>
                            <TableHead>状态</TableHead>
                            <TableHead>操作</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProducts.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <div>
                                        <div className="font-medium">{product.name}</div>
                                        <div className="text-sm text-gray-500">{product.description}</div>
                                        <div className="text-xs text-gray-400 mt-1">
                                            {Object.entries(product.specs).slice(0, 2).map(([key, value]) => (
                                                <span key={key} className="mr-2">{key}: {value}</span>
                                            ))}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell className="font-medium">¥{product.basePrice}</TableCell>
                                <TableCell>{product.skuCount}</TableCell>
                                <TableCell>{product.totalStock}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(product.status)}`}>
                                        {product.status}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button variant="ghost" size="sm">
                                            <Eye className="w-4 h-4" />
                                        </Button>
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

            {/* Product Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">商品总数</p>
                            <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                        </div>
                        <Package className="w-8 h-8 text-blue-600" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">在售商品</p>
                            <p className="text-2xl font-bold text-green-600">
                                {products.filter(p => p.status === '在售').length}
                            </p>
                        </div>
                        <Package className="w-8 h-8 text-green-600" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">总SKU数</p>
                            <p className="text-2xl font-bold text-purple-600">
                                {products.reduce((sum, p) => sum + p.skuCount, 0)}
                            </p>
                        </div>
                        <Package className="w-8 h-8 text-purple-600" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">总库存</p>
                            <p className="text-2xl font-bold text-orange-600">
                                {products.reduce((sum, p) => sum + p.totalStock, 0)}
                            </p>
                        </div>
                        <Package className="w-8 h-8 text-orange-600" />
                    </div>
                </div>
            </div>
        </div>
    );
} 