require.config({
	baseUrl : "/",

	paths: {
		"jquery" : "libs/jquery/jquery-3.3.1.min",
		"cookie" : "libs/jquery/jquery-plugins/jquery.cookie",
		"header" : "js/component/header",
		"banner" : "js/banner",
		"footer" : "js/component/footer"
	},
	//不符合AMD规范的模块，垫片
	shim: {
		"cookie" : {
			deps: ["jquery"]
		}
	}
})