<template>
  <h1>1、防抖（debounce）</h1>
  <h1>2、节流（throttle）</h1>
  <h1>3、深拷贝（deepClone）</h1>
  <h1>4、call、apply、bind</h1>
</template>

<script>
// import { debounce, immediateDebounce } from './demo/debounce'
import { deepClone1 } from './demo/deepClone'
export default {
  name: 'App',
  mounted () {
    // debounce()
    // immediateDebounce()
    // let obj1 = {
    //   a: 2,
    //   b: {
    //     c: 3,
    //     d: [1, 2, 3]
    //   }
    // }
    // obj1.e = obj1
    // let obj2 = deepClone(obj1)
    // console.log('obj2', obj2)
    // obj2.b.d = [7, 8, 9]
    // console.log('obj1', obj1)
    // console.log('obj2222', obj2)

    const map = new Map();
    map.set('key', 'value');
    map.set('ConardLi', 'code秘密花园');

    const set = new Set();
    set.add('ConardLi');
    set.add('code秘密花园');

    const target = {
      field1: 1,
      field2: undefined,
      field3: {
        child: 'child'
      },
      field4: [2, 4, 8],
      empty: null,
      map,
      set,
      bool: new Boolean(true),
      num: new Number(2),
      str: new String(2),
      symbol: Object(Symbol(1)),
      date: new Date(),
      reg: /\d+/,
      error: new Error(),
      func1: () => {
        console.log('code秘密花园');
      },
      func2: function (a, b) {
        return a + b;
      }
    }
    let newTarget = deepClone1(target)
    console.log(newTarget)
  },
  methods: {
  }
}
</script>

<style>
</style>
