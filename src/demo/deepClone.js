// 深拷贝

// 1、简易版
export function deepClone (target, hash = new WeakMap()) {
  if (target === null) return target
  if (target instanceof Date) return new Date(target)
  if (target instanceof RegExp) return new RegExp(target)
  if (typeof target !== 'object') return target
  if (hash.get(target)) return target
  let cloneObj = new target.constructor()
  hash.set(target, cloneObj)
  for (let key in target) {
    cloneObj[key] = deepClone(target[key], hash)
  }
  return cloneObj
}

// 2、复杂版

// 可继续遍历的数据类型
const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'
const argsTag = '[object Arguments]'
// 不可继续遍历的数据类型
const boolTag = '[object Boolean]'
const numberTag = '[object Numner]'
const stringTag = '[object String]'
const dateTag = '[object Date]'
const symbolTag = '[object Symbol]'
const errorTag = '[object Error]'
const regexpTag = '[object RegExp]'
const funcTag = '[object Function]'

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag]

// 工具函数 - 判断是否为引用类型
function isObject (target) {
  const type = typeof target
  return target !== null && (type === 'object' || type === 'function')
}
// 工具函数 - 获取实际类型
function getType (target) {
  return Object.prototype.toString.call(target)
}
// 工具函数 - 初始化被克隆的对象
function getInit (target) {
  const Ctor = target.constructor
  return new Ctor()
}
// 工具函数 - 克隆不可遍历类型
function cloneOtherType (target, type) {
  const Ctor = target.constructor
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case dateTag:
    case errorTag:
      return new Ctor(target)
    case symbolTag:
      return cloneSymbol(target)
    case regexpTag:
      return cloneRegExp(target)
    case funcTag:
      return cloneFunction(target)
    default:
      return null
  }
}
// 工具函数 - 克隆Symbol
function cloneSymbol (target) {
  return Object(Symbol.prototype.valueOf.call(target))
}
// 工具函数 - 克隆正则
function cloneRegExp (target) {
  // 正则 /\w*$/ 匹配的是字符串尾部字母
  const reFlags = /\w*$/
  // 一个正则对象可以大致分成两部分，源码(source) 和修饰符(flags)
  const result = new target.constructor(target.source, reFlags.exec(target))
  // lastIndex 表示每次匹配时的开始位置。 使用正则对象的 test 和 exec 方法，而且当修饰符为 g 或 y 时， 对 lastIndex 是有影响的。
  result.lastIndex = target.lastIndex
  return result
}
// 工具函数 - 克隆函数
function cloneFunction (func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m
    const paramReg = /(?<=\().+(?=\)\s+{)/
    const funcString = func.toString()
    if (func.prototype) {
      const param = paramReg.exec(funcString)
      const body = bodyReg.exec(funcString)
      if (body) {
        if (param) {
          const paramArr = param[0].split(',')
          return new Function(...paramArr, body[0])
        } else {
            return new Function(body[0]);
        }
      } else {
        return null
      }
  } else {
      return eval(funcString);
  }
}
// 工具函数 - 通用while循环
function loop (array, interatee) { 
  let index = -1
  const length = array.length
  while (++index < length) {
    interatee(array[index], index)
  }
  return array
}

export function deepClone1 (target, hash = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target
  }
  // 初始化根据不同类型进行操作
  const type = getType(target)
  let cloneTarget
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target)
  } else {
    return cloneOtherType(target, type)
  }
  // 防止循环引用
  if (hash.get(target)) {
    return hash.get(target)
  }
  hash.set(target, cloneTarget)
  // 克隆set
  if (type === setTag) {
    target.forEach(value => {
      cloneTarget.add(deepClone1(value, hash))
    })
    return cloneTarget
  }
  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, deepClone1(value, hash))
    })
    return cloneTarget
  }
  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target)
  loop(keys || target, (value, key) => {
    if (keys) {
      key = value
    }
    cloneTarget[key] = deepClone1(target[key], hash)
  })
  return cloneTarget
}