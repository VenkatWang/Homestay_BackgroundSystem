import Vue from "vue"
import VueRouter from "vue-router";

Vue.use(VueRouter)

import Login from "../views/Login";
import Main from "../views/main/Main";
import List from "../views/main/List";

let routes = [
    {path: "/", component: Main},
    {path: "/login", component: Login},
    {path: "/list",component: List}
]
let router = new VueRouter({
    routes
})

export default router;