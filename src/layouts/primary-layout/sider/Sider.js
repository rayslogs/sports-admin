/**
 * @author ht1131589588
 * @description 左侧菜单导航
 */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import router from 'umi/router'
import withRouter from 'umi/withRouter'
import { Menu, Icon, Layout } from 'antd'
import { isArray } from 'lodash'
import routerConfig from 'router/config'

const SubMenu = Menu.SubMenu
const { Sider } = Layout

function findOpenKeys(path) {
  const openKeys = []
  routerConfig.forEach(item => {
    if (isArray(item.children)) {
      item.children.forEach(a => {
        if (a.path === path) {
          openKeys.push(item.match)
        }
      })
    }
  })

  return openKeys
}

const SiderComp = ({ location }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState([location.pathname])
  const [openKeys, setOpenKeys] = useState(findOpenKeys(selectedKeys[0]))

  // 监听路由 设置选中key
  useEffect(() => {
    setSelectedKeys([location.pathname])
  }, [location.pathname])

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  }
  const handleClick = e => {
    router.push(e.key)
  }
  const handleOpenChange = openKeys => {
    setOpenKeys(openKeys)
  }

  function renderMenu(routerConfig) {
    return routerConfig.map(item => {
      if (isArray(item.children)) {
        return (
          <SubMenu
            key={item.match}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.name}</span>
              </span>
            }
          >
            {renderMenu(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.path}>
          {item.icon && <Icon type={item.icon} />}
          <span>{item.name}</span>
        </Menu.Item>
      )
    })
  }

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{ background: '#fff' }}
    >
      <Menu
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onClick={handleClick}
        onOpenChange={handleOpenChange}
        mode="inline"
        defaultSelectedKeys={[routerConfig[0].path]}
      >
        {renderMenu(routerConfig)}
      </Menu>
    </Sider>
  )
}

SiderComp.propTypes = {
  location: PropTypes.object
}

export default withRouter(SiderComp)
