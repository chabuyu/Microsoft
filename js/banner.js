define(["jquery"], () => {
    class Banner {
        constructor() {
            this.init();
        }
        init() {
            //加载header.html
            new Promise((resolve, reject) => {
                $("banner").load("/html/banner.html", () => {
                    resolve();
                })
            }).then(() => {
                //window.onload  执行banner操作
                $(function () {
                    let $ul = $("#banner ul");
                    let $imgs = $ul.children();
                    let index = 0;
                    let timer = null;
                    let len = $imgs.length;
                    let liWidth = $imgs.eq(0).width() + 1;
                    let btns = [];

                    //拼接按钮
                    for (var i = 1; i <= len; i++) {
                        btns.push($("<li>").addClass(i === 1 ? "ac" : "").appendTo($("#banner ol")));
                    }

                    //在结尾追加一个img，计算ul宽度
                    $ul.append($imgs.eq(0).clone());
                    $ul.width((len + 1) * liWidth);

                    $.each(btns, (i, $btn) => {
                        $btn.on("click", function () {
                            btns[index].removeClass("ac");
                            $(this).addClass("ac");
                            index = $(this).index();
                            //ul移动到当前位置
                            // -index*liWidth
                            $ul.stop().animate({
                                left: -index * liWidth
                            }, "slow");
                        })
                    })
                    //上一张
                    $("#prev").on("click", function () {
                        btns[index].removeClass("ac");
                        if (--index < 0) {
                            $ul.css({
                                left: -len * liWidth
                            });
                            index = len - 1;
                        }
                        $ul.stop().animate({
                            left: -index * liWidth
                        }, "slow");
                        btns[index].addClass("ac");
                    })

                    //下一张
                    $("#next").on("click", function () {
                        btns[index].removeClass("ac");
                        if (++index >= len) {
                            //移动到追加得那一张，但是移动完成之后瞬间回到第0张
                            $ul.stop().animate({
                                left: -len * liWidth
                            }, "slow", function () {
                                $ul.css({
                                    left: 0
                                });
                            })
                            index = 0;
                        } else {
                            $ul.stop().animate({
                                left: -index * liWidth
                            });
                        }

                        btns[index].addClass("ac");
                    })
                    $("#banner").on("mouseleave", function () {
                        $("#next").css("display", "none");
                        $("#prev").css("display", "none");

                    })
                    $("#banner").on("mouseenter", function () {
                        $("#next").css("display", "block");
                        $("#prev").css("display", "block");

                    })
                    $("#div1").hover(function () {
                        clearInterval(timer);
                    }, (function autoPlay() {
                        timer = setInterval(() => {
                            $("#next").trigger("click");
                        }, 4000);
                        return autoPlay;
                    })());
                })
            })
        }
    }
    return new Banner();
})