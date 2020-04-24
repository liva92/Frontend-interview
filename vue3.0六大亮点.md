# vue3.0六大亮点

### 一、编译模板的优化

Vue在运行时会生成number（大于0）值的PatchFlag，用作标记。

仅带有PatchFlag标记的节点会被真正追踪，且无论层级嵌套多深，它的动态节点都直接与Block根节点绑定，无需再去遍历静态节点。

静态节点在应用启动的时候只创建一次，更新渲染的时候就复用。

### 二、 事件监听缓存cacheHandlers

假设我们要绑定一个onClick事件，

```html
<div>
  <span @click="onClick">
    {{msg}}
  </span>
</div>
```

编译后为：

```javascript
import { toDisplayString as _toDisplayString, createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export function render(_ctx, _cache) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("span", {
      onClick: _cache[1] || (_cache[1] = $event => (_ctx.onClick($event)))
    }, _toDisplayString(_ctx.msg), 1 /* TEXT */)
  ]))
}

```

`cache[1]`，会自动生成并缓存一个内联函数，“神奇”的变为一个静态节点。
适合用于组件的复用。

### 三、Tree-shaking

可以将无用模块“剪辑”，仅打包需要的（比如v-model,，用不到就不会打包）。如 `<input type="text">`，只会引入text相关的逻辑，其他type的逻辑不会被引入，可做成了按需引入。

### 四 、Composition API

可与现有的 Options API一起使用 ,以下是6个为主要的api

`reactive 、computed、ref、readonly、watchEffect、 watch`。

混入(`mixin`) 将不再作为推荐使用， `Composition API`可以实现更灵活且无副作用的复用代码。

### 五、Fragment（碎片）

不再限于模板中的单个根节点 ，可以只是纯文本。
render 函数也可以返回数组了，类似实现了 React.Fragments 的功能

#### 5.1 、Teleport

译作传送门，可以接受一个disable参数，如果disable=true,组件就会挂载在到渲染树不渲染；disable=false时，组件重新渲染到页面上。

#### 5.2、Suspense

- 支持async setup() 
- 支持异步组件。

Suspense可以等promise  resove后，再把渲染树渲染出来，就可以实现嵌套的异步调用



### 六、更好的TypeScript支持

- `Vue 3`是用`TypeScript`编写的库，可以享受到自动的类型定义提示
- `JavaScript`和中的API是相同的。 
- 支持`TSX`
- `class`组件还会继续支持，但是需要引入`vue-class-component@next`，该模块目前还处在 alpha 阶段

[参考链接]: https://juejin.im/post/5e9f6b3251882573a855cd52	"尤雨溪在Vue3.0 Beta直播里聊到了这些"

