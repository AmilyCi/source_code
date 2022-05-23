Function.prototype.myApply = function (context, args) {
  // 如果不传，给一个默认值
  context = context || window
  args = args ? args : []
  // 给context新增一个独一无二的属性，避免覆盖原有的属性
  const key = Symbol()
  context[key] = this
  // 通过隐式绑定的方式，调用函数
  const result = context[key](...args)
  // 删除添加的属性
  delete context[key]
  // 返回函数调用的返回值
  return result
}