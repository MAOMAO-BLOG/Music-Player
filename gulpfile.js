const {src,dest,series,watch}=require('gulp');
const htmlClean=require('gulp-htmlclean');
const less=require('gulp-less');
const cleanCss=require('gulp-clean-css');
const stripDebug=require('gulp-strip-debug');
const uglify=require('gulp-uglify');
// const imgMin=require('gulp-imagemin');
const connect=require('gulp-connect');
let folder={
    src:'src/',
    dest:'dist/'
}
function html(){
    return src(folder.src+'html/*')
    .pipe(htmlClean())
    .pipe(dest(folder.dest+'html/'))
    .pipe(connect.reload())//热更新
}
function css(){
    return src(folder.src+'css/*')
    .pipe(less())
    .pipe(cleanCss())
    .pipe(dest(folder.dest+'css/'))
    .pipe(connect.reload())

}
function js(){
    return src(folder.src+'js/*')
    // .pipe(stripDebug())
    .pipe(uglify())
    .pipe(dest(folder.dest+'js/'))
    .pipe(connect.reload())

}
function images(){
    return src(folder.src+'images/*')
    // .pipe(imgMin())
    .pipe(dest(folder.dest+'images/'))
    .pipe(connect.reload())
}
function server(cb){
    connect.server({
        port:'1573',
        livereload:true
    });
    cb();
}
watch(folder.src+'html/*',function(cb){
    html();
    cb();
})
watch(folder.src+'css/*',function(cb){
    css();
    cb();
})
watch(folder.src+'js/*',function(cb){
    js();
    cb();
})
exports.default=series(html,css,js,images,server);