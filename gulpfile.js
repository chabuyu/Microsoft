//引入模块
var gulp = require("gulp");
var miniCss = require("gulp-minify-css");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var babel = require("gulp-babel");
var connect = require("gulp-connect");

//制定任务
gulp.task("default", function(){
	console.log(123);
})
gulp.task("css", function(){
	gulp.src("css/**/*.css")
		.pipe(miniCss())
        .pipe(gulp.dest("dist/css"))
		.pipe(connect.reload());
        
})
gulp.task("html", function(){
	gulp.src("**/*.html")
		.pipe(htmlmin({
			removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true
		}))
        .pipe(gulp.dest("dist"))
		.pipe(connect.reload());
        
})

gulp.task("js", function(){
	gulp.src("js/**/*.js")
		.pipe(uglify())
        .pipe(gulp.dest("dist/js"))
		.pipe(connect.reload());
        
})

gulp.task("js", function(){
	gulp.src("js/**/*.js")
		.pipe(babel({
		    presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"))
		.pipe(connect.reload());
})

gulp.task("server", function(){
	//开启服务器
	connect.server({
		port:3000,
		livereload: true,
		root: "dist"
	})
})

gulp.task("img", function(){
	gulp.src("images/**/*")
		.pipe(gulp.dest("dist/images"));
})

gulp.task("watch", function(){
	gulp.watch("**/*.html", ["html"]);
	gulp.watch("css/**/*.css", ["css"]);
	gulp.watch("js/**/*.js", ["js"]);
})

gulp.task("default", ["html", "css", "js", "server", "watch", "img"]);