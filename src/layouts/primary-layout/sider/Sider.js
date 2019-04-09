/**
 * @author ht1131589588
 * @description 左侧菜单导航
 */
import React, { useState } from 'react'
import { Menu, Icon, Layout } from 'antd'
import { isArray } from 'lodash'
import routerConfig from 'router/config'

const SubMenu = Menu.SubMenu
const { Sider } = Layout

const SiderComp = () => {
  const [collapsed, setCollapsed] = useState(false)
  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  }
  const handleClick = e => {
    console.log('click ', e)
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
        onClick={handleClick}
        mode="inline"
        defaultSelectedKeys={[routerConfig[0].path]}
      >
        {renderMenu(routerConfig)}
      </Menu>
    </Sider>
  )
}

export default SiderComp
