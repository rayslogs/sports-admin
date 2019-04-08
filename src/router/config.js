/**
 * 只有一级路由配置规则
 * {
 *   name,
 *   path,
 *   icon,
 *   access
 * }
 *
 * 二级路由的配置规则
 * {
 *   name,
 *   match,
 *   icon,
 *   children: [{
 *     name,
 *     path,
 *     access
 *   }]
 * }
 * 三级路由的配置规则
 * {
 *   name,
 *   match,
 *   icon,
 *   children: [{
 *     name,
 *     match,
 *     access,
 *     children: [{
 *        name,
 *        path,
 *        access
 *     }]
 *   }]
 * }
 */
const routerConfig = [
  {
    name: "数据中心",
    path: "/home",
    icon: "appstore",
  },
  {
    name: "权限管理",
    match: "/uc",
    icon: "setting",
    children: [
      {
        name: "角色管理",
        path: "/uc/role",
      },
      {
        name: "账号管理",
        path: "/uc/account",
      },
      {
        name: "菜单管理",
        path: "/uc/menu",
      },
    ],
  },
]

export default routerConfig
