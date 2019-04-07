import { isArray } from "lodash"

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
let routeConfigRaw = [
  {
    name: "数据中心",
    match: "/home",
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

function mapToBreadcrumb(config) {
  let ret = {}
  config.forEach(item => {
    if (item.children) {
      ret = {
        [item.match]: item.name,
        ...ret,
        ...mapToBreadcrumb(item.children),
      }
    } else {
      ret[item.path] = item.name
    }
  })
  return ret
}

export const breadcrumbMap = mapToBreadcrumb(routeConfigRaw)

export default function getConfig() {
  // 过滤掉没有权限的路由
  // 默认不会过滤，只有设置了access字段才会进行过滤操作
  routeConfigRaw.forEach((item, index) => {
    if (isArray(item.children)) {
      // 判断有二级路由的情况
      item.children = item.children.filter(obj => {
        // if (obj.access) {
        //   // 权限判断
        //   return ret
        // }
        return true
      })
    }
    if (item.access) {
      // 判断只有一级路由的情况
      // 权限判断
    }
  })

  // 为一级路由添加默认指向页面的path，path为第一个children的path值
  routeConfigRaw.forEach((item, index) => {
    if (item && isArray(item.children)) {
      if (item.children.length) {
        if (item.children[0].children) {
          item.path = item.children[0].children[0].path
        } else {
          item.path = item.children[0].path
        }
      } else {
        // 没有任何子页面的权限，则删除一级路由
        routeConfigRaw[index] = null
      }
    }
  })
  routeConfigRaw = routeConfigRaw.filter(Boolean)

  // 将routeConfigRaw转换成map格式，避免以后使用循环查找
  let routeConfigMap = {}
  routeConfigRaw.forEach(item => {
    routeConfigMap[item.match] = {
      aliasName: item.aliasName,
      children: item.children,
    }
  })

  const indexRedirect = routeConfigRaw[0].path

  return {
    indexRedirect,
    routeConfigRaw,
    routeConfigMap,
  }
}
