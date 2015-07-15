# dynamic-css

## dynamic-css 初次开源，大家多多提意见 :-)

* 使得你可以借助 MVVM 模式动态生成和更新 css，从而将本插件到来之前，打散、嵌套在 js 中的修改样式的代码剥离出来：比如你要做元素跟随鼠标移动，或者根据滚动条位置的变化而触发一些效果，原本你要写 js 去绑定滚动事件，然后计算偏移量，然后更新元素 css，现在，你只要根据语法去写好 css 表达式就可以了。
* 一些原本需要复杂的 js 判断的动态 css，用 dynamic css 表达式几行代码搞定。
* 实际项目中复杂布局的情况下有用。
* 基于 avalon js http://avalonjs.github.io ，因此 avalon js 的插值表达式所支持的特性，Dynamic Css 也支持。

## 示例：元素跟随鼠标移动

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>元素跟随鼠标移动 - DynamicCss Demo</title>
    <meta http-equiv="X-UA-Compatible" content="IE=11,chrome=1" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <script src="jquery.js"></script>
    <script src="avalon.shim.js"></script>
    <script src="avalon.dynamiccss.js"></script>
    <script src="layout.js"></script>
</head>
<body>
    <style type="text/dynamiccss" ms-controller="layout" ms-dynamiccss>
        .mouse-follow {
            position: absolute;
            top:{{layout.mouse.pageY}}px;
            left:{{layout.mouse.pageX}}px;
        }
    </style>

    <div class="mouse-follow">为什么追我</div>

</body>
</html>
```


## 示例：页面滚动到一定距离时，元素发生变化
```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>页面滚动到一定距离时，元素发生变 - DynamicCss Demo化</title>
    <meta http-equiv="X-UA-Compatible" content="IE=11,chrome=1" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <script src="jquery.js"></script>
    <script src="avalon.shim.js"></script>
    <script src="avalon.dynamiccss.js"></script>
    <script src="layout.js"></script>
</head>
<body>
    <style>
        html { width: 640px;margin:0 auto; }
        .content-sum {
            display: none;
            position: fixed;
            width:640px;
            top: 0;
            background: #808080;
            height:50px;
            line-height:50px;
            text-align:center;
        }
       .content-full{
            height:9000px;
        }
    </style>
    <style type="text/dynamiccss" ms-controller="layout" ms-dynamiccss>
        .content-sum {
            display:{{layout.doc.scrollTop > 135 ? "block" : "none"}}; /* 这里面可以写 js 代码，可以调用 js 方法，基本无限制 */
        }
    </style>

    <b>往下滚动试试</b>

    <div class="big-box">
        <div class="content-sum">经过不懈的努力取得的结果和别人通过关系取得的结果一样甚至更差，那努力还有什么..</div>
        <h1 class="title">经过不懈的努力取得的结果和别人通过关系取得的结果一样甚至更差，那努力还有什么意义呢？</h1>
        <div class="content-full">
            考研过，失败过，后来也成功过。<br /><br />
            去考研论坛围观过连续7战的奇葩，围观过为了考研抛弃女友、抛弃人际关系奋力一战的汉子，围观过被考研折磨的精神失常的病人，也认识大学玩四年，考研复习两个月既考上985（理工科考研，非文科）院校天赋灵异的奇才
			.....
        </div>

    </div>
</body>
</html>

```
