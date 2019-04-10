import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'antd'
import allData from '../../utils/all'
import nowData from '../../utils/now'

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

const Home = props => {
  const data = allData.content[0].moduleOrCategoryModels
  const selectedData = nowData.content
  setData(data, selectedData)
  return (
    <div>
      {data.map(item => (
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
  model: PropTypes.object
}

Home.defaultProps = {
  model: {}
}

export default Home
