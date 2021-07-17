import instance from "./http";

function orderIndex(params) {
    return instance.get("user/order", {
        params
    })
}

function orderStatusChange(orderId,data) {
    return instance.put("user/order/" + orderId,data)
}

export {orderIndex, orderStatusChange}