import Vue from "vue"
import VueRouter from "vue-router";

Vue.use(VueRouter)

import Login from "../views/Login";
import Main from "../views/main/Main";

let routes = [
    {path: "/", component: Main},
    {path: "/login", component: Login}
]
let router = new VueRouter({
    routes
})

export default router;