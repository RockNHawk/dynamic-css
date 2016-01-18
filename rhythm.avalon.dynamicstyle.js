/// <reference path="avalon.shim.js" />
/// <reference path="jquery.js" />

/*!
* avalon dynamic css plugin 1.0 (20150501)
* 动态 CSS 库，使得你可以借助 MVVM 模式动态生成和更新 css，从而将本插件到来之前，打散、嵌套在 js 中的修改样式的代码剥离出来。
* https://github.com/RubyLouvre/avalon
*
* By darklx，664856248@qq.com
*/
(function (avalon, loadUrl, win, doc) {
    "use strict;";
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
    };

    // 解析 css 表达式
    var parseExpr = function (code, binding) {
        if (code && code.length) {
            var exprCode = avalon.normalizeExpr(code);
            binding.expr = exprCode;
        }
    };

    // <style ms-dynamicstyle="~/Content/Portal/Portal.js.css"> 元素绑定的时候执行（初始化 ms-animate 绑定）
    avalon.directive("dynamicstyle", {
        priority: 100,
        init: function (binding) {
            var el = binding.element;//, vmodels = binding.vmodels;
            var styleElement = el;
            if (styleElement.tagName != "STYLE") {
                styleElement = doc.createElement("style");
                insertAfter(styleElement, el);
            }
            styleElement.type = "text/css";

            // avalon 会在表达式计算的结果变化时（也可以认为是 View Model 里的属性产生变化时），触发此回调
            // newValue:也就是计算后的 css
            binding.handler = function (newValue, oldValue) {
                //debugger
                updateCss(styleElement, newValue)
                var onchange = el.onchange;
                if (onchange) onchange.apply(el, [val])
            };

            switch (binding.param) {
                case "style":
                case "css":
                    var classId = "dynamicstyle-" + Date.parse(new Date());
                    el.className += " " + classId;
                    parseExpr("." + classId + "{\n" + binding.expr + "\n}", binding);
                    break;
                case "url": // 加载远程 dynamic css 文件
                    var url = binding.expr;
                    if (url) {
                        loadUrl(url, function (code) {
                            var onload = styleElement.onload;
                            if (onload) onload.apply(styleElement, [code]);
                            parseExpr(code, binding);
                            // 添加 css 表达式 vm 绑定
                            avalon.injectBinding(binding);
                        }).fail(function () {
                            var onerror = styleElement.onerror;
                            if (onerror) onerror.apply(styleElement, arguments);
                        });
                    }
                    break;
                case "":
                default:
                    //setTimeout(function () {
                    parseExpr(el.tagName != "STYLE" ? el.innerText : ie ? styleElement.cssText : styleElement.textContent, binding);
                    //},100);
                    break;
            }
            //binding.expr = "";
            //debugger
        }
    })


    var updateCss = function (styleElement, value) {
        if (ie) {
            //setTimeout(function () {
            styleElement.cssText = value;
            //}, 0);
        } else {
            //setTimeout(function () {
            styleElement.textContent = value;
            //}, 0);
        }

    };

})(window.avalon, $.get, window, document); // 这里并不是必须依赖 jQuery ，只是用了 jQuery 的 $.get ，如果你的项目不想引入 jQuery，也是可以的，传入 具有相同 get 方法功能的对象即可
