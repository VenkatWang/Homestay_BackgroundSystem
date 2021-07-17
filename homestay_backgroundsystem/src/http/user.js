import instance from "./http";

function userIndex(params) {
    return instance.get("user/user", {
        params
    })
}

function deleteUser(uid) {
    return instance.delete("user/user/" + uid);
}
function addUser(data){
    return instance.post("user/user",{
        ...data
    })
}

export {userIndex,deleteUser,addUser}