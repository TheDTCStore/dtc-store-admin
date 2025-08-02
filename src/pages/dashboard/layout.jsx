import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { 
    Home, 
    Package, 
    Users, 
    Settings, 
    BarChart3, 
    Menu,
    ChevronLeft,
    ShoppingCart,
    Tags
} from "lucide-react";

const menuItems = [
    { id: "dashboard", label: "仪表板", icon: Home, path: "/" },
    { id: "users", label: "用户管理", icon: Users, path: "/users" },
    { id: "categories", label: "分类管理", icon: Tags, path: "/categories" },
    { id: "products", label: "商品管理", icon: Package, path: "/products" },
    { id: "orders", label: "订单管理", icon: ShoppingCart, path: "/orders" },
    { id: "settings", label: "系统设置", icon: Settings, path: "/settings" },
];

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleMenuClick = (path) => {
        navigate(path);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 ease-in-out`}>
                <div className="flex items-center justify-between p-4 border-b">
                    {sidebarOpen && (
                        <h1 className="text-xl font-bold text-gray-800">DTC-STORE</h1>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleSidebar}
                        className="p-1"
                    >
                        {sidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
                    </Button>
                </div>
                
                <nav className="mt-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleMenuClick(item.path)}
                                className={`w-full flex items-center px-4 py-3 text-left transition-colors duration-200 ${
                                    isActive
                                        ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                <Icon size={20} className="flex-shrink-0" />
                                {sidebarOpen && (
                                    <span className="ml-3 font-medium">{item.label}</span>
                                )}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm border-b px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-800">
                            {menuItems.find(item => item.path === location.pathname)?.label || '仪表板'}
                        </h2>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">管理员</span>
                            <Button variant="outline" size="sm">
                                退出登录
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
} 