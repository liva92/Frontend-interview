# Javascript 二

标签： Javascript

---
# 安全
### 1.什么是CSRF攻击，如何预防
CSRF全称 Cross Site Request Forgery, 跨站域请求伪造.CSRF是一种夹持用户在已经登陆的web应用程序上执行非本意的操作的攻击方式。相比于XSS，CSRF是利用了系统对页面浏览器的信任，XSS则利用了系统对用户的信任。

要完成一次CSRF攻击，受害者必须完成两个步骤：

1. 登录受信任网站A,并在本地生成cookie,
2. 在不登出A的情况下，访问危险网站B.

 目前防御 CSRF 攻击主要有三种策略：

+ 验证 HTTP Referer 字段；

+ 在请求地址中添加 token 并验证；

+ 在 HTTP 头中自定义属性并验证。

总的思想是一致的，就是在客户端页面增加伪随机数。



### 2.什么是XSS攻击，如何预防

XSS（Cross  Site Scripting）攻击指的是攻击者向Web页面插入恶意的HTML标签或者Javascript代码。比如，攻击者向论坛放一个看似安全的链接，骗取用户单击并窃取cookie中的用户私密信息。

目前防御 XSS 攻击有以下两种策略：

+ 在代码里对用户的输入和变量都需要做长度检查和字符过滤；
+ 把任何内容写到页面前都进行编码，避免泄露htmltag。

# css
### gif /jpge/png
#### 1.特性：

> JPG的主要特性是有损压缩，颜色种类丰富，非透明背景。

> GIF的主要特性是帧动画，只有256种颜色，（注意GIF不支持半透明，只能完全透明或者不透明。）
>
> PNG的主要特性是半透明。

#### 2.如何选择格式？

> 照片用 JPG。
> 动画用 GIF。
> Logo、Icon 等小图用 PNG-8。
> 非特殊情况，尽量不要用 PNG-24 和 PNG-32。

# js 
### 一、【ES6】迭代器与可迭代对象

可迭代对象的特点
1. 具有 Symbol.iterator 属性，Symbol.iterator() 返回的是一个遍历器对象
2. 可以使用 for ... of 进行循环
3. 通过被 Array.from 转换为数组



原生具有 Iterator 接口的数据结构：
 - Array 
 - Map 
 - Set 
 - String 
 - TypedArray 
 - 函数的 arguments 对象 
 - NodeList 对象

