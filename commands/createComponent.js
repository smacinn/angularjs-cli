import fs from 'fs';

export default (name, options) => {
    if(name != null && name != ''){
        if (!fs.existsSync(name)){
            fs.mkdirSync(name);
        }

        var scss = name + '/_module.scss';
        var components = name + '/components';
        var services = name + '/services';

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