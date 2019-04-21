import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Checkbox, Popover, Icon, Tree } from 'antd'
import styles from './styles.less'

const setData = (arr, selects, parent) => {
  arr.forEach(item => {
    if (selects.some(a => a.key === item.key)) {
      item.checked = true
      item.indeterminate = false
      if (parent && item.parentKey && !parent.checked) {
        parent.indeterminate = true
      }
    } else {
      item.checked = false
      item.indeterminate = false
      if (parent && parent.checked) {
        item.checked = true
      }
    }
    if (item.subCategorys && item.subCategorys.length) {
      setData(item.subCategorys, selects, item)
    }
  })
}

const { TreeNode } = Tree

const Home = ({ dispatch, allData, checkedData }) => {
  const [init, setInit] = useState(false)
  const [visible, setVisible] = useState(false)
  const [treeIndex, setTreeIndex] = useState(false)
  // 初始化
  useEffect(() => {
    dispatch({
      type: 'test/queryAll'
    })
    dispatch({
      type: 'test/queryCheckeds'
    })
  }, [dispatch])

  useEffect(() => {
    if (allData.length > 0 && checkedData.length > 0 && !init) {
      setData(allData, checkedData)
      dispatch({
        type: 'test/setAllData',
        payload: allData
      })

      setInit(true)
    }
  }, [dispatch, init, allData, checkedData])

  const findFunc = (nodes, key, n) => {
    nodes.forEach(item => {
      if (item.key === key) {
        n.push(item)
      } else {
        if (item.subCategorys && item.subCategorys.length) {
          findFunc(item.subCategorys, key, n)
        }
      }
    })
  }

  const setFunc = (nodes, c) => {
    nodes.forEach((item, i) => {
      if (item.key === c.key) {
        nodes[i] = c
      } else {
        if (item.subCategorys && item.subCategorys.length) {
          setFunc(item.subCategorys, c)
        }
      }
    })
  }

  const findNode = key => {
    let n = []
    findFunc(allData, key, n)
    return n[0]
  }

  const setParent = item => {
    if (item.parentKey) {
      const parent = findNode(item.parentKey)
      parent.subCategorys.forEach(a => {
        if (a.key === item.key) {
          a.checked = item.checked
        }
      })
      const childChecks = parent.subCategorys.filter(a => a.checked === true)
      if (childChecks.length === parent.subCategorys.length) {
        parent.checked = true
        parent.indeterminate = false
      } else if (!childChecks.length) {
        parent.checked = false
        parent.indeterminate = false
      } else {
        parent.checked = false
        parent.indeterminate = true
      }
      setFunc(allData, parent)
      setParent(parent)
    }
  }

  const setChild = item => {
    if (item.subCategorys) {
      item.subCategorys.forEach(child => {
        child.checked = item.checked
        child.indeterminate = false
        setChild(child)
      })
    }
  }

  const getCheckedData = (arr, selects, parent) => {
    arr.forEach(item => {
      if (item.checked) {
        if (!selects.some(a => a.key === item.key)) {
          selects.push(item)
        }
      }
      if (item.subCategorys && item.subCategorys.length) {
        getCheckedData(item.subCategorys, selects, item)
      }
    })
  }

  const handleChecked = (item, checked) => {
    const newItem = JSON.parse(JSON.stringify(item))
    newItem.checked = checked
    newItem.indeterminate = false
    // 向上递归设置
    setParent(newItem)

    // 向下递归设置
    setChild(newItem)

    // 设置自己
    setFunc(allData, newItem)

    const newCheckedData = []
    // 获取选中节点
    getCheckedData(allData, newCheckedData)

    dispatch({
      type: 'test/setAllData',
      payload: allData
    })
    dispatch({
      type: 'test/setCheckedData',
      payload: newCheckedData
    })
  }

  const renderTreeNodes = data => {
    if (data && data.length) {
      return data.map(item => {
        if (item.subCategorys) {
          return (
            <TreeNode
              checked={item.checked}
              title={item.desc}
              key={item.key}
              dataRef={item}
            >
              {renderTreeNodes(item.subCategorys)}
            </TreeNode>
          )
        }
        return <TreeNode title={item.desc} key={item.key} dataRef={item} />
      })
    }
  }
  let checkedKeys = []
  let treeData
  if (allData[treeIndex]) {
    treeData = allData[treeIndex].subCategorys
  }
  if (treeData) {
    getCheckedData(treeData, checkedKeys)
    checkedKeys = checkedKeys.map(item => item.key)
  }
  const content = treeData && (
    <Tree
      checkable
      checkedKeys={checkedKeys}
      onCheck={(a, e) => {
        handleChecked(e.node.props.dataRef, e.checked)
      }}
    >
      {renderTreeNodes(treeData)}
    </Tree>
  )

  return (
    <div className={styles.box}>
      {allData.map((item, i) => (
        <span key={item.key}>
          {item.subCategorys && item.subCategorys.length ? (
            <Popover
              content={content}
              trigger="click"
              visible={visible === item.key}
              onVisibleChange={v => {
                if (v) {
                  setTreeIndex(i)
                }
                setVisible(visible === item.key ? false : item.key)
              }}
            >
              <Icon type="caret-right" />
            </Popover>
          ) : null}
          <Checkbox
            checked={item.checked}
            indeterminate={item.indeterminate}
            onClick={e => {
              handleChecked(item, e.target.checked)
            }}
          >
            {item.desc}
          </Checkbox>
        </span>
      ))}
      <p />
    </div>
  )
}

Home.propTypes = {
  dispatch: PropTypes.func,
  allData: PropTypes.array,
  checkedData: PropTypes.array
}

Home.defaultProps = {
  allData: [],
  checkedData: []
}

export default connect(state => {
  return {
    allData: state.test.allData,
    checkedData: state.test.checkedData
  }
})(Home)
