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
				var ccc = $.cookie("Microsoft");
				if (ccc) {
					$("#login_one").hide();
					$("#login_user").show().text(ccc);
				}
				$(function () {
					$(".seach").on("click", function () {
						$(".serach,.serach_img").show("slow");
					})
					$(".serach").blur(() => {
						$(".serach,.serach_img,.seach ul").hide();
					})
					$(".serach_img").on("click", function () {
						var str = "wd="
						str += $(".serach").val()
						console.log(str)
						$.getJSON("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&" + str, function (res) {
							var data = res.s;
							console.log(res)
							$(".seach ul").empty().show();
							data.forEach((item, i) => {
								$("<li>").html(item).appendTo($(".seach ul"));
							})

						})

						$(".seach ul").on("click", "li", function () {
							$("input[type=text]").val($(this).text());
							$(".seach ul").hide();
						})

					})
					//返回或设置导航栏相对于文档的偏移(位置)
					var header = $('header').offset();
					//加个屏幕滚动事件，c是滚动条相当于文档最顶端的距离
					$(document).on('scroll', function () {
						var scTop = $(document).scrollTop();
						//   当滚动的屏幕距离大于等于导航栏本身离最顶端的距离时（判断条件）给它加样式（根据自己业务的条件加样式，一般如下）*／
						if (header.top < scTop) {
							$('header').css({
								'position': 'fixed',
								'z-index': '10000',
								'top': '0px',
								'left': '8%',
								'background': "#fff",
								'border-bottom': '1px solid #ccc'
							}).next().css({'margin-top' : '100px'})
						} else {
							$('header').css({
								'position': 'relative',
								'top': '0px',
								'left': '0px',
								'background': "#fff",
								'border-bottom': 'none'
							})
						}
					})
					if($.cookie("allNum")){
						console.log($.cookie("allNum"))
						$(".shopping-car-amount").show().text($.cookie("allNum"))
					}
					
				});
			})
		}
	}
	return new Header();
})