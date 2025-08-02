export default function Users() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">用户管理</h1>
                <p className="text-gray-600">管理您的用户账户和权限</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">用户列表</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4 font-medium text-gray-600">姓名</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">邮箱</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">手机</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">状态</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">注册日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 font-medium">张三</td>
                                <td className="py-3 px-4">zhangsan@example.com</td>
                                <td className="py-3 px-4">138****1234</td>
                                <td className="py-3 px-4">
                                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                        活跃
                                    </span>
                                </td>
                                <td className="py-3 px-4">2024-01-15</td>
                            </tr>
                            <tr className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 font-medium">李四</td>
                                <td className="py-3 px-4">lisi@example.com</td>
                                <td className="py-3 px-4">139****5678</td>
                                <td className="py-3 px-4">
                                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                        活跃
                                    </span>
                                </td>
                                <td className="py-3 px-4">2024-01-20</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
} 