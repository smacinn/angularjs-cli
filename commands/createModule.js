import fs from 'fs';
import path from 'path';


export default (name, options) => {
    console.log("Options:", options);
    console.log("Exec Path:", process.execPath);
    console.log("Exec Args:", process.execArgv);
    console.log("Dirname:", path.dirname('.'));

    if(name != null && name != ''){
        if (!fs.existsSync(name)){
            fs.mkdirSync(name);
        }
        

        var scss = name + '/_module.scss';
        var components = name + '/components';
        var services = name + '/services';
        var settingsFile = name + '/settings.json';

 
        var settings = {
            "name": name,
        };

        if(options.abbreviation && options.abbreviation != ''){
            settings["abbreviation"] = options.abbreviation;
            settings["useAbbreviation"] = true;
        }
        else{
            settings["abbreviation"] = "";
            settings["useAbbreviation"] = false;
        }


        if (!fs.existsSync(settingsFile)){
            fs.writeFile(settingsFile, JSON.stringify(settings), function (err) {
                if (err) throw err;
                console.log('Settings file was created successfully.');
              });
        }

        if (!fs.existsSync(scss)){
            fs.writeFile(scss, '', function (err) {
                if (err) throw err;
                console.log('File is created successfully.');
              });
        }

        if (!fs.existsSync(components)){
            fs.mkdirSync(components);
        }
        if (!fs.existsSync(services)){
            fs.mkdirSync(services);
        }
   }
    else{
        // TODO throw or display an error
    }
}