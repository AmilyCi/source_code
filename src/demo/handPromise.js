import { resolve } from "core-js/fn/promise"

function myPromise (excutor) {
  let self = this
  self.status = 'pending'
  self.value = null // 成功的结果
  self.reason = null // 失败的原因
  self.onFulfilledCallbacks = []
  self.onRejectdCallbacks = []
  function resolve (value) { 
    if (self.status === 'pending') {
      self.value = value
      self.status = 'fulfilled'
      
    }
  }
  function reject (reason) { 
    if (self.status === 'pending') {
      self.value = reason
      self.status = 'rejected'
    }
  }
  try {
    excutor(resolve, reject)
  } catch (err) {
    reject(err)
  }
}
myPromise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ?
    onFulfilled : function (data) { resolve(data) }
  onRejected = typeof onRejected === 'function' ?
    onRejectd : function (err) { throw err }
  if (this.status === 'pending') {
    this.onFulfilledCallbacks.push(onFulfilled)
    this.onRejectdCallbacks.push(onRejected)
  }
}