import { post, get } from "./request";

export async function login(username, password) {
    const res = await post("/auth/login", { username, password }, false);
    return res;
}

export async function addAdmin(data) {
    const res = await post("/admin/add", data);
    return res;
}

export async function adminList(data) {
    return await get("/admin/list", data);
}

export async function modifyAdmin(data) {
    return await post("/admin/modify", data);
}

export async function configShow(data) {
    return await get("/config/get", data);
}

export async function configModify(data) {
    return await post("/config/modify", data);
}

export async function deleteAdmin(id) {
    return await post("/admin/delete", { id });
}

export async function categoryList(data) {
    return await get("/category/list", data);
}

export async function addCategory(data) {
    return await post("/category/add", data);
}

export async function modifyCategory(data) {
    return await post("/category/modify", data);
}

export async function deleteCategory(id) {
    return await post("/category/delete", { id });
}

export async function productCategories() {
    return await get("/product/categories");
}

export async function productList(data) {
    return await post("/product/list", data);
}

export async function productAdd(data) {
    return await post("/product/add", data);
}

export async function productModify(data) {
    return await post("/product/modify", data);
}

export async function deleteProduct(data) {
    return await post("/product/delete", data);
}

export async function productMetadataGet(data) {
    return await post("/product/metadata/get", data);
}



