# Webpack

### 1.什么是webpack

webpack是一个静态模块打包工具，可以用它管理项目中各个模块之间的依赖。而且对于不同类型的依赖，webpack都有对应的模块加载器。

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

webpack 本身只能打包 JS和 JSON 文件。如果需要打包其他类型的文件，如.css，图片等，就需要借用**loader**，**loader**可以将它们转换为有效 模块，以供程序使用，以及被添加到依赖图中。

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

loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务,以扩展webpack功能，包括：打包优化，资源管理，注入环境变量。

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
module.exports = {

  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```

`html-webpack-plugin` 为应用程序生成 HTML 一个文件，并**自动注入**所有生成的 **bundle**。

### 6. devServer

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

<img src="C:\Users\67564\Desktop\面试\images\webpack01.png" alt="webpack01" style="zoom:67%;" />

<img src="C:\Users\67564\Desktop\面试\images\webpack02.png" alt="webpack02" style="zoom:67%;" />

<img src="C:\Users\67564\Desktop\面试\images\webpack00.png" alt="webpack00" style="zoom:67%;" />

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

