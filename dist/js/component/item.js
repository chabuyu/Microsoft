"use strict";define(["jquery","template"],function(n,l){function o(){}return o.prototype.init=function(e){console.log(e),new Promise(function(o,t){console.log(e),n("#list_items").load("http://localhost:2000/html/component/item.html",function(){o()})}).then(function(){n.ajax({url:e,type:"get",success:function(o){if(console.log(o),1===o.res_code){var t=o.res_body.data;console.log(t),console.log(l);var e=l("list_template",{list:t});console.log(e),n("#list_items ul").html(e)}}})})},new o});