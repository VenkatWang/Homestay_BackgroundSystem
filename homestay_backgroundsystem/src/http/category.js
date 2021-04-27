import instance from "./http";

function categoryAdd() {

}

function categoryDelete() {

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