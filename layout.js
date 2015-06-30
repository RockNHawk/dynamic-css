// 全局的 layout View Model，里面放 window、body 宽高，鼠标位置等通用信息
// 你也可以定义自己的 View Model，没有限制
layout = avalon.define("layout", function (vm) {
    vm.win = {
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
        outerHeight: window.outerHeight,
        outerWidth: window.outerWidth,
    };
    vm.doc = {
        scrollTop: 0, scrollLeft: 0, scrollWidth: 0, scrollHeight: 0
    }
    //vm.topNavbar = { height: 50 };
    vm.body = { clientHeight: 0, clientWidth: 0, scrollTop: 0, scrollLeft: 0, scrollWidth: 0, scrollHeight: 0 };
    vm.content = { height: 0, width: 0 };
    vm.mouse = { pageX: 0, pageY: 0 };
    vm.reset = function (window) {
        var doc = window.document;
        vm.resetWindow(window);
        vm.resetScroll(doc);
    };
    vm.resetWindow = function (window) {
        var doc = window.document;
        vm.win.innerHeight = window.innerHeight;
        vm.win.innerWidth = window.innerWidth;
        vm.win.outerHeight = window.outerHeight;
        vm.win.outerWidth = window.outerWidth;
        var body = doc.body;
        if (body) {
            vm.body.clientHeight = body.clientHeight;
            vm.body.clientWidth = body.clientWidth;
            vm.content.height = vm.win.innerHeight - 50;//vm.topNavbar.height;
            vm.content.width = vm.body.clientWidth;
        }
    };
    vm.resetScroll = function (doc) {
        var de = doc.documentElement;
        var st = de && de.scrollTop || doc.body.scrollTop;
        var sl = de && de.scrollLeft || doc.body.scrollLeft;
        var sw = de && de.scrollWidth || doc.body.scrollWidth;
        var sh = de && de.scrollHeight || doc.body.scrollHeight;
        vm.body.scrollTop = st;
        vm.body.scrollLeft = sl;
        vm.body.scrollWidth = sw;
        vm.body.scrollHeight = sh;
        vm.doc.scrollTop = st;
        vm.doc.scrollLeft = sl;
        vm.doc.scrollWidth = sw;
        vm.doc.scrollHeight = sh;
    };
    return vm;
});
resetLayout = function () { layout.reset(window); };
$(window).resize(resetLayout).scroll(function () {
    layout.resetScroll(document);
});
$(document).mousemove(function (e) {
    //debugger;
    layout.mouse.pageX = e.pageX;
    layout.mouse.pageY = e.pageY;
});
$(function () {
    setTimeout(resetLayout, 1);
    setTimeout(resetLayout, 1000);
});