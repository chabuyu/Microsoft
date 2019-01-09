//详情页的业务逻辑
require(["./requirejs.config"], () => {
    //引入详情页需要依赖的模块
    require(["jquery", "url", "template", 'cookie', "header", "footer"], ($, url, template) => {
        $(function () {
            var arrSearch;
            new Promise((resolve, reject) => {
                arrSearch = location.search.slice(1).split("=");
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
                            // console.log(detail);
                            let html = template("detail_template", {
                                detail: detail
                            });
                            // console.log(detail.title)
                            // console.log(html);
                            $("#books").html(html);
                            resolve();
                        }
                    }
                })
            }).then(() => {
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
                    if (e.target.className === "add_car_btn") {
                        // size 尺寸;  deploy 配置;  price 价格 图片  id
                        let allSize = {};
                        allSize['size'] = $(".ace_size").text();
                        let size = $(".ace_size").text();
                        allSize['price'] = $('.price_block').find('.current').text();
                        allSize['deploy'] = $('.ace').find('p').text();
                        allSize['id'] = arrSearch[1];
                        var all = JSON.stringify(allSize)
                        // console.log(size,deploy,id);
                        // var b = 'size='+size+',price='+price+',id='+id+',deploy='+deploy
                        $.cookie("shopping", all
                            // "size": size,
                            // 'price': price,
                            // "id": id
                        , {
                            expires: 7,
                            path: '/'
                        })
                        var a = $.cookie("shopping");
                        console.log(a)
                        location.href = "http://localhost:2000/html/shopping_car.html";
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