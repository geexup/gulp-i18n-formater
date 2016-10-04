#GULP-i18n-FORMATOR

##How to use
###install
```
npm install gulp-i18n-formater --save-dev
```
###add to gulpfile
```
var i18nFormater = require('gulp-i18n-formater');

gulp.task('format-i18n', () => {
    gulp.src('./Locals.json')
        .pipe(i18nFormater(['ru_RU', 'en_US']))
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