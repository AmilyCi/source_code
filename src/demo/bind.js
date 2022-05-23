Function.prototype.myBind = function (context, ...args) {
  const fn = this
  args = args ? args : []
  return function newFn (...newFnArgs) {
    // 返回的新函数，用new去调用
    if (this instanceof newFn) {
      return new fn(...args, ...newFnArgs)
    }
    return fn.apply(context, [...args, ...newFnArgs])
  }
}
