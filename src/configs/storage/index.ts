export class Storage {
  storage: any

  constructor(storage = localStorage) {
    this.storage = storage
  }

  setItem(key: string, val: any, withBase64 = false) {
    let _val = val
    if (val instanceof Object) {
      _val = JSON.stringify(val)
    }

    if (withBase64) {
      _val = btoa(encodeURI(_val))
    }
    this.storage.setItem(key, _val)
  }

  getItem(key: string, withBase64 = false) {
    let val = this.storage.getItem(key)
    if (val) {
      if (withBase64) {
        val = decodeURI(atob(val))
      }
      val = JSON.parse(val)
      return val
    }
    return undefined
  }

  setModuleItem(module: string, key: string, val: any, withBase64 = false) {
    let _module: any = this.storage.getItem(module)
    if (!_module) {
      _module = {}
    } else {
      _module = JSON.parse(_module)
    }
    _module[key] = val
    if (withBase64) {
      _module = btoa(encodeURI(_module))
    }
    this.storage.setItem(module, JSON.stringify(_module))
  }
  getModuleItem(module: string, key: string, withBase64 = false) {
    let val: any = this.storage.getItem(module)
    if (val) {
      if (withBase64) {
        val = decodeURI(atob(val))
      }
      val = JSON.parse(val)
      return val[key]
    }
    return undefined
  }
}

export const storage = new Storage()
