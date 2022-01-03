import fs from 'fs';
import path from 'path';
import util from '../lib/util.js';

export default (name, options) => {
    if(name != null && name != ''){
        const settings = util.getSettings();
        var dirname = path.join(settings.componentsDir, name);
        var replacements = {};

        if (!fs.existsSync(dirname)){
            fs.mkdirSync(dirname);
            replacements['module'] = settings.name;
            replacements['component'] = name;
            var contents = '';

            if(settings.useAbbreviation){
                replacements['tagname'] = util.kebabIt(util.camelIt(settings.abbreviation) + util.pascalIt(name));
            }
            else{
                replacements['tagname'] = util.kebabIt(name);
            }
            
            // write out the controller file
            var filename = path.join(dirname, name + '.js');
            if (!fs.existsSync(filename)){
                contents = util.processComponentJsTemplate(replacements);
                fs.writeFile(filename, contents, function (err) {
                    if (err) throw err;
                    console.log('Component controller has been created successfully.');
                });
            }
            
            // write out the html file
            filename = path.join(dirname, name + '.html');
            if (!fs.existsSync(filename)){
                contents = util.processComponentHtmlTemplate(replacements);
                fs.writeFile(filename, contents, function (err) {
                    if (err) throw err;
                    console.log('Component html template has been created successfully.');
                });
            }
            
            // write out the scss file
            filename = path.join(dirname, name + '.scss');
            if (!fs.existsSync(filename)){
                contents = util.processComponentScssTemplate(replacements);
                fs.writeFile(filename, contents, function (err) {
                    if (err) throw err;
                    console.log('Component controller has been created successfully.');
                });
            }
        }
    }
}