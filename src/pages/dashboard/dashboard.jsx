export default function Dashboard() {
    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">仪表板</h1>
                <p className="text-gray-600">欢迎来到DTC-STORE管理后台</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-600">总销售额</h3>
                    <p className="text-2xl font-bold text-gray-900">¥128,500</p>
                    <p className="text-xs text-green-600 mt-1">+12.5% 较上月</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-600">商品总数</h3>
                    <p className="text-2xl font-bold text-gray-900">1,234</p>
                    <p className="text-xs text-green-600 mt-1">+8.2% 较上月</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-600">用户总数</h3>
                    <p className="text-2xl font-bold text-gray-900">5,678</p>
                    <p className="text-xs text-green-600 mt-1">+15.3% 较上月</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-600">订单总数</h3>
                    <p className="text-2xl font-bold text-gray-900">892</p>
                    <p className="text-xs text-green-600 mt-1">+5.7% 较上月</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">最近活动</h2>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">新订单 #12345</p>
                            <p className="text-xs text-gray-500">2分钟前</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">新用户注册</p>
                            <p className="text-xs text-gray-500">5分钟前</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">商品库存更新</p>
                            <p className="text-xs text-gray-500">10分钟前</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 