define(["jquery", "cookie"], () => {
	class AddBtn {
		constructor() {
			this.init();
		}
		init() {
			new Promise((resolve, reject) => {
				$(".add_car").load("/html/component/add_btn.html", () => {
					resolve();
					console.log()
				})
			}).then(() => {

				$(function () {
					var arrSearch = location.search.slice(1).split("=");
					let objSearch = {}
					objSearch[arrSearch[0]] = arrSearch[1];
					//判断cookie是否已经有值了
					$(".add_car_btn").on("click", function () {
						var AllSize = $.cookie("shopping") ? JSON.parse($.cookie("shopping")) : [];
						let all = {};
						//尺寸
						all['size'] = $(".ace_size").text();
						//价格
						all['price'] = $('.price_block').find('.current').text();
						//配置
						all['deploy'] = $('.ace').find('p').text();
						//编号
						all['id'] = arrSearch[1];
						all['num'] = 1;
						var index;
						var isExist = AllSize.some(function (item, i) {
							//some只要遇到满足条件的，返回true，查找就结束
							index = i;
							return item.id === all.id;
						})
						if (isExist) {
							//arr[index]跟obj一样 数量加加
							AllSize[index].num++;
						} else {
							AllSize.push(all);
						}
						var store = JSON.stringify(AllSize)
						$.cookie("shopping", store, {
							expires: 7,
							path: '/'
						})
						var a = $.cookie("shopping");
						console.log(a)
						// location.href = "http://localhost:2000/html/shopping_car.html";
					})
				})
			})
		}
	}
	return new AddBtn();
})