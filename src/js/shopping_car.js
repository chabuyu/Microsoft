require(["./requirejs.config"], () => {
    //引入详情页需要依赖的模块
    require(["jquery", "url", "template", 'cookie', "header", "footer"], ($, url, template) => {
        $(function () {
            new Promise((resolve, reject) => {

                $.ajax({
                    url: url.baseurlCar,
                    type: "GET",
                    // data: objSearch,
                    dataType: "json",
                    success: function (res) {
                        if (res.res_code === 1) {
                            let car = res.res_body;
                            //     //通过模板引擎渲染结构
                            let html = template("shopping_your_love", {
                                car: car
                            });
                            $("#shopping_your").html(html);
                            resolve();
                        }
                    }
                })
            }).then(() => {
                require(["addBtn"], () => {
                    //读取cookie
                    if ($.cookie('shopping')) {
                        let arr = JSON.parse($.cookie('shopping'))
                        var str = '<tr>' +
                            '<td><input type="checkbox" class="allCheck"/>全选</td>' +
                            '<td>' + "序号" + '</td>' +
                            '<td><span>' + "配置" + '</span></td>' +
                            '<td><span>' + "尺寸" + '</span></td>' +
                            '<td>' + "数量" + '</td>' +
                            '<td><span>' + "单价" + '</span></td>' +
                            '<td><span>' + "总价" + '</span></td>' +
                            '<td>' + '<a href="javascript:;" class="allDelBtn">全部删除</a>' + '</td>' +
                            '</tr>';
                        //拼接内容
                        var index = 1;
                        var n = 0;
                        var allNum = 0;
                        for (var value of arr) {
                            str += '<tr>' +
                                '<td><input type="checkbox" class="check"/></td>' +
                                '<td>' + index++ + '</td>' +
                                '<td><span>' + value.deploy + '</span></td>' +
                                '<td><span>' + value.size + '</span></td>' +
                                '<td><span class="num">' + value.num + '</span></td>' +
                                '<td><span class="price">' + value.price + "元" + '</span></td>' +
                                '<td><span class="allprice">' + value.num * value.price + "元" + '</span></td>' +
                                '<td>' + '<a href="javascript:;" class="delBtn">删除</a>' + '</td>' +
                                '</tr>';
                            allNum += value.num;
                        }
                        $("#allNum").text(allNum);
                        var tr;
                        $(".shopping_main_wrap").html(str).on('click', function (e) {
                            //找到所有单选按钮
                            var allCheck = $(".shopping_main_wrap .allCheck");
                            var aCheck = $(".shopping_main_wrap .check");
                            //找到事件源   全选按钮事件
                            e = e || event;
                            //找到事件源
                            //找到当前tr
                            tr = e.target.parentNode.parentNode;
                            if (e.target.className === "allCheck") {
                                for (var i = 0; i < aCheck.length; i++) {
                                    //单选得状态跟全选同步
                                    aCheck[i].checked = e.target.checked;
                                }
                                //n的值也要修改
                                n = allCheck.prop('checked') ? aCheck.length : 0;
                                console.log($("check:checked"))

                            } else if (e.target.className === "check") { //单选按钮事件
                                e.target.checked ? n++ : n--;
                                if (n === aCheck.length) {
                                    allCheck.prop('checked', true);
                                } else {
                                    allCheck.prop('checked', false);
                                }
                            } else if (e.target.className === "delBtn") {
                                //得到当前点击的是第几条内容
                                if (confirm("确定删除该条商品？")) {
                                    let delNum = $(tr.children[1]).text() - 1;
                                    //删除cookie 和内容
                                    arr.splice(delNum);
                                    var store = JSON.stringify(arr)
                                    $.cookie("shopping", store, {
                                        expires: 7,
                                        path: '/'
                                    })
                                    tr.parentNode.removeChild(tr);
                                    location.reload();
                                }
                            } else if (e.target.className === "allDelBtn") {
                                //全部删除
                                console.log(1)
                                if (confirm("确定清空购车车？")) {
                                    console.log(this);
                                    this.remove(this);
                                    //清空cookie
                                    $.cookie("shopping", "", {
                                        expires: -1,
                                        path: '/'
                                    });
                                    //重载页面
                                    location.reload();
                                }
                            } else if (e.target.id === "settle") { //结算 按钮
                                // console.log(1)

                            }

                            function allPrice() {
                                var sum = 0;
                                //找到被选中的那些行，然后把这些行的单价X数量，累加
                                for (let j = 0; j < aCheck.length; j++) {
                                    if (aCheck[j].checked) {
                                        var price = arr[j].price;
                                        var num = arr[j].num;
                                        sum += price * num;
                                    }
                                }
                                $("#allPrice").text('￥' + sum);
                            }
                            allPrice();
                        });
                        $("#settle").on("click", function () {
                            // console.log(1)
                            if (n > 0) {

                                var aCheck = $(".shopping_main_wrap .check");
                                // console.log(aCheck)
                                var sett = [];
                                if ($.cookie('Microsoft')) {
                                    for (let j = 0; j < aCheck.length; j++) {
                                        if (aCheck[j].checked) {
                                            let settle = $(aCheck[j]).parent().parent().children()[1].innerHTML - 1;
                                            // console.log($(aCheck[j]).parent().parent().children()[1].innerHTML)
                                            sett.push(arr[settle]);
                                            var store = JSON.stringify(sett)
                                            $.cookie("settle", store, {
                                                expires: 1,
                                                path: '/'
                                            })
                                            // console.log($.cookie("settle"))

                                        }
                                        $(".shopping_wrapper2").addClass("settle");
                                    }
                                } else {
                                    alert("请登录")
                                    location.href = "/html/component/register.html"
                                }
                            }

                        })

                    }
                })
            })
        })
    })
})