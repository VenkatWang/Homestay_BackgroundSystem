import Vue from "vue"
import VueRouter from "vue-router";

Vue.use(VueRouter)

import Login from "../views/Login";
import Main from "../views/main/Main";
import List from "../views/main/List";
import Categoryadd from "../views/main/category/Add";
import Categoryindex from "../views/main/category/Index"
import MainContainer from "../views/main/MainContainer";
import Categoryedit from "../views/main/category/Categoryedit";
import UserIndex from "../views/main/user/UserIndex";
import Homestayadd from "../views/main/homestay/Homestayadd";
import Homestayindex from "../views/main/homestay/Homestayindex";
import Homestayedit from "../views/main/homestay/Homestayedit";
let routes = [
    {
        path: "/",
        redirect:"/maincontainer",
        component: Main,
        name: "index",
        //路由元信息，用来设置是否需要验证
        meta: {
            auth: true, title: "首页"
        },
        children: [
            {
                path: "maincontainer",
                component: MainContainer,
                name: "maincontainer",
                meta: {
                    auth: true
                }
            },
            {
                path: "categoryadd",
                component: Categoryadd,
                name: "categoryadd",
                meta: {
                    title:"分类添加",
                    auth: true
                }
            },
            {
                path: "categoryindex",
                component: Categoryindex,
                name: "categoryindex",
                meta: {
                    title: "分类查看",
                    auth: true
                }
            },
            {
                path: "categoryedit",
                component: Categoryedit,
                name: "categoryedit",
                meta: {
                    title: "分类编辑",
                    auth: true
                }
            },
            {
                path: "homestayadd",
                component: Homestayadd,
                name: "homestayadd",
                meta: {
                    title: "民宿添加",
                    auth: true
                }
            },
            {
                path: "homestayindex",
                component: Homestayindex,
                name: "homestayindex",
                meta: {
                    title: "民宿查看",
                    auth: true
                }
            },
            {
                path: "homestayedit/:sid",
                component: Homestayedit,
                name: "homestayedit",
                meta: {
                    title: "民宿编辑",
                    auth: true
                }
            },
            {
                path: "userindex",
                component: UserIndex,
                name: "userindex",
                meta: {
                    title: "用户管理",
                    auth: true
                }
            }
        ]
    },
    {
        path: "/login", component: Login, name: "login",
        meta: {
            auth: false, title: "登录"
        }
    },
    {
        path: "/list", component: List, name: "list",
        meta: {
            auth: true, title: "列表"
        }
    }
]
let router = new VueRouter({
    routes
})

//全局前置守卫
//导航守卫，只有当路径发生变化才会监测到，参数的改变不会触发
//路由元信息
router.beforeEach((to, from, next) => {
    let title = to.meta.title || "中北大学民宿小程序管理系统";
    document.title = title;
    if (to.meta.auth) {
        let token = sessionStorage.getItem("token");
        token = token && token.trim();
        if (token) {
            next();
        } else {
            next({name: "login", query: {redirect: to.name}})
        }
    } else {
        next();
    }
})
export default router;