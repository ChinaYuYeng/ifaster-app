export default function() {
  const routes = {
    path: "/staff",
    meta: {
      title: "店员管理"
    },
    children: [
      {
        path: "qrcode",
        component: "./QRcode/page.vue",
        meta: {
          title: "邀请注册-店员"
        }
      },
      {
        path: "detail",
        component: "./detail/page.vue",
        meta: {
          title: "店员管理-详情"
        }
      },
      {
        path: "permission",
        component: "./permission/page.vue",
        meta: {
          title: "店员管理-权限"
        }
      },
      {
        path: "template",
        component: "./template/page.vue",
        meta: {
          title: "权限模板"
        }
      },
      {
        path: "addtemp",
        component: "./addTemp/page.vue",
        meta: {
          title: "新增模板"
        }
      }
    ]
  };
  return { routes };
}
