import fs from 'fs';
import path from 'path';
import util from '../lib/util.js';

export default (name, options) => {
    if(name != null && name != ''){
        const settings = util.getSettings();
        var filename = path.join(settings.servicesDir, name + '.js');
        var replacements = {};

        replacements['module'] = settings.name;
        replacements['service'] = name;

        if(settings.useAbbreviation){
            replacements['serviceName'] = util.camelIt(settings.abbreviation) + util.pascalIt(name);
        }
        else{
            replacements['serviceName'] = util.camelIt(name);
        }

        if (!fs.existsSync(filename)){
            var contents = util.processServiceTemplate(replacements);
            fs.writeFile(filename, contents, function (err) {
                if (err) throw err;
                console.log('Service has been created successfully.');
              });
        }
    }
    else{
        // TODO throw or display an error
    }
}