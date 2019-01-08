//列表页的业务逻辑
require(["./requirejs.config"], () => {
	//引入list需要依赖的模块
	require(["jquery", "item", "url", "header", "footer"], ($, item, url) => {
		item.init(url.baseUrlRap);
		class Images {
			constructor() {
				this.init();
			}
			init() {
				$(".list_apply_main").on("click", function (e) {
					if (e.target.className === 'title') {
						//获取图片中href的id值
						// var seach = location.search;
						// console.log(seach);
					}
				})
			}
		}
		return new Images;
	})
})