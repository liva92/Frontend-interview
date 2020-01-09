## 一.computed和watch有什么区别?

computed:

1. `computed`是计算属性,也就是计算值,它更多用于计算值的场景
2. `computed`具有缓存性,computed的值在getter执行后是会缓存的，只有在它依赖的属性值改变之后，下一次获取computed的值时才会重新调用对应的getter来计算
3. `computed`适用于计算比较消耗性能的计算场景

watch:

1. 更多的是「观察」的作用,类似于某些数据的监听回调,用于观察`props` `$emit`或者本组件的值,当数据变化时来执行回调进行后续操作
2. 无缓存性，页面重新渲染时值不变化也会执行

小结:

1. 当我们要进行数值计算,而且依赖于其他数据，那么把这个数据设计为computed
2. 如果你需要在某个数据变化时做一些事情，使用watch来观察这个数据变化

## 二、vuex如何使用

### 2.1 什么是vuex

官方解释：Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

可以简单理解为：把多个组件共享的变量全部存储在一个对象里面，然后将这个对象放在顶层的Vue实例中，让其他组件可以使用

特点：是单例和响应式,

<img src="C:\Users\67564\Desktop\面试\Frontend-interview\images\vuex.png" alt="vuex" style="zoom:50%;" />

### 2.2 什么情况下我应该使用 Vuex？

如果您需要构建一个中大型单页应用,多个状态，在多个界面间共享时，比如

+ 用户登录状态、用户信息、地理位置等

+ 商品收藏、购物车的物品

### 2.3 如何使用Vuex

每一个 Vuex 应用的核心就是 store（仓库),创建过程如下:

```javascript
// store/index.js
import vue from 'vue';
//1.引入vuex
import Vuex from 'vuex';

//2.安装vuex
vue.use(Vuex);

//3.创建store对象
const store = new Vuex.Store({
  state: {
    counter: 100
  },
  mutations: {
    //方法
    increment(state) {
      state.counter++;
    }
  }
});

//4.导出store对象
export default store;

```

其次，在根实例中注册 `store` 选项，该 store 实例会注入到根组件下的所有子组件中

```javascript
//main.js
import Vue from 'vue';
import App from './App';
import store from './store';
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store
}).$mount('#app');
```

之后，子组件可以通过 `$store.state` 来获取状态对象，以及通过 `$store.commit` 方法触发状态变更

```javascript
// App.vue
<template>
  <div id="app">
    //获取store中的状态变量
    <h2>{{$store.state.counter}}</h2>
    <button @click="add">+</button>
  </div>
</template>

<script>
import Hello from "./components/Hello";
export default {
  name: "app",
  components: {
    Hello
  },
  data() {
    return {
      message: "woshizujian"
    };
  },
  methods: {
    add() {
      //触发状态改变
      this.$store.commit("increment");
    }
  }
};
</script>



```

### 2.4 vue.set() 

当需要在对象上添加新属性时，应该

- 使用 `Vue.set(obj, 'newProp', 123)`, 或者
- 以新对象替换老对象。例如，利用[对象展开运算符 ](https://github.com/tc39/proposal-object-rest-spread)我们可以这样写

```javascript
state.obj = { ...state.obj, newProp: 123 }
```

通过以上方法变更状态，store中的状态才是响应式的，监视状态的 Vue 组件才会自动更新。

![1577172944080](C:\Users\67564\Desktop\面试\Frontend-interview\images\vue01.png)

### 三、vue响应式原理

<img src="C:\Users\67564\Desktop\面试\Frontend-interview\images\vue02.png" alt="vue02" style="zoom:60%;" />

+ 在 `new Vue()` 后， Vue 会调用`_init` 函数进行初始化，也就是init 过程，在 这个过程Data通过Observer转换成了getter/setter的形式，来对数据追踪变化，当被设置的对象被读取的时候会执行`getter` 函数，而在当被赋值的时候会执行 `setter`函数。

+ 当render function 执行的时候，因为会读取所需对象的值，所以会触发getter函数从而将Watcher添加到依赖中进行依赖收集。

+ 在修改对象的值的时候，会触发对应的`setter`， `setter`通知之前**依赖收集**得到的 Dep 中的每一个 Watcher，告诉它们自己的值改变了，需要重新渲染视图。这时候这些 Watcher就会开始调用 `update` 来更新视图。



### 四、vue-router使用方式



1:下载 

`npm i vue-router -S`
2:在main.js中引入 

`import VueRouter from 'vue-router'`;
3:安装插件

`Vue.use(VueRouter)`;
4:创建路由对象并配置路由规则 :

`let router = new VueRouter({routes:[{path:'/home',component:Home}]})`;
5:将其路由对象传递给Vue的实例，

options中加入 `router:router`
6:在app.vue中留坑 

`<router-view></router-view>`

```javascript

import Vue from 'vue';
import VueRouter from 'vue-router';
//主体
import App from './components/app.vue';
import Home from './components/home.vue'
//安装插件
Vue.use(VueRouter); //挂载属性
//创建路由对象并配置路由规则
let router = new VueRouter({
    routes: [
        //一个个对象
        { path: '/home', component: Home }
    ]
});
//new Vue 启动
new Vue({
    el: '#app',
    router
    render: c => c(App),
})

//最后记得在在app.vue中“留坑”

//app.vue中
<template>
    <div>
        <!-- 留坑，非常重要 -->
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data(){
            return {}
        }
    }
</script>
```

