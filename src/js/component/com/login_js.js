define(["jquery", "cookie"], () => {
    class Login {
        constructor() {
            this.init();
        }
        init() {
            $(function () {
                var ema = $.cookie("Microsoft");
                // console.log(ema);
                $("#login_email").val(ema);
                $("#login_next").on("click", function (e) {
                    e.preventDefault()
                    let email = $("#login_email").val();
                    // console.log(email);
                    $.ajax({
                        type: "post",
                        url: "http://localhost/www/api/v1/login.php",
                        data: {
                            email: email
                        },
                        success: function (res) {
                            // console.log(res);
                            if (res.res_code) {
                                $(".register").height(320)
                                $("#register_box").hide();
                                $("#register_box2").show();
                                $("#login_login").on("click",function(e){
                                    e.preventDefault()
                                    var password = $("#login_password").val();
                                    // console.log(password);
                                    $.ajax({
                                        type:"post",
                                        url: "http://localhost/www/api/v1/login_into.php",
                                        data:{
                                            email:email,
                                            password:password
                                        },
                                        success:function(re){
                                            // console.log(re)
                                            if(re.res_code){
                                                if(rember_me.checked){
                                                        $.cookie("Microsoft", email, {
                                                            expires: 30,
                                                            path: '/'
                                                        });
                                                }else{
                                                    $.cookie("Microsoft", email,{path: '/'})
                                                }
                                                location.href = "http://localhost:2000/index.html"
                                            }else{
                                            $("#register_wramming").show().text("你的帐户或密码不正确。如果你不记得你的密码， 请立即进行重置。");
                                            }
                                        },
                                        error: function (er) {
                                            // console.log(er);
                                        },
                                        dataType: "json"
                                    })
                                })
                            } else {

                            }
                        },
                        error: function (er) {
                            console.log(er);
                        },
                        dataType: "json"
                    })
                })
            })
        }
    }
    return new Login();
})