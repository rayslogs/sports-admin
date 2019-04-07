/**
 * @author ht1131589588
 * @description 左侧菜单导航
 */
import React, { useState } from "react"
import { Menu, Icon, Layout } from "antd"

const SubMenu = Menu.SubMenu
const { Sider } = Layout

const SiderComp = () => {
  const [collapsed, setCollapsed] = useState(false)
  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  }
  const handleClick = e => {
    console.log("click ", e)
  }

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <Menu onClick={handleClick} mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Icon type="appstore" />
          <span>首页</span>
        </Menu.Item>
        <SubMenu
          key="sub4"
          title={
            <span>
              <Icon type="setting" />
              <span>用户管理</span>
            </span>
          }
        >
          <Menu.Item key="9">账号管理</Menu.Item>
          <Menu.Item key="11">角色管理</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
}

export default SiderComp
