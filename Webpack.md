# Webpack



### 1.什么是webpack

webpack是一个静态模块打包工具，可以用它管理项目中各个模块之间的依赖。而且对于不同类型的依赖，webpack都有对应的模块加载器。五个核心概念：entry， output，loader，plugin，mode。

### 2. entry

entry: 用来写入口文件，它将是整个依赖关系的根,webpack就是从该入口文件开始构建项目的依赖

```javascript
module.exports = {
  entry: {
    app: './src/app.js'
  }
};
```

### 3. output

**output** 属性告诉 webpack 在哪里输出它所创建的 *bundle*，以及如何命名这些文件.

```javascript
const path = require('path');//node 自带的包， 通过npm init 引入

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
```

### 4.loader（模块加载器）

Webpack把一切文件都视为模块，但是原生的js只能解析js文件，如果其它文件格式也想打包的话就需要用到loader。所以loader的作用是使webpack拥有了**加载和解析非javascript**的能力。**它能实现对不同格式的文件处理**，比如将scss转换成css、Typescript转换成js等。转换这些文件，从而使其能够被添加到依赖图中



在 webpack 的配置中 **loader** 有两个属性：

1. `test` 属性，用于标识出应该被转换的文件。
2. `use` 属性，表示进行转换时，应该使用哪个 loader。

```javascript
module.exports = {

  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};
```

### 5.插件(plugin)

plugin用来扩展webpack的功能，让webpack拥有更多的灵活性。**它并不是直接操作单个文件**，而是直接对整个构建过程起作用的，包括：打包优化，资源管理，注入环境变量。

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
module.exports = {

  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```

`html-webpack-plugin` 为应用程序生成 HTML 一个文件，并**自动注入**所生成的 **bundle**。

> 区别总结 : loader实现对不同格式文件的处理，转换这些文件，使其可以被添加到依赖图当中。plugin是用来扩展webpack的功能，不是直接操作文件。它由丰富的自定义api和生命周期事件，从而控制webpack打包流程的每个环节。这是loader做不到的。

### 6.模式(mode)

通过 设置 mode参数，来启用 webpack 相应内置的构建环境。

 

```javascript
module.exports = {
  mode: 'production'// ||development||mode
};
```

### 7. devServer

devServer是webpack提供的本地开发服务器，是基于node.js搭建的，它可以让浏览器自动刷新来显示我们修改后的结果。

```javascript
//npm install webpack-dev-server --save-dev
module.exports = {
  //...
  devServer: {
    contentBase: path.join(__dirname, 'dist'),//为哪个文件提供本地服务
    compress: true,
    port: 9000,
    inline:true //页面实时刷新
  }
};
```

> 注意：dev 编译生产的文件是缓存在内存中的，浏览器从内存中获取文件数据，所以能够实时更新页面。

此外，在*package.json* 文件，配置相应的快捷键

package.json

```javascript
{
    "name": "webpack-demo",
    "version": "1.0.0",
    "description": "",
    "scripts": {
      "dev": "webpack-dev-server --open"
    }
 }                                       
```

之后执行以下命令即可

```javascript
npm run dev
```



### 7.配置文件分离

<img src="C:\Users\67564\Desktop\面试\Frontend-interview\images\webpack01.png" alt="webpack01" style="zoom:67%;" />

<img src="C:\Users\67564\Desktop\面试\Frontend-interview\images\webpack02.png" alt="webpack02" style="zoom:67%;" />

<img src="C:\Users\67564\Desktop\面试\Frontend-interview\images\webpack00.png" alt="webpack00" style="zoom:67%;" />

最后修改output

```javascript
module.exports = {

  output: {
  -  path: path.resolve(__dirname, 'dist'),
  +  path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js'
  }
};
```

### 8.核心原理

- 一切皆模块
  - js,css,image和html文件都可以视为模块,通过require加载
- 按需加载
  - Webpack使用许多特性来分割代码然后生成多个“bundle”文件，通过异步加载部分代码来实现按需加载功能

### 9. webpack构建流程

Webpack的运行过程是个串行的过程，从启动到结束会依次执行以下流程：



1. **初始化参数**:从配置文件和shell语句中读取与合并参数，得出最终参数。
2. **开始编译**:用得到的参数初始化compiler对象，加载所有配置的插件，执行对象的**Run**方法开始编译。
3. **确定入口**:根据配置中的**entry**找出所有入口文件。
4. **编译模块**:从入口文件出发，调用所有配置的loader对模块进行翻译，再找出该模块所依赖的模块**，**再递归本步骤。直到所有入口依赖文件都经过了本步骤的处理。（此处为深度优先遍历）
5. **完成模板编译**:使用loader翻译完所有模块后，得到每个模块被翻译后的最终内容，以及它们之间的**依赖关系**。
6. **输出资源**:根据入口和模块之间的依赖关系，**组装成一个个包含多个模块的chunk**，再把每个 Chunk 转换成一个单独的文件加入到**输出列表**，这步是可以修改输出内容的最后机会。
7. **输出完成**：在确定好输出内容后，根据配置**确定输出的路径和文件名**，把文件内容写入到文件系统。



### 10. Webpack 常用的插件？

1.clean-webpack-plugin

　运行webpack build时先把打包进入的文件夹清空

2.html-webpack-plugin

可以动态的去创 HTML 文件，用于服务器访问

3.HotModuleReplacementPlugin  

模块热替换插件，页面自动刷新修改内容　，是webpack 内置插件

4.happypack

能使得webpack进行node多线程构建项目，从而提高构建速度

5.uglifyjs-webpack-plugin

对js文件进行压缩并且结合tree shaking删除未引用代码

6.imagemin-webapack-plugin

对项目中的图片进行压缩