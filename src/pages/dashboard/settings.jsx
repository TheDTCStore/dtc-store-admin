import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Bell, Shield, Palette, Save } from "lucide-react";

export default function Settings() {
    const [language, setLanguage] = useState("zh-CN");
    const [theme, setTheme] = useState("light");
    const [notifications, setNotifications] = useState({
        email: true,
        system: true,
        stock: false
    });

    const languages = [
        { code: "zh-CN", name: "简体中文", flag: "🇨🇳" },
        { code: "en-US", name: "English", flag: "🇺🇸" },
        { code: "ja-JP", name: "日本語", flag: "🇯🇵" }
    ];

    const handleNotificationChange = (key) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleSave = () => {
        // 这里可以添加保存设置的逻辑
        alert("设置已保存！");
    };

    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">系统设置</h1>
                <p className="text-gray-600">管理您的系统配置和偏好设置</p>
            </div>

            {/* Language Settings */}
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                    <Globe className="w-5 h-5 mr-2 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">语言设置</h2>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            选择语言
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => setLanguage(lang.code)}
                                    className={`p-3 border rounded-lg text-left transition-colors ${language === lang.code
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="text-lg mb-1">{lang.flag}</div>
                                    <div className="text-sm font-medium">{lang.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                    <Bell className="w-5 h-5 mr-2 text-green-600" />
                    <h2 className="text-lg font-semibold text-gray-900">通知设置</h2>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">邮件通知</h3>
                            <p className="text-sm text-gray-500">接收重要事件的邮件通知</p>
                        </div>
                        <button
                            onClick={() => handleNotificationChange('email')}
                            className={`w-12 h-6 rounded-full transition-colors ${notifications.email ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${notifications.email ? 'translate-x-6' : 'translate-x-1'
                                }`}></div>
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">系统通知</h3>
                            <p className="text-sm text-gray-500">在管理后台显示系统通知</p>
                        </div>
                        <button
                            onClick={() => handleNotificationChange('system')}
                            className={`w-12 h-6 rounded-full transition-colors ${notifications.system ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${notifications.system ? 'translate-x-6' : 'translate-x-1'
                                }`}></div>
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">库存预警</h3>
                            <p className="text-sm text-gray-500">商品库存不足时发送通知</p>
                        </div>
                        <button
                            onClick={() => handleNotificationChange('stock')}
                            className={`w-12 h-6 rounded-full transition-colors ${notifications.stock ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${notifications.stock ? 'translate-x-6' : 'translate-x-1'
                                }`}></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 