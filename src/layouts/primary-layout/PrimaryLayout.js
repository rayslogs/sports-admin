import React from 'react'
import PropTypes from 'prop-types'
import withRouter from 'umi/withRouter'
import { Layout, Breadcrumb } from 'antd'
import { isArray } from 'lodash'
import routerConfig from 'router/config'
import Sider from './sider'

const { Header, Footer, Content } = Layout

// 生成标签页
function setBreadcrumbs(path) {
  const breadcrumbs = []

  function findRoute(routerConfig) {
    routerConfig.forEach(item => {
      if (item.path === path) {
        breadcrumbs.push(item.name)
      } else {
        if (isArray(item.children)) {
          if (item.children.some(a => a.path === path)) {
            breadcrumbs.push(item.name)
          }
          findRoute(item.children)
        }
      }
    })
  }

  findRoute(routerConfig)

  return breadcrumbs
}

const PrimaryLayout = ({ children, location }) => {
  const path = location.pathname
  const breadcrumbs = setBreadcrumbs(path)
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider />
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {breadcrumbs.map((item, i) => (
              <Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

PrimaryLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object
}

export default withRouter(PrimaryLayout)
