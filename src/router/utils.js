function path2array(pathname) {
  return pathname.split("/").slice(1)
}

/**
 * 根据deep返回是否相等
 * @param  {Array} path1
 * @param  {Array} path2
 * @param  {Number} deep
 * @return {Boolean}
 */
function equalsPath(path1, path2, deep) {
  let matches = 0
  path1.some((item, index) => {
    if (item === path2[index]) {
      matches += 1
      return false
    }
    return true
  })
  // 根据路由定义规则，匹配4个以上返回true
  return matches >= deep
}

/**
 * 递归查找openKeys 和 selectedKeys
 * @param  {Array} menus
 * @param  {String} pathname
 * @return {Object}
 */
function walkMenuByPath(menus, pathname, deep) {
  let ret
  menus.some(item => {
    if (ret) {
      return true
    }
    const { path, children, match } = item
    // 没有二级以上的菜单
    if (!children) {
      if (equalsPath(path2array(path), pathname, deep)) {
        ret = {
          openKeys: [],
          selectedKeys: [path || match],
        }
      }
    } else if (children) {
      ret = walkMenuByPath(children, pathname, deep + 1)
      if (ret) {
        ret.openKeys = [...ret.openKeys, path || match]
      }
    }
    return false
  })
  return ret
}

export default {
  /**
   * 获取第一级路由激活的key
   * @param {String} pathname
   * @param {Immutable.Map}} routeConfigMap
   */
  getFirstKey(pathname, routeConfigMap) {
    let first
    const firstKey = pathname
      .split("/")
      .slice(0, 3)
      .join("/")
    if (routeConfigMap.has(firstKey)) {
      first = firstKey
    }
    return first
  },

  /**
   * 获取第二三级路由激活的key
   * @param {String} pathname
   * @param {Immutable.List} routes
   */
  getSecondKey(pathname, routes) {
    const ret = {
      openKeys: [],
      selectedKeys: [],
    }
    const arrayPathname = path2array(pathname)
    // 查找openKeys 和 selectedKeys
    const mergeRet = walkMenuByPath(routes, arrayPathname, 2) || {}
    return {
      ...ret,
      ...mergeRet,
    }
  },
}
