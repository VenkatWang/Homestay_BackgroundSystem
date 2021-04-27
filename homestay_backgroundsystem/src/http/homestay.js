import instance from "./http";

function homestayAdd() {

}

function homestayDelete() {

}

function homestayUpdate() {

}

function homestayIndex(params) {
   return instance.get("api/homestay", {
        params
    })
}

function homestayRead() {

}

export {homestayAdd, homestayDelete, homestayIndex, homestayRead, homestayUpdate}