// src/lib/api.js
import { getToken, removeToken } from "@/lib/token";

const BASE_URL = "/admin_api";

async function request(path, options = {}, auth = true) {
    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };

    if (auth) {
        const token = getToken();
        if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    let resp;
    try {
        resp = await fetch(BASE_URL + path, { ...options, headers });
    } catch (err) {
        throw new Error("网络请求失败，请检查网络连接");
    }

    if (resp.status === 401) {
        // removeToken();
        // window.location.href = "/login";
        return; // 防止继续执行
    }

    let result;
    try {
        result = await resp.json();
    } catch (err) {
        throw new Error("服务器响应格式错误");
    }

    if (typeof result.code !== "undefined") {
        if (result.code !== 0) {
            throw new Error(result.message || "请求失败");
        }
        return result.data;
    }

    return result;
}


export function get(path, params = {}, auth = true) {
    const query = Object.keys(params).length
        ? "?" + new URLSearchParams(params).toString()
        : "";
    return request(path + query, { method: "GET" }, auth);
}

export function post(path, data = {}, auth = true) {
    return request(
        path,
        {
            method: "POST",
            body: JSON.stringify(data),
        },
        auth
    );
}