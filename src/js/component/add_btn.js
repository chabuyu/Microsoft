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
					//判断cookie是否已经有值了
					if ($.cookie("shopping")) {
						var AllSize = JSON.parse($.cookie("shopping"));
					} else {
						let AllSize = [];
					}
					$(".add_car_btn").on("click", function () {
						let allSize = {};
						allSize['size'] = $(".ace_size").text();
 						allSize['price'] = $('.price_block').find('.current').text();
						allSize['deploy'] = $('.ace').find('p').text();
						//    allSize['id'] = arrSearch[1];
						AllSize.push(allSize);
						var all = JSON.stringify(AllSize)
						$.cookie("shopping", all, {
							expires: 7,
							path: '/'
						})
						var a = $.cookie("shopping");
						console.log(a)
						// location.href = "http://localhost:2000/html/shopping_car.html";
					})
					console.log(AllSize)
				})
			})
		}
	}
	return new AddBtn();
})