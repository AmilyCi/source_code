// 节流

// 时间戳版本
export function throttle (fn, wait) {
  let previous = 0
  return function () {
    let context = this
    let args = arguments
    let now = +new Date()
    if (now - previous > wait) {
      fn.apply(context, args)
      previous = now
    }
  }
}

// 定时器版
export function throttle2 (fn, wait) {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(context, args)
      timer = null
    }, wait)
  }
}