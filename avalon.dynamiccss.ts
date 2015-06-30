/*!
 * avalon dynamic css plugin 1.0 (20150501)
 * 动态 CSS 库，使得你可以借助 MVVM 模式动态生成和更新 css，从而将本插件到来之前，打散、嵌套在 js 中的修改样式的代码剥离出来。
 * https://github.com/RubyLouvre/avalon
 *
 * By darklx，664856248@qq.com
 */
/// <reference path="jquery.d.ts" />
(function (avalon, $: JQueryStatic, win: Window, doc: HTMLDocument) {
    "use strict;"
    var ie = doc.createElement("style").styleSheet;

    function insertAfter(newElement, targetElement) {
        var parent = targetElement.parentNode;
        if (parent.lastChild == targetElement) {
            // 如果最后的节点是目标元素，则直接添加。因为默认是最后
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement, targetElement.nextSibling);
            //如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面。
        }
    }

    // <style ms-dynamiccss="~/Content/Portal/Portal.js.css"> 元素绑定的时候执行（初始化 ms-animate 绑定）
    avalon.bindingHandlers.dynamiccss = function (data, vmodels) {
        var el = data.element;
        var styleElement: HTMLStyleElement = el;
        if (styleElement.tagName != "STYLE") {
            styleElement = doc.createElement("style");
            insertAfter(styleElement, el);
        }
        styleElement.type = "text/css";
        data.styleElement = styleElement;
        var url = data.value;
        if (!url) { // 解析内联 css 代码
            //debugger;
            var code = el.tagName != "STYLE" ? el.innerText : ie ? (<any>styleElement).cssText : styleElement.textContent
            if (code) avalon.parseExprProxy(code, vmodels, data, avalon.scanExpr(code));// parseExprProxy 这个是 avalon 内部方法（需要对 avalon js 源码做一句改动，把那个内部方法暴露出来，avalon 第 3191 行）
            return;
        }
        // 加载远程 dynamic css 文件
        $.get(url, function (code: string) {
            var onload = styleElement.onload;
            if (onload) onload.apply(styleElement, [code]);
            if (!code || code.length == 0) {
                return;
            }
            // 解析 css 表达式
            avalon.parseExprProxy(code, vmodels, data, avalon.scanExpr(code));
        }).fail(function () {
                var onerror = styleElement.onerror;
                if (onerror) onload.apply(styleElement, arguments);
            });
    }

    // avalon 会在表达式计算的结果变化时（也可以认为是 View Model 里的属性产生变化时），触发此回调
    // val:也就是计算后的 css
    avalon.bindingExecutors.dynamiccss = function (val, elem, data, vmodel) {
        if (data.oldVal == val) {// 如果 css 无变化
            return;
        }
        data.oldVa = val;
        var styleElement = data.styleElement;
        if (ie) {
            //setTimeout(function () {
            styleElement.cssText = val;
            //}, 0);
        } else {
            //setTimeout(function () {
            styleElement.textContent = val;
            //}, 0);
        }
        var onchange = elem.onchange;
        if (onchange) onchange.apply(elem, [val]);
    }

})((<any>window).avalon, jQuery, window, document);// 这里并不是必须依赖 jQuery ，只是用了 jQuery 的 $.get ，如果你的项目不想引入 jQuery，也是可以的，传入 具有相同 get 方法功能的对象即可