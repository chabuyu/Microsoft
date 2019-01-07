define(["jquery", "cookie"], () => {
    class Register {
        constructor() {
            this.init();
        }
        init() {
            $(function () {
                $("#register_wramming").hide().text("");
                $("#register_email").blur(function (e) {
                    e.preventDefault();
                    let email = $("#register_email").val();
                    let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
                    if (email) {
                        if (!reg.test(email)) {
                            $("#register_next").children().attr('disabled', true);
                            $("#register_wramming").show().text("输入 someone@example.com 格式的电子邮件地址。");
                        } else {
                            $("#register_next").children().attr('disabled', false);
                            $("#register_next").children().on("click", function (e) {
                                e.preventDefault()
                                console.log(email);
                                $.ajax({
                                    type: "post",
                                    url: "http://localhost/www/api/v1/register.php",
                                    data: {
                                        email: email
                                    },
                                    success: function (res) {
                                        console.log(res);
                                        console.log(res.res_code);
                                        if (res.res_code) {
                                            $("#register_box").hide();
                                            $("#register_box2").show();
                                            $("#register_password_btn").on("click", function (e) {
                                                e.preventDefault();
                                                let password = $("#register_password").val();
                                                console.log(password);
                                                if (password) {
                                                    $.ajax({
                                                        type: "post",
                                                        url: "http://localhost/www/api/v1/register_into.php",
                                                        data: {
                                                            email: email,
                                                            password: password
                                                        },
                                                        success: function (re) {
                                                            console.log(re);
                                                            $.cookie("Microsoft", email)
                                                            location.href = "http://localhost:2000/html/component/login.html"
                                                        },
                                                        error: function (er) {
                                                            console.log(er);
                                                        },
                                                        dataType: "json"
                                                    })
                                                } else {

                                                }
                                            })
                                        } else {
                                            $("#register_wramming").show().text("电子邮件地址已使用。");
                                        }

                                    },
                                    error: function (err) {
                                        console.log(err);
                                    },
                                    dataType: "json"
                                })

                            })
                        }
                    } else {
                        $("#register_next").children().attr('disabled', true);
                        $("#register_wramming").show().text("电子邮件地址为必填");
                    }


                })


            })

        }
    }
    return new Register();
    console.log(1);

})