//列表页的业务逻辑
require(["./requirejs.config"], () => {
	//引入list需要依赖的模块
	require(["jquery", "item", "url","header","footer"], ($,item,url) => {
		item.init(url.baseUrlRap);
	})
})