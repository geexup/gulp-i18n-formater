'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _through = require('through2');

var _through2 = _interopRequireDefault(_through);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PluginError = _gulpUtil2.default.PluginError;
var PLUGIN_NAME = 'gulp-localize';

function Localize(langs) {
    return _through2.default.obj(function (file, encoding, callback) {
        var _this = this;

        if (file.isNull()) {
            return callback(null, file);
        }

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'You can\'t compile stream to i18n!'));
        }

        var OUTPUT = {};
        var LOCALS = JSON.parse(file._contents.toString('utf8'));

        Object.keys(LOCALS).forEach(function (TITLE) {
            var TRANSLATIONS = LOCALS[TITLE];
            langs.forEach(function (lang) {
                if (typeof TRANSLATIONS[lang] !== "undefined") {
                    OUTPUT[lang] = typeof OUTPUT[lang] === 'undefined' ? OUTPUT[lang] = {} : OUTPUT[lang] = OUTPUT[lang];
                    OUTPUT[lang][TITLE] = TRANSLATIONS[lang];
                } else {
                    _this.emit('error', new PluginError(PLUGIN_NAME, 'There\'s no "' + lang + '" translation for ' + TITLE + '!'));
                }
            });
        });

        for (var LANG in OUTPUT) {
            this.push(new _gulpUtil2.default.File({ cwd: '', base: '', path: LANG + '.json',
                contents: new Buffer(JSON.stringify(OUTPUT[LANG]), 'utf8')
            }));
        }

        return callback();
    });
}

exports.default = Localize;