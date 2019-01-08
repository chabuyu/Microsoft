define(["jquery", "cookie"], () => {
	class Header {
		constructor() {
			this.init();
		}
		init() {
			//加载header.html
			new Promise((resolve, reject) => {
				$("header").load("/html/component/header.html", () => {
					resolve();
				})
			}).then(() => {
				// console.log(1);
				var ccc = $.cookie("Microsoft");
				// console.log(ccc);
				if (ccc) {
					$("#login_one").hide();
					$("#login_user").show().text(ccc);
				}
				$(function () {
					var a = $('header'),
						b = a.offset(); //返回或设置导航栏相对于文档的偏移(位置)
					//加个屏幕滚动事件，c是滚动条相当于文档最顶端的距离
					$(document).on('scroll', function () {
						var c = $(document).scrollTop();
						//   当滚动的屏幕距离大于等于导航栏本身离最顶端的距离时（判断条件）给它加样式（根据自己业务的条件加样式，一般如下）*／
						if (b.top < c) {
							a.css({
								'position': 'fixed',
								'top': '0px',
								'left':'7.8%',
								'background':"rgb(224, 217, 217)"
							})
						} else {
							a.css({
								'position': 'relative',
								'top': '0px',
								'left':'0px',
								'background':"#fff"
							})
						}
					})
				});
			})
		}
	}
	return new Header();
})