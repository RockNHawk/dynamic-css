// 全局的 layout View Model，里面放 window、body 宽高，鼠标位置等通用信息
// 你也可以定义自己的 View Model，没有限制
dynamicStyle = avalon.define({
    $id: "dynamicStyle",
    layout: {
        win: {
            innerHeight: window.innerHeight,
            innerWidth: window.innerWidth,
            outerHeight: window.outerHeight,
            outerWidth: window.outerWidth,
        },
        doc: {
            scrollTop: 0, scrollLeft: 0, scrollWidth: 0, scrollHeight: 0
        },
        //vm.topNavbar = { height: 50 };
        body: { clientHeight: 0, clientWidth: 0, scrollTop: 0, scrollLeft: 0, scrollWidth: 0, scrollHeight: 0 },
        content: { height: 0, width: 0 },
        mouse: { pageX: 0, pageY: 0 },
        reset: function (window) {
            var doc = window.document;
            dynamicStyle.layout.resetWindow(window);
            dynamicStyle.layout.resetScroll(doc);
        },
        resetWindow: function (window) {
            var doc = window.document;
            dynamicStyle.layout.win.innerHeight = window.innerHeight;
            dynamicStyle.layout.win.innerWidth = window.innerWidth;
            dynamicStyle.layout.win.outerHeight = window.outerHeight;
            dynamicStyle.layout.win.outerWidth = window.outerWidth;
            var body = doc.body;
            if (body) {
                dynamicStyle.layout.body.clientHeight = body.clientHeight;
                dynamicStyle.layout.body.clientWidth = body.clientWidth;
                dynamicStyle.layout.content.height = dynamicStyle.layout.win.innerHeight - 50;//vm.topNavbar.height;
                dynamicStyle.layout.content.width = dynamicStyle.layout.body.clientWidth;
            }
        },
        resetScroll: function (doc) {
            var de = doc.documentElement;
            var st = de && de.scrollTop || doc.body.scrollTop;
            var sl = de && de.scrollLeft || doc.body.scrollLeft;
            var sw = de && de.scrollWidth || doc.body.scrollWidth;
            var sh = de && de.scrollHeight || doc.body.scrollHeight;
            dynamicStyle.layout.body.scrollTop = st;
            dynamicStyle.layout.body.scrollLeft = sl;
            dynamicStyle.layout.body.scrollWidth = sw;
            dynamicStyle.layout.body.scrollHeight = sh;
            dynamicStyle.layout.doc.scrollTop = st;
            dynamicStyle.layout.doc.scrollLeft = sl;
            dynamicStyle.layout.doc.scrollWidth = sw;
            dynamicStyle.layout.doc.scrollHeight = sh;
        }
    }
});
resetLayout = function () { dynamicStyle.layout.reset(window); };
$(window).resize(resetLayout).scroll(function () {
    dynamicStyle.layout.resetScroll(document);
});
$(document).mousemove(function (e) {
    //debugger;
    dynamicStyle.layout.mouse.pageX = e.pageX;
    dynamicStyle.layout.mouse.pageY = e.pageY;
});
$(function () {
    setTimeout(resetLayout, 1);
    setTimeout(resetLayout, 1000);
});