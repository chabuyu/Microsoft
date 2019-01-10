require(["./requirejs.config"], () => {
	require(["jquery", "cookie", "header", "footer"], () => {
		$(function () {
			function Users() {
				this.init();
			}
			//赋值
			Users.prototype.init = function () {
				$(".yourName").text("Microsoft_9527");
				$(".yourEmail").text($.cookie("Microsoft"));
				$(".yourPwd").text("**********");
				this.chang();
			}
			//更改个人信息
			Users.prototype.chang = function () {
				$(".changeName,.changeEmail,.changePwd").on('click', (e) => {
					$(e.target).hide().next().show();
				})
				this.pop();
			}
			//ajax
			Users.prototype.pop = function () {
				$("#over").on("click", function () {
					//获取输入的值
					// if(){
						let UserName = $(".name").val();
						let UserEmail = $(".email").val();
						let UserPassword = $(".password").val();
					// }
					console.log(UserName,UserEmail,UserPassword);
				})
			}
			new Users();
		})
	})
})