import allData from '../../utils/all'
import nowData from '../../utils/now'

console.log(nowData)

export default {
  namespace: 'test',
  state: {
    allData: [],
    checkedData: []
  },
  reducers: {
    setAllData(state, { payload }) {
      return { ...state, allData: JSON.parse(JSON.stringify(payload)) }
    },
    setCheckedData(state, { payload }) {
      return { ...state, checkedData: payload }
    }
  },
  effects: {
    *queryAll(_, { call, put }) {
      yield put({
        type: 'setAllData',
        payload: allData.content[0].moduleOrCategoryModels
      })
    },
    *queryCheckeds(_, { call, put }) {
      yield put({ type: 'setCheckedData', payload: nowData.content })
    }
  }
}
