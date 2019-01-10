//详情页的业务逻辑
require(["./requirejs.config"], () => {
    //引入详情页需要依赖的模块
    require(["jquery", "url", "template", 'cookie', "header", "footer"], ($, url, template) => {
        $(function () {
            var arrSearch;
            new Promise((resolve, reject) => {
                var arrSearch = location.search.slice(1).split("=");
                let objSearch = {}
                objSearch[arrSearch[0]] = arrSearch[1];
                $.ajax({
                    url: url.baseurlDetail,
                    type: "GET",
                    data: objSearch,
                    dataType: "json",
                    success: function (res) {
                        // console.log(res); 
                        if (res.res_code === 1) {
                            let detail = res.res_body;
                            //通过模板引擎渲染结构
                            let html = template("detail_template", {
                                detail: detail
                            });
                            $("#books").html(html);
                            resolve();
                        }
                    }
                })
            }).then(() => {
                require(["addBtn"], () => {
                    $("#books").on("click", function (e) {
                        if (e.target.className === "books_litter_1") {
                            var sr = e.target.src;
                            $("#books_big_p").attr("src", sr);
                            $(e.target).parents('li').addClass("ac").siblings().removeClass("ac");
                        }
                        if (e.target.className === "active") {
                            $(e.target).addClass('ace_size').siblings().removeClass('ace_size')
                            if ($(e.target).text() === "13.5英寸") {
                                $('.price1').addClass('price_block').siblings().removeClass('price_block')
                            } else {
                                $('.price2').addClass('price_block').siblings().removeClass('price_block')
                            }
                        }
                    })
                    $(".option").on("click", function () {
                        // console.log(1)
                        $(this).addClass("ace").siblings().removeClass("ace");
                        var mon = $(this).find("span").text();
                        var flag = $(".price_block .current").text(mon);
                        // console.log(mon,flag)
                    })
                })
            })

        })
    })
})