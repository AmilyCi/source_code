// 防抖

// 简易版
export function debounce (fn, wait) {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}

// 立即执行版
export function immediateDebounce (fn, wait, immediate) {
  let timer = null
  return function () {
    let args = arguments
    let context = this
    if (timer) clearTimeout(timer)
    if (immediate) {
      let callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) fn.apply(context, args)
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, wait)
    }
  }
}