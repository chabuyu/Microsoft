"use strict";function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,n){for(var i=0;i<n.length;i++){var t=n[i];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function _createClass(e,n,i){return n&&_defineProperties(e.prototype,n),i&&_defineProperties(e,i),e}define(["jquery","cookie"],function(){return new(function(){function e(){_classCallCheck(this,e),this.init()}return _createClass(e,[{key:"init",value:function(){new Promise(function(e,n){$(".add_car").load("/html/component/add_btn.html",function(){e(),console.log()})}).then(function(){$(function(){var o=location.search.slice(1).split("=");({})[o[0]]=o[1],$(".add_car_btn").on("click",function(){var i,e=$.cookie("shopping")?JSON.parse($.cookie("shopping")):[],t={};t.size=$(".ace_size").text(),t.price=$(".price_block").find(".current").text().slice(1),t.deploy=$(".ace").find("p").text(),t.id=o[1],t.num=1,e.some(function(e,n){return i=n,e.id===t.id})?e[i].num++:e.push(t);var n=JSON.stringify(e);$.cookie("shopping",n,{expires:7,path:"/"}),location.href="http://localhost:2000/html/shopping_car.html"})})})}}]),e}())});