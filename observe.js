/*
 * @Author: liva
 * @Date: 2020-03-02 16:17:57
 * @LastEditors: liva
 * @LastEditTime: 2020-03-02 17:51:25
 */

//更新视图
// function update() {}

//重新定义属性，监听起来
function defineReactive(target, key, value) {
  //深度监听
  observer(value);

  //核心 API
  Object.defineProperty(target, key, {
    get() {
      return value;
    },
    set(newValue) {
      if (newValue !== value) {
        //深度监听
        observer(newValue);
      }
      //设置新值
      value = newValue;

      console.log('update');
    }
  });
}

//重新定义数组原型
let oldArrayPro = Array.prototype;
//创建新对象，原型指向 oldArrayPro ，在扩展新的方法不会影响原型
let newArrayPro = Object.create(oldArrayPro);
['push', 'pop', 'shift', 'unshift'].forEach(item => {
  newArrayPro[item] = function() {
    console.log('update'); //触发视图更新
    oldArrayPro[item].call(this, ...arguments);
  };
});

//监听对象属性
function observer(target) {
  if (typeof target !== 'object' || target === null) {
    //不是对象或者数组
    return target;
  }

  if (Array.isArray(target)) {
    target._proto_ = newArrayPro;
  }

  for (let key in target) {
    defineReactive(target, key, target[key]);
  }
}
const data = {
  name: 'liva',
  age: 28,
  info: {
    address: '清远'
  },
  nums: [1, 2, 3]
};
observer(data);
