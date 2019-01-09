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
                        // console.log(res);
                        if (res.res_code === 1) {
                            let car = res.res_body;
                            //     //通过模板引擎渲染结构
                            let html = template("shopping_your_love", {
                                car: car
                            });
                            // console.log(car.data[0].img)
                            // console.log(html);
                            $("#shopping_your").html(html);
                            resolve();
                        }
                    }
                })
            }).then(() => {
                require(["addBtn"], () => {
                    //读取cookie
                    let arr = JSON.parse($.cookie('shopping'))
                    var str = '<tr>' +
                    '<td><input type="checkbox" class="check"/>全选</td>' +
                    '<td>' + "序号"+'</td>' +
                    '<td><span>' + "配置" + '</span></td>' +
                    '<td><span>' + "尺寸" + '</span></td>' +
                    '<td>' + "数量" + '</td>' +
                    '<td><span>' + "价格" + '</span></td>' +
                    '<td>' +
                    '<a href="javascript:;" class="delBtn">全部删除</a>' +
                    '</td>' +
                    '</tr>';
                    console.log(arr);
                    //拼接内容
                    var index =1;
                    for (var value of arr) {
                        console.log(value)
                        // console.log(obj.id)
                        str += '<tr>' +
                            '<td><input type="checkbox" class="check"/></td>' +
                            '<td>' + index++ + '</td>' +
                            '<td><span>' + value.deploy + '</span></td>' +
                            '<td><span>' + value.size + '</span></td>' +
                            '<td>' + value.num + '</td>' +
                            '<td><span>' + value.price + '</span></td>' +
                            '<td>' +
                            '<a href="javascript:;" class="delBtn">删除</a>' +
                            '</td>' +
                            '</tr>';
                    }
                    $(".shopping_main_wrap").html(str);
                })
            })
        })
    })
})