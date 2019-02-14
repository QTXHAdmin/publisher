const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const rev = require('gulp-rev');
const imagemin = require('gulp-imagemin');
const tmodjs = require('gulp-tmod');
const replace = require('gulp-replace');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const revCollector = require('gulp-rev-collector');
const htmlmin = require('gulp-htmlmin');
const clean = require('gulp-clean');
const requirejsRevReplace = require('gulp-requirejs-rev-replace');
const connect = require('gulp-connect');
const open = require('gulp-open');

gulp.task('style:dev', function () {
  return gulp.src('src/style/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))

    .pipe(concat('main.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/style/'))

})

gulp.task('template', function (done) {
  let basePath = path.join(__dirname, 'src/template');
  let files = fs.readdirSync(basePath);
  files.forEach(function (val, index) {
    gulp.src('src/template/' + val + '/**/*.html')
      .pipe(tmodjs({
        templateBase: 'src/template/' + val,
        runtime: val + '.js',
        compress: false
      }))
      .pipe(replace('var String = this.String;', 'var String = window.String;'))
      .pipe(gulp.dest('src/js/template/'));
  })
  done();
})

gulp.task('style', function () {
  return gulp.src('src/style/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))

    .pipe(concat('main.css'))
    .pipe(cleanCSS({ compatibility: 'ie8', specialComments: 'all' }))
    .pipe(rev())
    .pipe(gulp.dest('./dist/style'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./src/style'))
})

gulp.task('imagemin', function () {
  return gulp.src('src/assets/image/**/*.*')
    .pipe(imagemin({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest('./dist/assets/image'))
})

gulp.task('js', function () {
  return gulp.src(['src/**/*.js', '!src/lib/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(babel())
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./dist'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('src/js'))
})

gulp.task('requireConfigReplace', function () {
  return gulp.src('./dist/main/**/*.js')
    .pipe(requirejsRevReplace({
      manifest: gulp.src('src/js/rev-manifest.json')
    }))
    .pipe(gulp.dest('./dist/main'))
})

gulp.task('html', function () {
  return gulp.src(['src/**/*.json', 'src/**/*.html'])
    .pipe(revCollector({ replaceReved: true }))
    .pipe(htmlmin({
      removeComments: true, // 清除HTML注释
      collapseWhitespace: true, // 压缩HTML
      // collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
      removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: true, // 删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type="text/css"
      minifyJS: true, // 压缩页面JS
      minifyCSS: true // 压缩页面CSS
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('copyassets', function () {
  return gulp.src(['src/assets/font/**/*.*', 'src/lib/**/*.*'], { read: true, base: './src' })
    .pipe(gulp.dest('dist/'));
})

gulp.task('clean', function () {
  return gulp.src(['./dist/style/**', './dist/js/**', './dist/main/**'], { read: false })
    .pipe(clean({ force: true }))
})

gulp.task('dist', gulp.series('clean', 'copyassets', 'template', 'style', 'imagemin', 'js', 'html', 'requireConfigReplace'));

gulp.task('devServer', function (done) {
  connect.server({
    root: ['./src'],
    port: 50000,
    livereload: true
  })
  done();
})

gulp.task('open', gulp.series('devServer', function () {
  return gulp.src(__filename)
    .pipe(open({
      uri: 'http://localhost:50000/index.html'
    }))
}))

gulp.task('dev', gulp.series('open', function () {
  gulp.watch('src/style/**/*.scss').on('change', gulp.series('style:dev'));

  gulp.watch('src/template/**/*.html').on('change', gulp.series('template'));
}))
