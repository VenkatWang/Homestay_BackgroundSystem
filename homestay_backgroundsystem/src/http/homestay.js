import instance from "./http";

function homestayAdd() {

}

function homestayDelete(sid) {
    return instance.delete("api/homestay/"+sid)
}

function homestayUpdate(sid, data) {
    return instance.put("/api/homestay/" + sid, data)
}

function homestayIndex(params) {
    return instance.get("api/homestay", {
        params
    })
}

function homestayRead(sid) {
    return instance.get("api/homestay/" + sid, {
        sid
    })
}

export {homestayAdd, homestayDelete, homestayIndex, homestayRead, homestayUpdate}