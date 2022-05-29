// Promise es6

class MyPromise {
  constructor(executor) {
    this.initValue()
    this.initBind()
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }
  initValue () {
    this.promiseResult = null
    this.promiseState = 'pending'
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
  }
  initBind () {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }
  resolve (value) {
    if (this.promiseState !== 'pending') return
    this.promiseState = 'fulfilled'
    this.promiseResult = value
    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(this.promiseResult)
    }
  }
  reject (value) {
    if (this.promiseState !== 'pending') return
    this.promiseState = 'rejected'
    this.promiseResult = value
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(this.promiseResult)
    }
  }
  then (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw (reason) }
    var thenPromise = new MyPromise((resolve, reject) => {
      const resolvePromise = cb => {
        setTimeout(() => {
          try {
            const x = cb(this.promiseResult)
            if (x === thenPromise) {
              throw new Error('不能返回自身')
            }
            if (x instanceof MyPromise) {
              x.then(resolve, reject)
            } else {
              resolve(x)
            }
          } catch (err) {
            reject(err)
            throw new Error(err)
          }
        }) 
      }
      if (this.promiseState === 'fulfilled') {
        resolvePromise(onFulfilled)
      }
      else if (this.promiseState === 'rejected') {
        resolvePromise(onRejected)
      }
      else if (this.promiseState === 'pending') {
        this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled))
        this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected))
      }
    })
  
    // if (this.promiseState === 'fulfilled') {
    //   onFulfilled(this.promiseResult)
    // }
    // else if (this.promiseState === 'rejected') {
    //   onRejected(this.promiseResult)
    // }
    // else if (this.promiseState === 'pending') {
    //   this.onFulfilledCallbacks.push(onFulfilled.bind(this))
    //   this.onRejectedCallbacks.push(onRejcted.bind(this))
    // }
    return thenPromise
  }
  static all (promises) {
    const result = []
    let count = 0
    return new MyPromise((resolve, reject) => {
      let addData = (index, value) => {
        result[index] = value
        count++
        if (count === promises.length) return resolve(result)
      }
      promises.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(res => {
            addData(index, res)
          }, err => reject(err))
        } else {
          addData(index,promise)
        }
      })
    })
  }
  static race (promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        if (promise instanceof MyPromise) {
          promise.then(res => {
            resolve(res)
          }, err => reject(err))
        } else {
          resolve(promise)
        }
      })
    })
  }
}