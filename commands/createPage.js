import fs from 'fs';
import path from 'path';
import util from '../lib/util.js';

export default (name, options) => {
    if(name != null && name != ''){
        const settings = util.getSettings();
        var dirname = path.join(settings.pagesDir, name);
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

            if(settings.useAbbreviation){
                replacements['directive'] = util.camelIt(settings.abbreviation) + util.pascalIt(name);
            }
            else{
                replacements['directive'] = util.camelIt(name);
            }
            
            // write out the controller file
            var filename = path.join(dirname, name + '.js');
            if (!fs.existsSync(filename)){
                contents = util.processPageJsTemplate(replacements);
                fs.writeFile(filename, contents, function (err) {
                    if (err) throw err;
                    console.log('Page controller has been created successfully.');
                });
            }
            
            // write out the html file
            filename = path.join(dirname, name + '.html');
            if (!fs.existsSync(filename)){
                contents = util.processComponentHtmlTemplate(replacements);
                fs.writeFile(filename, contents, function (err) {
                    if (err) throw err;
                    console.log('Page html template has been created successfully.');
                });
            }
            
            // write out the scss file
            filename = path.join(dirname, name + '.scss');
            if (!fs.existsSync(filename)){
                contents = util.processComponentScssTemplate(replacements);
                fs.writeFile(filename, contents, function (err) {
                    if (err) throw err;
                    console.log('Page scss file has been created successfully.');
                });
            }

            // Append the scss file to _modules.scss with an import
            fs.appendFileSync(path.join(settings.moduleDir, '_module.scss'), "@import 'pages/" +  name + "/" + name + '.scss' + "';\n");
        }
    }
}