import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { productMetadataGet } from "@/api";
import Editor from "@monaco-editor/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function ProductDetail() {
    const [productMetaData, setProductMetaData] = useState({});
    const [jsonText, setJsonText] = useState(JSON.stringify({}, null, 2));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    const { product } = location.state || {};

    const fetchProductMetadata = async () => {
        try {
            setLoading(true);
            const data = await productMetadataGet({ product_id: product.id });
            setProductMetaData(data || {});
            setJsonText(JSON.stringify(data, null, 2));
        } catch (error) {
            console.error("加载商品失败:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductMetadata();
    }, []);

    useEffect(() => {
        try {
            const parsed = JSON.parse(jsonText);
            setProductMetaData(parsed);
        } catch (e) {
            setError("JSON 解析错误，请检查格式");
        }
    }, [jsonText]);

    return (
        <>
            <div className="flex items-center border-b bg-white sticky top-0 z-10">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
            </div>
            <div className="bg-gray-50 min-h-screen p-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{product?.name}</h1>
                    <p className="text-gray-600">{product?.description}</p>
                </div>
                {/* 顶部导航 - 更紧凑的手机风格 */}
                {!loading && (
                    <div className="py-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">商品属性值</h2>
                        </div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">商品元数据</h2>
                            <Button type="submit" onClick={() => { }}>
                                保存元数据
                            </Button>
                        </div>
                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-9 py-3">
                            <div className="md:w-3/7 bg-white rounded-2xl shadow-lg max-h-[600px] overflow-y-auto p-4 border border-gray-200">
                                {/* 商品图片轮播 */}
                                <div className="py-3">
                                    <Swiper
                                        modules={[Pagination, Autoplay]}
                                        pagination={{ clickable: true }}
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }}
                                        loop={true}
                                    >
                                        {Array.isArray(productMetaData.images) &&
                                            productMetaData.images.map((url, i) => (
                                                <SwiperSlide key={i}>
                                                    <img
                                                        src={url}
                                                        alt={`product-${i}`}
                                                        className="w-full h-60 object-cover"
                                                        onError={(e) => (e.currentTarget.style.display = "none")}
                                                    />
                                                </SwiperSlide>
                                            ))}
                                    </Swiper>
                                </div>
                                {/* 规格参数 - 单列表格 */}
                                <div className="py-3">
                                    <h2 className="text-lg font-semibold mb-3">规格参数</h2>
                                    <div className="border rounded-md overflow-hidden">
                                        {productMetaData.specs &&
                                            Object.entries(productMetaData.specs).map(([key, value], idx) => (
                                                <div
                                                    key={key}
                                                    className={`flex justify-between px-3 py-2 text-sm ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                                                        } border-b last:border-0`}
                                                >
                                                    <span className="text-gray-500">{key}</span>
                                                    <span className="font-medium">{String(value)}</span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                                {/* 商品描述 */}
                                <div className="py-3">
                                    <h2 className="text-lg font-semibold mb-2">商品描述</h2>
                                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                                        {productMetaData.description}
                                    </p>
                                </div>
                                {/* 会员权益 */}
                                <div className="py-3">
                                    <h2 className="text-lg font-semibold mb-3">会员权益</h2>
                                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                                        {productMetaData.member_benefits &&
                                            Object.entries(productMetaData.member_benefits).map(
                                                ([key, value]) => (
                                                    <li key={key}>
                                                        {key}:<span className="font-medium">{String(value)}</span>
                                                    </li>
                                                )
                                            )}
                                    </ul>
                                </div>
                            </div>
                            <div className="md:w-4/7 flex flex-col overflow-hidden">
                                {/* JSON 编辑器（可折叠） */}
                                <div className="bg-white rounded-lg shadow-sm">
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
                                            scrollBeyondLastLine: false,
                                            wordWrap: "on",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
