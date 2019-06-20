#GULP-i18n-FORMATTER

[![Greenkeeper badge](https://badges.greenkeeper.io/geexup/gulp-i18n-formatter.svg)](https://greenkeeper.io/)

##How to use
###install
```
npm install gulp-i18n-formatter --save-dev
```
###add to gulpfile
```
var i18nFormatter = require('gulp-i18n-formatter');

gulp.task('format-i18n', function() {
    gulp.src('./Locals.json')
        .pipe(i18nFormatter(['ru_RU', 'en_US']))
        .pipe(gulp.dest('./i18n/'));
});
```

##How its works
###Simply, its Converts this:
Locals.json
```
{
    "TEST_TITLE": {
        "ru_RU": "Тестовый Заголовок",
        "en_US": "Testing Title"
     }
}
```
###Into this:
ru_RU.json
```
{
    "TEST_TITLE": "Тестовый Заголовок"
}
```
en_US.json
```
{
    "TEST_TITLE": "Testing Title"
}
```

##Build and test
###To build package run:
```
npm start
```
###To test package run:
```
npm test
```
