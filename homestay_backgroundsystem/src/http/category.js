import instance from "./http";

function categoryAdd() {

}

function categoryDelete(cid) {
    return instance({
        method: "POST",
        url: "/admin/category/categoryDelete",
        data:{cid}
    });
}

function categoryUpdate() {

}

function categoryIndex() {
    return instance({
        method: "GET",
        url: "/admin/category/indexall"
    });
}

function categoryRead() {

}

export {categoryAdd, categoryDelete, categoryIndex, categoryRead, categoryUpdate};