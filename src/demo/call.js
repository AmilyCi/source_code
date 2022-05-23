Function.prototype.myCall = function (context, ...args) {
  // 默认不传就是window
  context = context || window
  args = args ? args : []
  // 给context新增一个独一无二的属性，以免覆盖原有属性
  let key = Symbol()
  context[key] = this
  // 通过隐式绑定的方式调用函数
  let result = context[key](...args)
  // 删除添加的属性
  delete context[key]
  // 返回函数调用的返回值
  return result
}