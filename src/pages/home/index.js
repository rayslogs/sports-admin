import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Checkbox } from 'antd'

const setData = (arr, selects, parent) => {
  arr.forEach(item => {
    if (selects.some(a => a.key === item.key)) {
      item.checked = true
      if (parent && item.parentKey) {
        parent.indeterminate = true
      }
    } else {
      item.checked = false
      setData(item.subCategorys, selects, item)
    }
  })
}

const Home = ({ dispatch, allData, checkedData }) => {
  const [init, setInit] = useState(false)
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
  return (
    <div>
      {allData.map(item => (
        <Checkbox
          key={item.key}
          checked={item.checked}
          indeterminate={item.indeterminate}
        >
          {item.desc}
        </Checkbox>
      ))}
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
