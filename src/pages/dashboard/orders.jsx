import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Eye, Package, Truck, CheckCircle, Clock } from "lucide-react";

export default function Orders() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const orders = [
        {
            id: "ORD-001",
            customer: "张三",
            phone: "138****1234",
            products: "iPhone 15 Pro x1",
            total: "¥8,999",
            status: "pending",
            statusText: "待处理",
            date: "2024-01-15 14:30",
            address: "北京市朝阳区xxx街道xxx号"
        },
        {
            id: "ORD-002",
            customer: "李四",
            phone: "139****5678",
            products: "MacBook Air M2 x1, AirPods Pro x1",
            total: "¥11,898",
            status: "shipped",
            statusText: "已发货",
            date: "2024-01-14 09:15",
            address: "上海市浦东新区xxx路xxx号"
        },
        {
            id: "ORD-003",
            customer: "王五",
            phone: "137****9012",
            products: "iPad Air x1",
            total: "¥4,799",
            status: "delivered",
            statusText: "已送达",
            date: "2024-01-13 16:45",
            address: "广州市天河区xxx大道xxx号"
        },
        {
            id: "ORD-004",
            customer: "赵六",
            phone: "136****3456",
            products: "iPhone 15 Pro x2",
            total: "¥17,998",
            status: "cancelled",
            statusText: "已取消",
            date: "2024-01-12 11:20",
            address: "深圳市南山区xxx路xxx号"
        }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <Clock className="w-4 h-4 text-yellow-600" />;
            case 'shipped':
                return <Truck className="w-4 h-4 text-blue-600" />;
            case 'delivered':
                return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'cancelled':
                return <Package className="w-4 h-4 text-red-600" />;
            default:
                return <Clock className="w-4 h-4 text-gray-600" />;
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'shipped':
                return 'bg-blue-100 text-blue-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.phone.includes(searchTerm);
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">订单管理</h1>
                <p className="text-gray-600">管理您的所有订单和配送状态</p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="搜索订单号、客户姓名或手机号..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">全部状态</option>
                            <option value="pending">待处理</option>
                            <option value="shipped">已发货</option>
                            <option value="delivered">已送达</option>
                            <option value="cancelled">已取消</option>
                        </select>
                        <Button variant="outline">导出订单</Button>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">订单号</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">客户信息</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">商品</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">总金额</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">状态</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">下单时间</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4 font-medium">{order.id}</td>
                                    <td className="py-3 px-4">
                                        <div>
                                            <div className="font-medium">{order.customer}</div>
                                            <div className="text-sm text-gray-500">{order.phone}</div>
                                            <div className="text-xs text-gray-400 truncate max-w-xs">{order.address}</div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="text-sm">{order.products}</div>
                                    </td>
                                    <td className="py-3 px-4 font-medium">{order.total}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center space-x-2">
                                            {getStatusIcon(order.status)}
                                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(order.status)}`}>
                                                {order.statusText}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-500">{order.date}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex space-x-2">
                                            <Button variant="ghost" size="sm">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            {order.status === 'pending' && (
                                                <Button variant="ghost" size="sm" className="text-blue-600">
                                                    发货
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">总订单数</p>
                            <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                        </div>
                        <Package className="w-8 h-8 text-blue-600" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">待处理</p>
                            <p className="text-2xl font-bold text-yellow-600">
                                {orders.filter(o => o.status === 'pending').length}
                            </p>
                        </div>
                        <Clock className="w-8 h-8 text-yellow-600" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">已发货</p>
                            <p className="text-2xl font-bold text-blue-600">
                                {orders.filter(o => o.status === 'shipped').length}
                            </p>
                        </div>
                        <Truck className="w-8 h-8 text-blue-600" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">已完成</p>
                            <p className="text-2xl font-bold text-green-600">
                                {orders.filter(o => o.status === 'delivered').length}
                            </p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                </div>
            </div>
        </div>
    );
} 