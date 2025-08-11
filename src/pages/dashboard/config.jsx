import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Editor from "@monaco-editor/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import { configModify, configShow } from "@/api";

export default function Config() {
    const [id, setId] = useState()
    const [loading, setLoading] = useState(true);
    const [jsonText, setJsonText] = useState(JSON.stringify({}, null, 2));
    const [config, setConfig] = useState("");
    const [error, setError] = useState("");

    const fetchConfig = async () => {
        try {
            setLoading(true)
            const data = await configShow();
            setJsonText(JSON.stringify(data.config, null, 2));
            setConfig(data.config);
            setId(data.id)
            setLoading(false)
        } catch (err) {
            console.error(err);
        }
    };

    const saveConfig = async () => {
        if (!window.confirm("确认保存配置吗？")) return;
        try {
            await configModify({ id, config });
            window.location.reload
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchConfig()
    }, []);

    useEffect(() => {
        try {
            const parsed = JSON.parse(jsonText);
            setConfig(parsed);
            setError("");
        } catch (e) {
            setError("JSON 解析错误，请检查格式");
        }
    }, [jsonText]);

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">首页配置</h1>
                    <p className="text-gray-600">修改Json文件来管理首页配置</p>
                </div>
                <Button type="submit" onClick={() => saveConfig()}>
                    保存配置
                </Button>
            </div>
            {!loading && (
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-9">
                    {/* 手机风格 UI */}
                    <div className="md:w-3/7 bg-white rounded-2xl shadow-lg max-h-[600px] overflow-y-auto p-4 border border-gray-200">
                        {/* 轮播图 */}
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            pagination={{ clickable: true }}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: true,
                            }}
                            spaceBetween={10}
                            slidesPerView={1}
                            loop={true}
                            className="mb-6 rounded-lg overflow-hidden"
                        >
                            {Array.isArray(config.carousel_image) &&
                                config.carousel_image.map((url, i) => (
                                    <SwiperSlide key={i}>
                                        <img
                                            src={url}
                                            alt={`banner-${i}`}
                                            className="w-full h-48 object-cover"
                                            onError={(e) => (e.currentTarget.style.display = "none")}
                                        />
                                    </SwiperSlide>
                                ))}
                        </Swiper>

                        {/* 推荐商品 */}
                        <h2 className="text-xl font-semibold mb-3 text-center">推荐商品</h2>
                        <div className="space-y-4 mb-6">
                            {Array.isArray(config.recommend) &&
                                config.recommend.map((item) => (
                                    <div
                                        key={item.id}
                                        className="w-full bg-gray-50 rounded-md shadow-md overflow-hidden flex"
                                    >
                                        <img
                                            src={item.image_url}
                                            alt={item.name}
                                            className="w-24 h-24 object-cover flex-shrink-0"
                                            onError={(e) => (e.currentTarget.style.display = "none")}
                                        />
                                        <div className="p-3 flex flex-col justify-center">
                                            <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                                            <p className="text-xs text-gray-600 line-clamp-3 mt-1">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        {/* 公司介绍 */}
                        <h2 className="text-xl font-semibold mb-2 text-center">公司介绍</h2>
                        <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
                            {config.company_info}
                        </p>
                    </div>

                    {/* JSON 编辑器 */}
                    <div className="md:w-4/7 flex flex-col overflow-hidden">
                        <Editor
                            height="600px"
                            language="json"
                            value={jsonText}
                            onChange={(value) => setJsonText(value || "")}
                            options={{
                                minimap: { enabled: false },
                                formatOnType: true,
                                formatOnPaste: true,
                                automaticLayout: true,
                                scrollBeyondLastLine: false, // 防止底部留白
                                scrollbar: {
                                    vertical: "hidden",
                                    horizontal: "hidden",
                                },
                                wordWrap: "on",
                            }}
                        />
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>



                </div>)}
        </div>
    );
}
