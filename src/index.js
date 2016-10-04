import util from 'gulp-util';
import through from 'through2';

const PluginError = util.PluginError;
const PLUGIN_NAME = 'gulp-localize';

function Localize(langs) {
    return through.obj(function(file, encoding, callback) {
        if (file.isNull()) {
            return callback(null, file);
        }

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, `You can't compile stream to i18n!`));
        }

        const OUTPUT = {};
        const LOCALS = JSON.parse(file._contents.toString('utf8'));

        Object.keys(LOCALS).forEach((TITLE) => {
            const TRANSLATIONS = LOCALS[TITLE];
            langs.forEach((lang) => {
                if(typeof TRANSLATIONS[lang] !== "undefined"){
                    OUTPUT[lang] = (typeof OUTPUT[lang] === 'undefined' ? OUTPUT[lang] = {} : OUTPUT[lang] = OUTPUT[lang]);
                    OUTPUT[lang][TITLE] = TRANSLATIONS[lang];
                } else {
                    this.emit('error', new PluginError(PLUGIN_NAME, `There's no "${lang}" translation for ${TITLE}!`));
                }
            });
        });

        for (const LANG in OUTPUT) {
            this.push(new util.File({ cwd: '', base: '', path: `${LANG}.json`,
                contents: new Buffer(JSON.stringify(OUTPUT[LANG]), 'utf8')
            }));
        }

        return callback();
    });
}

export default Localize;