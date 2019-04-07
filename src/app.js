import Immutable from 'immutable'

class App {
  _pageStatus = 0

  getStatus() {
    return this._pageStatus
  }

  setStatus(pageStatus) {
    this._pageStatus = pageStatus
  }

  _accessCodeList = Immutable.Set([])

  auth(access) {
    if (Array.isArray(access)) {
      const size = access.length
      for (let i = 0; i < size; i++) {
        if (this._accessCodeList.has(access[i])) {
          return true
        }
      }
      return false
    }
    return this._accessCodeList.has(access)
  }

}

export default new App()
