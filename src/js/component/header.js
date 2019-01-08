define(["jquery","cookie"], () => {
	class Header{
		constructor(){
			this.init();
		}
		init(){
			//加载header.html
			new Promise((resolve, reject) => {
				$("header").load("/html/component/header.html", () => {
					resolve();
				})
			}).then(() => {
				// console.log(1);
				var ccc = $.cookie("Microsoft");
				// console.log(ccc);
				if(ccc){
					$("#login_one").hide();
					$("#login_user").show().text(ccc);
				}
			})
		}
	}
	return new Header();
})